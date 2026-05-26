<script setup lang="ts">
import type { HeroContent } from '~/lib/defaults'

defineProps<{ content: HeroContent }>()

const { t } = useI18n()
const heroRef = ref<HTMLElement | null>(null)

function onMove(e: MouseEvent) {
  const el = heroRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100
  el.style.setProperty('--sx', `${x}%`)
  el.style.setProperty('--sy', `${y}%`)
}

function onEnter() {
  heroRef.value?.classList.add('is-active')
}
function onLeave() {
  heroRef.value?.classList.remove('is-active')
}

function handleAnchor(e: MouseEvent) {
  const anchor = e.currentTarget as HTMLAnchorElement
  const href = anchor.getAttribute('href')
  if (!href?.startsWith('#')) return
  const target = document.getElementById(href.slice(1))
  if (!target) return
  e.preventDefault()
  const nav = document.querySelector('.nav') as HTMLElement | null
  const navH = nav?.offsetHeight ?? 0
  const top = target.getBoundingClientRect().top + window.scrollY - navH - 8
  window.scrollTo({ top, behavior: 'smooth' })
}
</script>

<template>
  <section
    ref="heroRef"
    class="hero"
    id="hero"
    @mousemove="onMove"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <div class="hero__year" aria-hidden>
      {{ content.year }}
    </div>
    <div class="hero__spotlight" aria-hidden />

    <div class="container">
      <div class="hero__status">
        <span class="badge">
          <span class="badge__dot" />
          <span>{{ t(content.status_badge) }}</span>
        </span>
        <span class="rule" />
        <span class="hero__meta">{{ t(content.status_meta) }}</span>
      </div>

      <div class="hero__grid">
        <div class="hero__main">
          <p class="kicker">
            <span class="dim">{{ content.kicker_prefix }}</span>
            <span>{{ t(content.kicker) }}</span>
          </p>
          <h1 class="hero__name">
            <span class="hero__name-line">{{ content.name_first }}</span>
            <br />
            <span class="hero__name-line">{{ content.name_last }}</span>
            <span class="hero__name-cursor" aria-hidden>_</span>
          </h1>
          <div
            class="hero__role"
            :aria-label="`role: ${content.role_value} at ${content.at_value}`"
          >
            <div class="hero__role-row">
              <span class="hero__role-key">{{ content.role_label }}</span>
              <span class="hero__role-eq">=</span>
              <span class="hero__role-val">
                &ldquo;{{ content.role_value }}&rdquo;<span class="hero__role-punc">,</span>
              </span>
            </div>
            <div class="hero__role-row">
              <span class="hero__role-key">{{ content.at_label }}</span>
              <span class="hero__role-eq">=</span>
              <span class="hero__role-val">&ldquo;{{ content.at_value }}&rdquo;</span>
            </div>
          </div>

          <p class="hero__lede">{{ t(content.lede) }}</p>

          <div class="hero__ctas">
            <a class="btn btn--primary" href="#projects" @click="handleAnchor">
              <span>{{ t(content.cta_primary) }}</span>
              <span aria-hidden class="btn__arrow">→</span>
            </a>
            <a class="btn btn--ghost" href="#about" @click="handleAnchor">
              <span>{{ t(content.cta_ghost) }}</span>
              <span aria-hidden class="btn__arrow">↓</span>
            </a>
          </div>
        </div>

        <aside class="hero__side">
          <figure class="portrait">
            <div class="portrait__frame">
              <img class="portrait__img" src="/portrait.jpg" alt="Phạm Kỷ Nguyên" />
              <div class="portrait__crosshair" aria-hidden>
                <span class="ch ch-tl" />
                <span class="ch ch-tr" />
                <span class="ch ch-bl" />
                <span class="ch ch-br" />
              </div>
            </div>
            <figcaption class="portrait__caption">
              <div>
                <span class="dim">{{ t(content.portrait.subject_label) }}&nbsp;</span>
                {{ content.portrait.subject_value }}
              </div>
              <div>
                <span class="dim">{{ t(content.portrait.captured_label) }}&nbsp;</span>
                {{ content.portrait.captured_value }}
              </div>
            </figcaption>
          </figure>

          <dl class="datasheet">
            <div v-for="row in content.datasheet" :key="row.label">
              <dt>{{ row.label }}</dt>
              <dd>
                <template v-if="row.ok">
                  <span class="ok">●</span>
                  {{ ' ' }}
                </template>
                {{ t(row.value) }}
              </dd>
            </div>
          </dl>
        </aside>
      </div>

      <div class="hero__foot">
        <span>{{ t(content.foot) }}</span>
        <span class="rule" />
        <span class="dim">{{ content.foot_dim }}</span>
      </div>
    </div>
  </section>
</template>
