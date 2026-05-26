<script setup lang="ts">
import type { SkillsContent } from '~/lib/defaults'

defineProps<{ content: SkillsContent }>()

const { t } = useI18n()
</script>

<template>
  <section class="section section--alt" id="skills">
    <div class="container">
      <header class="section__head section__head--row">
        <div>
          <span class="section__num">{{ t(content.section_num) }}</span>
          <h2 class="section__title">{{ t(content.title) }}</h2>
        </div>
        <div class="section__aside">
          <span class="dim">{{ t(content.aside_label) }}</span>
          <span class="bignum">{{ String(content.aside_count).padStart(2, '0') }}</span>
        </div>
      </header>

      <div class="skills">
        <article
          v-for="s in content.items"
          :key="s.idx"
          class="skill"
          :style="{ '--pct': s.pct }"
        >
          <header class="skill__head">
            <span class="skill__idx">{{ s.idx }}</span>
            <h3 class="skill__name">{{ t(s.name) }}</h3>
            <span class="skill__pct">
              <span class="pct__num">{{ s.pct }}</span>
              <span class="pct__unit">/100</span>
            </span>
          </header>
          <div class="skill__bar" aria-hidden>
            <span class="skill__bar-fill" />
          </div>
          <p class="skill__desc">{{ t(s.desc) }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
