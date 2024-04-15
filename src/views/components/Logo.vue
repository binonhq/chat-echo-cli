<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Logo',
  props: {
    showName: Boolean,
  },
})
</script>

<template>
  <div class="flex gap-2 items-center">
    <img src="@/assets/images/logo.png" alt="Logo" class="w-10">
    <h2 v-if="showName" class="font-bold text-md text-primary">ChatEcho</h2>
  </div>
</template>

<style scoped>

</style>