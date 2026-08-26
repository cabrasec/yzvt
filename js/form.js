(function () {
  "use strict";

  /*
   * n8n integration
   * ----------------
   * Replace the string below with the real n8n webhook URL before publishing.
   * Left as a placeholder on purpose — do not invent a URL here.
   */
  const N8N_WEBHOOK_URL = "N8N_WEBHOOK_URL";

  const form = document.getElementById("lead-form");
  if (!form) return;

  const fieldsWrap = document.getElementById("form-fields");
  const submitBtn = document.getElementById("form-submit");
  const successBanner = document.getElementById("form-success");
  const errorBanner = document.getElementById("form-error");

  const REQUIRED_FIELDS = ["name", "email", "whatsapp", "service", "message"];
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const WHATSAPP_DIGITS_RE = /\d/g;

  let isSubmitting = false;

  function t(key, fallback) {
    var lang = document.documentElement.getAttribute("data-lang") || "pt";
    var dict = (window.YZEV_I18N && (window.YZEV_I18N[lang] || window.YZEV_I18N.pt)) || {};
    return dict[key] || fallback;
  }

  function fieldEl(name) {
    return form.querySelector('[data-field="' + name + '"]');
  }

  function setFieldError(name, message) {
    var wrap = fieldEl(name);
    if (!wrap) return;
    wrap.classList.toggle("has-error", !!message);
    var errorEl = wrap.querySelector(".field__error");
    if (errorEl) errorEl.textContent = message || "";
  }

  function clearAllErrors() {
    REQUIRED_FIELDS.forEach(function (name) { setFieldError(name, ""); });
  }

  function validate() {
    var data = new FormData(form);
    var errors = {};

    var name = (data.get("name") || "").toString().trim();
    if (!name) errors.name = t("form.validation.required", "Preencha este campo.");

    var email = (data.get("email") || "").toString().trim();
    if (!email) {
      errors.email = t("form.validation.required", "Preencha este campo.");
    } else if (!EMAIL_RE.test(email)) {
      errors.email = t("form.validation.email", "Digite um e-mail válido.");
    }

    var whatsapp = (data.get("whatsapp") || "").toString().trim();
    var whatsappDigits = whatsapp.match(WHATSAPP_DIGITS_RE) || [];
    if (!whatsapp) {
      errors.whatsapp = t("form.validation.required", "Preencha este campo.");
    } else if (whatsappDigits.length < 8) {
      errors.whatsapp = t("form.validation.whatsapp", "Digite um WhatsApp válido.");
    }

    var service = (data.get("service") || "").toString().trim();
    if (!service) errors.service = t("form.validation.required", "Selecione uma opção.");

    var message = (data.get("message") || "").toString().trim();
    if (!message) errors.message = t("form.validation.required", "Preencha este campo.");

    return { errors: errors, data: data };
  }

  function setLoading(loading) {
    isSubmitting = loading;
    submitBtn.classList.toggle("is-loading", loading);
    submitBtn.disabled = loading;
    var label = submitBtn.querySelector(".btn__label");
    if (label) {
      label.textContent = loading
        ? t("form.submitting", "Enviando...")
        : t("form.submit", "Enviar solicitação");
    }
  }

  function showSuccess() {
    fieldsWrap.hidden = true;
    errorBanner.hidden = true;
    successBanner.hidden = false;
  }

  function showError() {
    errorBanner.hidden = false;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (isSubmitting) return;

    clearAllErrors();
    errorBanner.hidden = true;

    var result = validate();
    var errorKeys = Object.keys(result.errors);

    if (errorKeys.length) {
      errorKeys.forEach(function (name) { setFieldError(name, result.errors[name]); });
      var firstField = fieldEl(errorKeys[0]);
      if (firstField) {
        var control = firstField.querySelector("input, select, textarea");
        if (control) control.focus();
      }
      return;
    }

    var payload = {
      name: (result.data.get("name") || "").toString().trim(),
      email: (result.data.get("email") || "").toString().trim(),
      whatsapp: (result.data.get("whatsapp") || "").toString().trim(),
      company: (result.data.get("company") || "").toString().trim(),
      service: (result.data.get("service") || "").toString().trim(),
      message: (result.data.get("message") || "").toString().trim(),
      source: "website",
      createdAt: new Date().toISOString()
    };

    setLoading(true);

    fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        setLoading(false);
        if (response.ok) {
          showSuccess();
        } else {
          showError();
        }
      })
      .catch(function () {
        setLoading(false);
        showError();
      });
  });

  form.querySelectorAll("input, select, textarea").forEach(function (control) {
    control.addEventListener("input", function () {
      var wrap = control.closest(".field");
      if (wrap && wrap.classList.contains("has-error")) {
        wrap.classList.remove("has-error");
        var errorEl = wrap.querySelector(".field__error");
        if (errorEl) errorEl.textContent = "";
      }
    });
  });
})();
