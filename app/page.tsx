import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import StatsRow from "./components/StatsRow";
import PipelineActivity from "./components/PipelineActivity";
import TechStack from "./components/TechStack";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <StatsRow />
      <PipelineActivity />
      <TechStack />
      <Footer />
    </main>
  );
}
