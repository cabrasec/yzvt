(function () {
  "use strict";

  var DICT = window.YZEV_I18N || {};
  var SUPPORTED = ["pt", "en", "es"];
  var STORAGE_KEY = "yzev-lang";

  /* ------------------------------------------------------------------ */
  /* i18n                                                                */
  /* ------------------------------------------------------------------ */
  function getInitialLang() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    } catch (e) {}
    return "pt";
  }

  function applyLanguage(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = "pt";
    var dict = DICT[lang] || DICT.pt;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var value = dict[key];
      if (value === undefined) return;
      var attr = el.getAttribute("data-i18n-attr");
      if (attr) {
        el.setAttribute(attr, value);
      } else {
        el.textContent = value;
      }
    });

    document.documentElement.setAttribute("lang", lang === "pt" ? "pt-BR" : lang);
    document.documentElement.setAttribute("data-lang", lang);

    var currentLabel = document.getElementById("lang-current");
    if (currentLabel) currentLabel.textContent = lang.toUpperCase();

    document.querySelectorAll("#lang-menu li").forEach(function (li) {
      li.setAttribute("aria-selected", li.getAttribute("data-lang") === lang ? "true" : "false");
    });
    document.querySelectorAll(".footer__langs button").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-lang") === lang);
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function initLanguage() {
    applyLanguage(getInitialLang());

    var switchEl = document.getElementById("lang-switch");
    var toggle = document.getElementById("lang-toggle");
    var menu = document.getElementById("lang-menu");

    if (toggle && switchEl) {
      toggle.addEventListener("click", function (e) {
        e.stopPropagation();
        var isOpen = switchEl.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
      document.addEventListener("click", function (e) {
        if (!switchEl.contains(e.target)) {
          switchEl.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          switchEl.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }

    if (menu) {
      menu.querySelectorAll("li").forEach(function (li) {
        li.addEventListener("click", function () {
          applyLanguage(li.getAttribute("data-lang"));
          switchEl.classList.remove("is-open");
          if (toggle) toggle.setAttribute("aria-expanded", "false");
        });
      });
    }

    document.querySelectorAll(".footer__langs button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyLanguage(btn.getAttribute("data-lang"));
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Header: scrolled state + mobile menu                                */
  /* ------------------------------------------------------------------ */
  function initHeader() {
    var header = document.querySelector(".site-header");
    if (header) {
      var onScroll = function () {
        header.classList.toggle("is-scrolled", window.scrollY > 12);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    var menuToggle = document.getElementById("menu-toggle");
    var nav = document.getElementById("main-nav");
    if (menuToggle && nav) {
      menuToggle.addEventListener("click", function () {
        var isOpen = nav.classList.toggle("is-open");
        menuToggle.classList.toggle("is-active", isOpen);
        menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        document.body.style.overflow = isOpen ? "hidden" : "";
      });
      nav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          nav.classList.remove("is-open");
          menuToggle.classList.remove("is-active");
          menuToggle.setAttribute("aria-expanded", "false");
          document.body.style.overflow = "";
        });
      });
    }
  }

  /* ------------------------------------------------------------------ */
  /* Reveal-on-scroll                                                    */
  /* ------------------------------------------------------------------ */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ------------------------------------------------------------------ */
  /* Misc                                                                */
  /* ------------------------------------------------------------------ */
  function initMisc() {
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", function () {
    initLanguage();
    initHeader();
    initReveal();
    initMisc();
  });
})();
