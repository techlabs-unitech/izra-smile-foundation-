import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { DonationSection } from "@/components/DonationSection";
import { Footer } from "@/components/Footer";
import { FounderSection } from "@/components/FounderSection";
import { GallerySection } from "@/components/GallerySection";
import { GetInvolvedSection } from "@/components/GetInvolvedSection";
import { Hero } from "@/components/Hero";
import { ImpactSection } from "@/components/ImpactSection";
import { Navbar } from "@/components/Navbar";
import { ProgramsSection } from "@/components/ProgramsSection";
import { SupportAreas } from "@/components/SupportAreas";
import { ValuesSection } from "@/components/ValuesSection";
import { VisionSection } from "@/components/VisionSection";

export default function Home() {
  return (
    <div className="overflow-x-hidden bg-white text-slate-900">
      <a
        href="#main-content"
        className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:not-sr-only focus:rounded-md focus:bg-white focus:px-4 focus:py-3 focus:text-slate-900 focus:shadow-lg"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <AboutSection />
        <FounderSection />
        <VisionSection />
        <SupportAreas />
        <ValuesSection />
        <ImpactSection />
        <ProgramsSection />
        <GallerySection />
        <GetInvolvedSection />
        <DonationSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
