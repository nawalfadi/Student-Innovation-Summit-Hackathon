import { AmbientBackground } from "@/components/brand/AmbientBackground";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Tracks } from "@/components/sections/Tracks";
import { Timeline } from "@/components/sections/Timeline";
import { Universities } from "@/components/sections/Universities";
import { Sponsors } from "@/components/sections/Sponsors";
import { CTA } from "@/components/sections/CTA";
import { RegistrationModal } from "@/components/registration/RegistrationModal";

export default function HomePage() {
  return (
    <>
      <AmbientBackground />
      <Header />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Tracks />
        <Timeline />
        <Universities />
        <Sponsors />
        <CTA />
      </main>
      <Footer />
      <RegistrationModal />
    </>
  );
}
