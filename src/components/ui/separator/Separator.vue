<script lang="ts" setup>
import { computed, type HTMLAttributes } from 'vue'
import { Separator, type SeparatorProps } from 'radix-vue'
import { cn } from '@/utils'

const props = defineProps<SeparatorProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <Separator
    :class="cn('shrink-0 bg-border', props.orientation === 'vertical' ? 'w-px h-full' : 'h-px w-full', props.class)"
    v-bind="delegatedProps"
  />
</template>
