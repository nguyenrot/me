<script setup lang="ts">
import type { ElsewhereContent } from '~/lib/defaults'
import { safeUrl } from '~/lib/sanitize'

defineProps<{ content: ElsewhereContent }>()

const { t } = useI18n()
</script>

<template>
  <section class="section" id="elsewhere">
    <div class="container">
      <header class="section__head">
        <span class="section__num">{{ t(content.section_num) }}</span>
        <h2 class="section__title">{{ t(content.title) }}</h2>
      </header>

      <ul class="links">
        <li v-for="item in content.items" :key="item.url">
          <a :href="safeUrl(item.url)" target="_blank" rel="noopener">
            <span class="links__idx" aria-hidden>
              <!-- NOTE: These icons are the ORIGINAL marks drawn in the design
                   prototype — not the official platform brand logos. Swap each
                   for the official SVG before public launch. -->
              <svg
                v-if="item.icon === 'github'"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6.5 5.2c-.3 0-.4.3-.3.6l.9 2.2c-.7.9-1.1 2-1.1 3.2 0 3.6 2.7 5 5 5.3-.3.2-.5.6-.6 1-.7.3-1.7.3-2.4-.7-.3-.5-.8-.9-1.4-.9-.4 0-.5.3-.2.5.5.3.9.7 1.2 1.3.3.7 1 1.5 2.7 1.2v1.7c0 .3.2.5.4.5h3.5c.2 0 .4-.2.4-.5v-2.6c0-.5-.2-1-.5-1.4 2.3-.3 5-1.7 5-5.3 0-1.2-.4-2.3-1.1-3.2l.9-2.2c.1-.3 0-.6-.3-.6-.4 0-1.4.2-2.5.9-.8-.2-1.7-.4-2.6-.4s-1.8.1-2.6.4c-1.1-.7-2.1-.9-2.5-.9z" />
              </svg>
              <span
                v-else-if="item.icon === 'linkedin'"
                class="links__glyph links__glyph--in"
              >in</span>
              <span
                v-else-if="item.icon === 'facebook'"
                class="links__glyph links__glyph--f"
              >f</span>
              <svg
                v-else-if="item.icon === 'instagram'"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17" cy="7" r=".9" fill="currentColor" stroke="none" />
              </svg>
              <svg
                v-else-if="item.icon === 'threads'"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M15.8 11.2c-.4-2-1.8-3.2-3.8-3.2-1.7 0-3 .7-3.6 2" />
                <path d="M12.5 19.5c-3.8 0-6.5-2.8-6.5-7s2.7-8 7-8c3.5 0 5.8 2 6.4 4.5" />
                <path d="M19.4 9c.3.9.4 1.8.4 2.7 0 2.4-.9 4.2-2.5 5.3-1.4 1-3.4 1.2-4.7.4-1.2-.7-1.7-1.8-1.4-3 .5-1.8 2.3-2.4 4-2.3 2 .1 3.5 1 4.2 2.4" />
              </svg>
              <svg
                v-else-if="item.icon === 'tiktok'"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M10 4v11.5" />
                <path d="M10 4c.5 2.8 2.5 4.7 5.5 5" />
                <circle cx="7.5" cy="15.5" r="3" />
              </svg>
            </span>
            <span class="links__name">{{ item.name }}</span>
            <span class="links__handle">{{ item.handle }}</span>
            <span class="links__arrow" aria-hidden>→</span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
