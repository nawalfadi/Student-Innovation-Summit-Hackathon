import { AmbientBackground } from "@/components/brand/AmbientBackground";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RegisterFlow } from "@/components/registration/RegisterFlow";

export default function RegisterPage() {
  return (
    <>
      <AmbientBackground />
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="section-container relative z-10 outline-none"
      >
        <div className="pb-20 pt-36 sm:pb-28 sm:pt-40">
          <RegisterFlow />
        </div>
      </main>
      <Footer />
    </>
  );
}
