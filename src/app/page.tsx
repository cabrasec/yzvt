import { Hero } from "@/components/Hero";
import { Purpose } from "@/components/Purpose";
import { Process } from "@/components/Process";
import { Thoughts } from "@/components/Thoughts";
import { Contact } from "@/components/Contact";
import { Closing } from "@/components/Closing";
import { Footer } from "@/components/Footer";

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
