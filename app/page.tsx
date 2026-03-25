import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { PatientJourney } from "@/components/PatientJourney";
import { PricingSection } from "@/components/PricingSection";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { BookingProvider } from "@/components/BookingContext";
import { CookieBanner } from "@/components/CookieBanner";

export default function Home() {
  return (
    <BookingProvider>
      <main>
        <Navbar />
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <PatientJourney />
        <PricingSection />
        <Testimonials />
        <Footer />
      </main>
      <CookieBanner />
    </BookingProvider>
  );
}
