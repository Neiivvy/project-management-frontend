import Hero from "@/components/Hero";
import CoreCapabilities from "@/components/CoreCapabilities";
import Workflow from "@/components/Workflow";
import Solutions from "@/components/Solutions";
import PlatformHighlights from "@/components/PlatformHighlights";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <div>
      <Hero />
      <CoreCapabilities />
      <Workflow />
      <Solutions />
      <PlatformHighlights />
      <FinalCTA />
    </div>
  );
}
