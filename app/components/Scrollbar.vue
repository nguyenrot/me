<script setup lang="ts">
const pct = ref(0)
const thumbH = ref(0)

function update() {
  const doc = document.documentElement
  const max = doc.scrollHeight - doc.clientHeight
  const ratio = max > 0 ? window.scrollY / max : 0
  const trackHeight = doc.clientHeight - 192 // matches CSS margin: 96px top + 96px bottom
  pct.value = ratio
  thumbH.value = Math.max(2, ratio * trackHeight)
}

onMounted(() => {
  update()
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', update)
  window.removeEventListener('resize', update)
})
</script>

<template>
  <div class="scrollbar" aria-hidden>
    <div class="scrollbar__track" />
    <div class="scrollbar__thumb" :style="{ height: `${thumbH}px` }" />
    <div class="scrollbar__label">{{ String(Math.round(pct * 100)).padStart(2, '0') }}%</div>
  </div>
</template>
