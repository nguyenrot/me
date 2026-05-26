<script setup lang="ts">
import type { ExperienceContent, ExperienceEntry } from '~/lib/defaults'

defineProps<{ content: ExperienceContent }>()

const { t } = useI18n()

function entryClass(e: ExperienceEntry) {
  if (e.variant === 'current') return 'entry entry--current'
  if (e.variant === 'edu') return 'entry entry--edu'
  return 'entry'
}
</script>

<template>
  <section class="section" id="experience">
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

      <ol class="timeline">
        <li v-for="(e, i) in content.entries" :key="i" :class="entryClass(e)">
          <div class="entry__year">
            <span>{{ e.year_start }}</span>
            <template v-if="e.year_end != null">
              <span class="dim">—</span>
              <span>{{ t(e.year_end) }}</span>
            </template>
          </div>
          <div class="entry__body">
            <div class="entry__title">
              <h3>{{ t(e.title) }}</h3>
              <span v-if="e.tag" class="tag">{{ t(e.tag) }}</span>
            </div>
            <p class="entry__org">
              {{ e.org }} <span class="dim">· {{ e.location }}</span>
            </p>
            <p class="entry__desc">{{ t(e.desc) }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
