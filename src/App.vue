<script lang="ts">
import { defineComponent } from 'vue'
import { Toaster } from '@/components/ui/toast'

export default defineComponent({
  name: 'App',
  components: { Toaster }
})
</script>

<template>
  <Toaster />
  <RouterView />
</template>

<style scoped>

</style>