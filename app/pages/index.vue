<script setup lang="ts">
import Marquee from '~/components/Marquee.vue'
import Nav from '~/components/Nav.vue'
import Scrollbar from '~/components/Scrollbar.vue'
import Hero from '~/components/Hero.vue'
import About from '~/components/About.vue'
import Skills from '~/components/Skills.vue'
import Experience from '~/components/Experience.vue'
import Projects from '~/components/Projects.vue'
import Elsewhere from '~/components/Elsewhere.vue'
import Footer from '~/components/Footer.vue'
import {
  MARQUEE_DEFAULTS,
  HERO_DEFAULTS,
  ABOUT_DEFAULTS,
  SKILLS_DEFAULTS,
  EXPERIENCE_DEFAULTS,
  PROJECTS_DEFAULTS,
  ELSEWHERE_DEFAULTS,
} from '~/lib/defaults'

const [marquee, hero, about, skills, experience, projects, elsewhere] = await Promise.all([
  fetchContent('me', 'marquee', MARQUEE_DEFAULTS),
  fetchContent('me', 'hero', HERO_DEFAULTS),
  fetchContent('me', 'about', ABOUT_DEFAULTS),
  fetchContent('me', 'skills', SKILLS_DEFAULTS),
  fetchContent('me', 'experience', EXPERIENCE_DEFAULTS),
  fetchContent('me', 'projects', PROJECTS_DEFAULTS),
  fetchContent('me', 'elsewhere', ELSEWHERE_DEFAULTS),
])
</script>

<template>
  <Marquee :content="marquee" />
  <Nav />
  <Scrollbar />
  <main>
    <Hero :content="hero" />
    <About :content="about" />
    <Skills :content="skills" />
    <Experience :content="experience" />
    <Projects :content="projects" />
    <Elsewhere :content="elsewhere" />
  </main>
  <Footer />
</template>
