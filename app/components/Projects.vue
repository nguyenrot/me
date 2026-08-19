<script setup lang="ts">
import type { Project, ProjectStatus, ProjectsContent } from '~/lib/defaults'
import { safeUrl } from '~/lib/sanitize'

const props = defineProps<{ content: ProjectsContent }>()

const { t, UI } = useI18n()

const SWIPE_HINT = { en: 'Swipe', vi: 'Vuốt' } as const

const STATUSES: readonly ProjectStatus[] = ['live', 'wip', 'archived', 'offline']

/** Unknown / missing status from the CMS falls back to `live`. */
const statusOf = (p: Project): ProjectStatus =>
  p.status && STATUSES.includes(p.status) ? p.status : 'live'

const isLive = (p: Project) => statusOf(p) === 'live'

/** Only live projects get a link — a dead domain is worse than no link. */
const items = computed(() =>
  (props.content.items ?? []).map((p) => {
    const status = statusOf(p)
    return { ...p, status, live: status === 'live' }
  }),
)

/* The aside counter is derived, not read from `aside_count`: the label says
   "live", so it has to track the cards that actually are. */
const liveCount = computed(() => items.value.filter((p) => p.live).length)

// 3D tilt-toward-cursor — desktop pointers only; touch devices and
// reduced-motion users keep the flat card.
const canTilt = () =>
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

function onTilt(e: PointerEvent) {
  if (!canTilt()) return
  const el = e.currentTarget as HTMLElement
  // Non-live cards aren't interactive — no tilt affordance either.
  if (el.classList.contains('proj--dim')) return
  const rect = el.getBoundingClientRect()
  const px = (e.clientX - rect.left) / rect.width - 0.5
  const py = (e.clientY - rect.top) / rect.height - 0.5
  el.style.setProperty('--ry', `${(px * 7).toFixed(2)}deg`)
  el.style.setProperty('--rx', `${(-py * 7).toFixed(2)}deg`)
}

function onTiltEnd(e: PointerEvent) {
  const el = e.currentTarget as HTMLElement
  el.style.setProperty('--rx', '0deg')
  el.style.setProperty('--ry', '0deg')
}
</script>

<template>
  <section class="section section--alt" id="projects">
    <div class="container">
      <header class="section__head section__head--row" data-reveal>
        <div>
          <span class="section__num">{{ t(content.section_num) }}</span>
          <h2 class="section__title">{{ t(content.title) }}</h2>
        </div>
        <div class="section__aside">
          <span class="dim">{{ t(UI.projects.liveLabel) }}</span>
          <span class="bignum" data-countup>{{ String(liveCount).padStart(2, '0') }}</span>
          <span class="projects__total dim">/ {{ items.length }}</span>
          <span class="projects__hint" aria-hidden>
            {{ t(SWIPE_HINT) }}
            <span class="projects__hint-arrow">→</span>
          </span>
        </div>
      </header>

      <div class="projects" role="list" :aria-label="t(UI.nav.projects)">
        <component
          :is="p.live ? 'a' : 'div'"
          v-for="(p, i) in items"
          :key="p.idx"
          class="proj"
          :class="{ 'proj--dim': !p.live }"
          :href="p.live ? safeUrl(p.url) : null"
          :target="p.live ? '_blank' : null"
          :rel="p.live ? 'noopener' : null"
          role="listitem"
          data-reveal="pop"
          :style="{ '--proj-tone': p.tone, '--rd': `${(i % 3) * 0.1}s` }"
          @pointermove="onTilt"
          @pointerleave="onTiltEnd"
        >
          <header class="proj__head">
            <span class="proj__idx">{{ p.idx }}</span>
            <span class="proj__head-end">
              <span class="proj__badge" :data-status="p.status">
                {{ t(UI.projects.status[p.status]) }}
              </span>
              <span v-if="p.live" class="proj__ext" aria-hidden>↗</span>
            </span>
          </header>
          <h3 class="proj__name">{{ t(p.name) }}</h3>
          <p class="proj__desc">{{ t(p.desc) }}</p>
          <footer class="proj__foot">
            <span class="proj__url">{{ p.url_label }}</span>
            <span class="proj__stack">{{ p.stack }}</span>
          </footer>
        </component>
      </div>
    </div>
  </section>
</template>
