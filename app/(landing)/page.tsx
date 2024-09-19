import HeroLanding from "@/components/ui/hero-landing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mahu-meeting | Multi-Person Conference",
  description: "Explore our multi-person conference solution. Featuring high-quality video calls, screen sharing, and real-time collaboration tools to empower your remote teams.",
  keywords: "multi-person conference, video conferencing, remote collaboration, online meetings",
};

function LandingPage() {
  return (
    <HeroLanding></HeroLanding>
  )
}

export default LandingPage