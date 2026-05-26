<script setup lang="ts">
import { ACCENT_SWATCHES, type Accent } from '~/composables/usePrefs'

const { t, UI } = useI18n()
const { lang, theme, accent, setLang, setTheme, setAccent } = usePrefs()

type NavLinkKey = 'about' | 'skills' | 'experience' | 'projects' | 'elsewhere'

const NAV_LINKS: { id: NavLinkKey; idx: string }[] = [
  { id: 'about', idx: '01' },
  { id: 'skills', idx: '02' },
  { id: 'experience', idx: '03' },
  { id: 'projects', idx: '04' },
  { id: 'elsewhere', idx: '05' },
]

const current = ref<NavLinkKey | null>(null)
const clock = ref('--:--:-- ICT')
const pickerOpen = ref(false)
const pickerRef = ref<HTMLDivElement | null>(null)

let intersectionObserver: IntersectionObserver | null = null
let clockTimer: number | null = null

function tickClock() {
  const now = new Date()
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000
  const ict = new Date(utcMs + 7 * 3600000)
  const pad = (n: number) => String(n).padStart(2, '0')
  clock.value = `${pad(ict.getHours())}:${pad(ict.getMinutes())}:${pad(ict.getSeconds())} ICT`
}

function scrollToAnchor(href: string | null) {
  if (!href?.startsWith('#')) return
  const id = href.slice(1)
  if (id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const target = document.getElementById(id)
  if (!target) return
  const nav = document.querySelector('.nav') as HTMLElement | null
  const navH = nav?.offsetHeight ?? 0
  const top = target.getBoundingClientRect().top + window.scrollY - navH - 8
  window.scrollTo({ top, behavior: 'smooth' })
}

function handleAnchor(e: MouseEvent) {
  e.preventDefault()
  scrollToAnchor((e.currentTarget as HTMLAnchorElement).getAttribute('href'))
}

function onDocMouseDown(e: MouseEvent) {
  if (!pickerOpen.value) return
  if (!pickerRef.value?.contains(e.target as Node)) pickerOpen.value = false
}

onMounted(() => {
  tickClock()
  clockTimer = window.setInterval(tickClock, 1000)

  const targets = NAV_LINKS
    .map((l) => document.getElementById(l.id))
    .filter((el): el is HTMLElement => el !== null)

  if (targets.length) {
    intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) current.value = e.target.id as NavLinkKey
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
    )
    targets.forEach((el) => intersectionObserver?.observe(el))
  }

  document.addEventListener('mousedown', onDocMouseDown)
})

onBeforeUnmount(() => {
  if (clockTimer != null) window.clearInterval(clockTimer)
  intersectionObserver?.disconnect()
  document.removeEventListener('mousedown', onDocMouseDown)
})
</script>

<template>
  <header class="nav" id="top">
    <div class="nav__inner">
      <a href="#top" class="nav__brand" aria-label="Home" @click="handleAnchor">
        <span class="nav__brand-mark" aria-hidden />
        <span class="nav__brand-text">
          kynguyen<span class="dim">.cc</span>
        </span>
      </a>

      <nav class="nav__links" aria-label="Sections">
        <a
          v-for="l in NAV_LINKS"
          :key="l.id"
          :href="`#${l.id}`"
          :class="current === l.id ? 'is-current' : undefined"
          @click="handleAnchor"
        >
          <span class="dim">{{ l.idx }}</span>&nbsp;<span>{{ t(UI.nav[l.id]) }}</span>
        </a>
      </nav>

      <div class="nav__actions">
        <span class="clock" aria-label="Đà Nẵng local time">{{ clock }}</span>

        <div class="langtoggle" role="group" :aria-label="t(UI.ariaLanguage)">
          <button
            type="button"
            :class="lang === 'en' ? 'is-active' : undefined"
            @click="setLang('en')"
          >EN</button>
          <button
            type="button"
            :class="lang === 'vi' ? 'is-active' : undefined"
            @click="setLang('vi')"
          >VI</button>
        </div>

        <div class="accent-picker" ref="pickerRef">
          <button
            type="button"
            class="iconbtn"
            :aria-label="t(UI.ariaAccent)"
            @click="pickerOpen = !pickerOpen"
          >
            <span class="accent-picker__swatch" aria-hidden />
          </button>
          <div class="accent-picker__pop" :hidden="!pickerOpen" role="menu">
            <button
              v-for="sw in ACCENT_SWATCHES"
              :key="sw.value"
              type="button"
              :aria-label="sw.value"
              :class="accent === sw.value ? 'is-active' : undefined"
              :style="{ '--sw': sw.color }"
              @click="setAccent(sw.value as Accent); pickerOpen = false"
            />
          </div>
        </div>

        <div class="themetoggle" role="radiogroup" :aria-label="t(UI.ariaToggleTheme)">
          <button
            type="button"
            role="radio"
            :aria-checked="theme === 'light'"
            :aria-label="t(UI.themeLight)"
            :title="t(UI.themeLight)"
            :class="theme === 'light' ? 'is-active' : undefined"
            @click="setTheme('light')"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
              <circle cx="8" cy="8" r="3" />
              <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.4 1.4M11.55 11.55l1.4 1.4M3.05 12.95l1.4-1.4M11.55 4.45l1.4-1.4" />
            </svg>
          </button>
          <button
            type="button"
            role="radio"
            :aria-checked="theme === 'system'"
            :aria-label="t(UI.themeSystem)"
            :title="t(UI.themeSystem)"
            :class="theme === 'system' ? 'is-active' : undefined"
            @click="setTheme('system')"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="1.75" y="2.75" width="12.5" height="8.5" rx="0.8" />
              <line x1="5" y1="13.75" x2="11" y2="13.75" />
              <line x1="8" y1="11.25" x2="8" y2="13.75" />
            </svg>
          </button>
          <button
            type="button"
            role="radio"
            :aria-checked="theme === 'dark'"
            :aria-label="t(UI.themeDark)"
            :title="t(UI.themeDark)"
            :class="theme === 'dark' ? 'is-active' : undefined"
            @click="setTheme('dark')"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M13 9.5A5.5 5.5 0 1 1 6.5 3a4.5 4.5 0 0 0 6.5 6.5z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Bottom dock — mobile only via CSS. Lives outside <main> so scroll math
       (.nav offsetHeight) keeps working. -->
  <nav class="dock" aria-label="Sections (mobile)">
    <div class="dock__inner">
      <a
        v-for="l in NAV_LINKS"
        :key="l.id"
        :href="`#${l.id}`"
        :class="current === l.id ? 'dock__item is-current' : 'dock__item'"
        :aria-current="current === l.id ? 'true' : undefined"
        @click="handleAnchor"
      >
        <span class="dock__icon" aria-hidden>
          <svg
            v-if="l.id === 'about'"
            viewBox="0 0 22 22"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="8" r="3.2" />
            <path d="M4.5 18c.7-3 3.4-4.8 6.5-4.8s5.8 1.8 6.5 4.8" />
          </svg>
          <svg
            v-else-if="l.id === 'skills'"
            viewBox="0 0 22 22"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M3.5 16.5h15" />
            <path d="M5 13l3-4 3 2 5-6" />
            <circle cx="5" cy="13" r="1.1" fill="currentColor" stroke="none" />
            <circle cx="8" cy="9" r="1.1" fill="currentColor" stroke="none" />
            <circle cx="11" cy="11" r="1.1" fill="currentColor" stroke="none" />
            <circle cx="16" cy="5" r="1.1" fill="currentColor" stroke="none" />
          </svg>
          <svg
            v-else-if="l.id === 'experience'"
            viewBox="0 0 22 22"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="3.5" y="5.5" width="15" height="12" rx="1.6" />
            <path d="M8 5.5V4.2c0-.5.4-.9.9-.9h4.2c.5 0 .9.4.9.9v1.3" />
            <path d="M3.5 10.5h15" />
          </svg>
          <svg
            v-else-if="l.id === 'projects'"
            viewBox="0 0 22 22"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1.2" />
            <rect x="12" y="3.5" width="6.5" height="6.5" rx="1.2" />
            <rect x="3.5" y="12" width="6.5" height="6.5" rx="1.2" />
            <rect x="12" y="12" width="6.5" height="6.5" rx="1.2" />
          </svg>
          <svg
            v-else-if="l.id === 'elsewhere'"
            viewBox="0 0 22 22"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M9.2 12.8l3.6-3.6" />
            <path d="M13 6l1.6-1.6a3.2 3.2 0 0 1 4.5 4.5L17.5 10.5" />
            <path d="M9 11.5l-1.6 1.6a3.2 3.2 0 0 0 4.5 4.5L13.5 16" />
          </svg>
        </span>
        <span class="dock__label">
          <span class="dock__idx">{{ l.idx }}</span>
          {{ t(UI.nav[l.id]) }}
        </span>
      </a>
    </div>
  </nav>
</template>
