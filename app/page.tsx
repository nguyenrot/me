import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import LinksSection from "@/components/LinksSection";
import SocialSection from "@/components/SocialSection";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/content";
import {
  HERO_DEFAULTS,
  ABOUT_DEFAULTS,
  SKILLS_DEFAULTS,
  JOURNEY_DEFAULTS,
  LINKS_DEFAULTS,
  SOCIAL_DEFAULTS,
} from "@/lib/defaults";

export default async function Home() {
  const [hero, about, skills, journey, links, social] = await Promise.all([
    getContent("me", "hero", HERO_DEFAULTS),
    getContent("me", "about", ABOUT_DEFAULTS),
    getContent("me", "skills", SKILLS_DEFAULTS),
    getContent("me", "experience", JOURNEY_DEFAULTS),
    getContent("me", "links", LINKS_DEFAULTS),
    getContent("me", "social", SOCIAL_DEFAULTS),
  ]);

  return (
    <>
      <div className="grain" aria-hidden />
      <main className="relative mx-auto max-w-6xl px-6 md:px-10">
        <HeroSection content={hero} />
        <AboutSection content={about} />
        <SkillsSection skills={skills} />
        <ExperienceSection journey={journey} />
        <LinksSection links={links} />
        <SocialSection socials={social} />
        <Footer />
      </main>
    </>
  );
}
