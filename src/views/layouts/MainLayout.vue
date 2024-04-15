<script lang="ts">
import { defineComponent } from 'vue'
import SideBar from '@/views/components/SideBar.vue'

export default defineComponent({
  name: 'MainLayout',
  components: { SideBar }
})
</script>

<template>
  <div class="min-h-screen flex">
    <SideBar />
    <RouterView class="grow" />
  </div>
</template>

<style scoped>

</style>