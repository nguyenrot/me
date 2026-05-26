<script setup lang="ts">
const { t, UI } = useI18n()

function handleBackToTop(e: MouseEvent) {
  e.preventDefault()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__left">
        <p class="footer__name">Phạm Kỷ Nguyên</p>
        <p class="dim">{{ t(UI.footer.role) }}</p>
        <p class="footer__email">
          <a class="link-inline" href="mailto:nguyen@kynguyen.cc">nguyen@kynguyen.cc</a>
        </p>
      </div>

      <div class="footer__mid" aria-hidden>
        <span class="signature" role="img" aria-label="KN" />
      </div>

      <div class="footer__right">
        <p class="dim">© 2026 · me.kynguyen.cc</p>
        <a class="link-inline" href="#top" @click="handleBackToTop">
          {{ t(UI.footer.backToTop) }}
        </a>
      </div>
    </div>
  </footer>
</template>
