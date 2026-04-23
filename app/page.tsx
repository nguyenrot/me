import Hero3D from "@/components/Hero3D";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import LinksSection from "@/components/LinksSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Hero3D />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <LinksSection />
      <Footer />
    </main>
  );
}
