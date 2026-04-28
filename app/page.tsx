import Hero3D from "@/components/Hero3D";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import SocialSection from "@/components/SocialSection";
import LinksSection from "@/components/LinksSection";
import Footer from "@/components/Footer";
import SparkleOverlay from "@/components/SparkleOverlay";
import PageBackground from "@/components/PageBackground";
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
    getContent('me', 'hero',       HERO_DEFAULTS),
    getContent('me', 'about',      ABOUT_DEFAULTS),
    getContent('me', 'skills',     SKILLS_DEFAULTS),
    getContent('me', 'experience', JOURNEY_DEFAULTS),
    getContent('me', 'links',      LINKS_DEFAULTS),
    getContent('me', 'social',     SOCIAL_DEFAULTS),
  ])

  return (
    <>
      <PageBackground />
      <SparkleOverlay />
      <main className="relative z-10 min-h-screen overflow-x-hidden">
        <Hero3D content={hero} />
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
