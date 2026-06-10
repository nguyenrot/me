<script setup lang="ts">
import type { ProjectsContent } from '~/lib/defaults'
import { safeUrl } from '~/lib/sanitize'

defineProps<{ content: ProjectsContent }>()

const { t, UI } = useI18n()

const SWIPE_HINT = { en: 'Swipe', vi: 'Vuốt' } as const
</script>

<template>
  <section class="section section--alt" id="projects">
    <div class="container">
      <header class="section__head section__head--row">
        <div>
          <span class="section__num">{{ t(content.section_num) }}</span>
          <h2 class="section__title">{{ t(content.title) }}</h2>
        </div>
        <div class="section__aside">
          <span class="dim">{{ t(content.aside_label) }}</span>
          <span class="bignum">{{ String(content.aside_count).padStart(2, '0') }}</span>
          <span class="projects__hint" aria-hidden>
            {{ t(SWIPE_HINT) }}
            <span class="projects__hint-arrow">→</span>
          </span>
        </div>
      </header>

      <div class="projects" role="list" :aria-label="t(UI.nav.projects)">
        <a
          v-for="p in content.items"
          :key="p.idx"
          class="proj"
          :href="safeUrl(p.url)"
          target="_blank"
          rel="noopener"
          role="listitem"
          :style="{ '--proj-tone': p.tone }"
        >
          <header class="proj__head">
            <span class="proj__idx">{{ p.idx }}</span>
            <span class="proj__ext" aria-hidden>↗</span>
          </header>
          <h3 class="proj__name">{{ t(p.name) }}</h3>
          <p class="proj__desc">{{ t(p.desc) }}</p>
          <footer class="proj__foot">
            <span class="proj__url">{{ p.url_label }}</span>
            <span class="proj__stack">{{ p.stack }}</span>
          </footer>
        </a>
      </div>
    </div>
  </section>
</template>
