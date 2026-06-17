<script setup lang="ts">
// WORLD CUP PROMO — seasonal cross-site marquee banner.
// Self-contained (pure scoped CSS, no Tailwind/theme dependency) so it renders
// identically when dropped into any X106 frontend. Remove this component +
// /wc2026-logo.png + the <WorldCupBanner /> in app.vue after the tournament.
const MESSAGE = 'Everything World Cup 2026_ → worldcup.kynguyen.cc'
</script>

<template>
  <a
    href="https://worldcup.kynguyen.cc/"
    target="_blank"
    rel="noopener"
    class="wc-banner"
    aria-label="Everything World Cup 2026 — worldcup.kynguyen.cc"
  >
    <div class="wc-marquee">
      <div class="wc-track">
        <span v-for="n in 12" :key="n" class="wc-item">
          <img src="/wc2026-logo.png" alt="" class="wc-logo" />{{ MESSAGE }}
        </span>
      </div>
      <div class="wc-track" aria-hidden="true">
        <span v-for="n in 12" :key="'b' + n" class="wc-item">
          <img src="/wc2026-logo.png" alt="" class="wc-logo" />{{ MESSAGE }}
        </span>
      </div>
    </div>
  </a>
</template>

<style scoped>
.wc-banner {
  display: block;
  overflow: hidden;
  padding: 0.625rem 0;
  text-decoration: none;
  background: linear-gradient(90deg, #e4007c, #f7941e, #ffde00, #00a651, #00aeef, #662d91, #e4007c);
  background-size: 200% 100%;
  animation: wc-bg 9s linear infinite;
}
.wc-marquee {
  display: flex;
  width: max-content;
}
.wc-track {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  animation: wc-scroll 200s linear infinite;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
}
.wc-banner:hover .wc-track {
  animation-play-state: paused;
}
.wc-item {
  padding: 0 1.5rem;
  font-size: 0.875rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
  color: #fff;
}
@media (min-width: 640px) {
  .wc-item {
    font-size: 1rem;
  }
}
.wc-logo {
  display: inline-block;
  height: 1.25rem;
  width: auto;
  margin-right: 0.375rem;
  vertical-align: -0.3em;
}
@keyframes wc-scroll {
  to {
    transform: translateX(-100%);
  }
}
@keyframes wc-bg {
  to {
    background-position: 200% 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .wc-banner,
  .wc-track {
    animation: none;
  }
}
</style>
