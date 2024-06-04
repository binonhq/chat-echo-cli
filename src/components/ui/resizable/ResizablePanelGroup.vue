<script lang="ts" setup>
import { computed, type HTMLAttributes } from 'vue'
import { SplitterGroup, type SplitterGroupEmits, type SplitterGroupProps, useForwardPropsEmits } from 'radix-vue'
import { cn } from '@/utils'

const props = defineProps<SplitterGroupProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<SplitterGroupEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <SplitterGroup :class="cn('flex h-full w-full data-[panel-group-direction=vertical]:flex-col', props.class)"
                 v-bind="forwarded">
    <slot />
  </SplitterGroup>
</template>
