// app/page.jsx
import Hero from "@/components/sections/hero/Hero";
import Services from "@/components/sections/services/Services";
import Process from "@/components/sections/process/Process";
import SelectedWorks from "@/components/sections/works/SelectedWorks"
import Technologies from "@/components/sections/technologies/Technologies";
import ManifestoCarousel from "@/components/sections/ManifestoCarousel/ManifestoCarousel";
import CTA from "@/components/sections/cta/CTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Services />
      <Process />
      <SelectedWorks />
      <Technologies />
      <ManifestoCarousel />
      <CTA />
      <Footer />
      {/* Scroll scroll wenna podi space ekak (Testing purpose) */}
      {/* <div className="h-screen w-full bg-background relative z-10 border-t border-white/5">
        <div className="container mx-auto px-4 pt-32 text-center text-white/30 font-mono text-sm">
          [Next Section: Engineering Services]
        </div>
      </div> */}
    </div>
  );
}