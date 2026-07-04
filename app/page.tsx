import { Suspense } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import PrizeSection from "@/components/sections/PrizeSection";
import WhyAttend from "@/components/sections/WhyAttend";
import Agenda from "@/components/sections/Agenda";
import GuestSpeaker from "@/components/sections/GuestSpeaker";
import LogoCarousel from "@/components/sections/LogoCarousel";
import Testimonials from "@/components/sections/Testimonials";
import FAQSection from "@/components/sections/FAQSection";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/Footer";
import RSVPForm from "@/components/rsvp/RSVPForm";
import StickyRSVPButton from "@/components/StickyRSVPButton";
import Chatbot from "@/components/Chatbot";
import MouseGlow from "@/components/ui/MouseGlow";

export default function WebinarLandingPage() {
  return (
    <>
      <MouseGlow />
      <Nav />
      <main className="relative">
        <Hero />
        <LogoCarousel />
        <PrizeSection />
        <WhyAttend />
        <Agenda />
        <GuestSpeaker />

        {/* useSearchParams (for UTM + referral capture) requires a
            Suspense boundary around any component that calls it. */}
        <Suspense fallback={<div className="section-pad" />}>
          <RSVPForm />
        </Suspense>

        <Testimonials />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
      <StickyRSVPButton />
      <Chatbot />
    </>
  );
}
