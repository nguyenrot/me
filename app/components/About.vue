<script setup lang="ts">
import type { AboutContent } from '~/lib/defaults'

defineProps<{ content: AboutContent }>()

const { t } = useI18n()
</script>

<template>
  <section class="section" id="about">
    <div class="container">
      <header class="section__head">
        <span class="section__num">{{ t(content.section_num) }}</span>
        <h2 class="section__title" v-html="t(content.title_html)" />
      </header>

      <div class="about__grid">
        <div class="about__prose">
          <p v-for="(p, i) in content.paragraphs_html" :key="i" v-html="t(p)" />

          <blockquote class="quote">
            <span class="quote__mark" aria-hidden>/*</span>
            <p v-html="t(content.quote_html)" />
            <span class="quote__mark quote__mark--end" aria-hidden>*/</span>
          </blockquote>

          <p class="about__sig">
            — KN, <span class="dim">{{ t(content.sig_prefix) }}</span>
            <time :datetime="content.sig_year">{{ content.sig_year }}</time>
          </p>
        </div>

        <aside class="about__card">
          <header class="card__head">
            <span class="card__label">{{ content.card_label }}</span>
            <span class="card__dot" aria-hidden />
          </header>
          <dl class="about__meta">
            <div v-for="(row, i) in content.card_meta" :key="i">
              <dt>{{ t(row.key) }}</dt>
              <dd>{{ t(row.value) }}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  </section>
</template>
