import { Hero } from "@/components/Hero";
import { Purpose } from "@/components/Purpose";
import { Process } from "@/components/Process";
import { Thoughts } from "@/components/Thoughts";

export default function Home() {
  return (
    <main>
      <Hero />
      <Purpose />
      <Process />
      <Thoughts />
    </main>
  );
}
