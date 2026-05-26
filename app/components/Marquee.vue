<script setup lang="ts">
import type { MarqueeContent } from '~/lib/defaults'

const props = defineProps<{ content: MarqueeContent }>()

// Duplicate the item list so a -50% translate produces a seamless loop.
const items = computed(() => [...props.content.items, ...props.content.items])

// Mobile pill — prefer the dotted "status" entry, otherwise the first item.
const pillItem = computed(
  () => props.content.items.find((it) => it.dot) ?? props.content.items[0] ?? { text: '', dot: false },
)
</script>

<template>
  <div class="marquee" aria-hidden>
    <div class="marquee__track">
      <template v-for="(item, i) in items" :key="i">
        <span class="marquee__item">
          <span v-if="item.dot" class="marquee__dot" />
          {{ item.text }}
        </span>
        <span class="marquee__sep">✦</span>
      </template>
    </div>
    <div class="marquee__pill">
      <span class="marquee__item">
        <span v-if="pillItem.dot" class="marquee__dot" />
        {{ pillItem.text }}
      </span>
    </div>
  </div>
</template>
