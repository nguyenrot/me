<script setup lang="ts">
// usePrefs hooks document.documentElement attributes after mount so the
// resolved theme matches the inline preboot script that ran before
// hydration (see nuxt.config.ts → app.head.script).
usePrefs()
</script>

<template>
  <NuxtPage />
</template>
