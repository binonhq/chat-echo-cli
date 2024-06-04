<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Logo',
  props: {
    showName: Boolean,
    size: {
      type: String,
      default: 'small'
    }
  },
  setup(props) {
    const textProps = props.size === 'big' ? 'text-xl' : 'text-md'
    const logoProps = props.size === 'big' ? 'w-16' : 'w-10'
    return {
      textProps,
      logoProps
    }
  }
})
</script>

<template>
  <div class="flex items-center gap-2">
    <img :class=logoProps alt="Logo" src="@/assets/images/logo.png">
    <h2 v-if="showName" :class="['font-bold text-primary', textProps]">ChatEcho</h2>
  </div>
</template>

<style scoped>

</style>