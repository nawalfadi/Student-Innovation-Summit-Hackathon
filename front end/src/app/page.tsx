import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Tracks } from "@/components/sections/Tracks";
import { Timeline } from "@/components/sections/Timeline";
import { Universities } from "@/components/sections/Universities";
import { Prizes } from "@/components/sections/Prizes";
import { Partners } from "@/components/sections/Partners";
import { CTA } from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <div className="landing-page">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Tracks />
        <Prizes />
        <Timeline />
        <Universities />
        <Partners />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
