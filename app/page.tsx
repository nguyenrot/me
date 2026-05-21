import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import Scrollbar from "@/components/Scrollbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Elsewhere from "@/components/Elsewhere";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/content";
import {
  MARQUEE_DEFAULTS,
  HERO_DEFAULTS,
  ABOUT_DEFAULTS,
  SKILLS_DEFAULTS,
  EXPERIENCE_DEFAULTS,
  PROJECTS_DEFAULTS,
  ELSEWHERE_DEFAULTS,
} from "@/lib/defaults";

export default async function Home() {
  const [marquee, hero, about, skills, experience, projects, elsewhere] = await Promise.all([
    getContent("me", "marquee", MARQUEE_DEFAULTS),
    getContent("me", "hero", HERO_DEFAULTS),
    getContent("me", "about", ABOUT_DEFAULTS),
    getContent("me", "skills", SKILLS_DEFAULTS),
    getContent("me", "experience", EXPERIENCE_DEFAULTS),
    getContent("me", "projects", PROJECTS_DEFAULTS),
    getContent("me", "elsewhere", ELSEWHERE_DEFAULTS),
  ]);

  return (
    <>
      <Marquee content={marquee} />
      <Nav />
      <Scrollbar />
      <main>
        <Hero content={hero} />
        <About content={about} />
        <Skills content={skills} />
        <Experience content={experience} />
        <Projects content={projects} />
        <Elsewhere content={elsewhere} />
      </main>
      <Footer />
    </>
  );
}
