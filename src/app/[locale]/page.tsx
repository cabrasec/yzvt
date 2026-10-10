import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Purpose } from "@/components/Purpose";
import { Process } from "@/components/Process";
import { Thoughts } from "@/components/Thoughts";
import { Contact } from "@/components/Contact";
import { Closing } from "@/components/Closing";
import { Footer } from "@/components/Footer";
import { buildAlternates, buildOpenGraph } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: buildAlternates(locale, ""),
    openGraph: buildOpenGraph(locale, ""),
  };
}

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Purpose />
        <Process />
        <Thoughts />
        <Contact />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
