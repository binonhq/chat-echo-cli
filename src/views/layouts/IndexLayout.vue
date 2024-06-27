<script lang="ts">
import { defineComponent } from 'vue'
import { useContext } from '@/composables/useContext'
import { Input } from '@/components/ui/input'

export default defineComponent({
  name: 'IndexLayout',
  components: { Input },
  setup() {
    const { isRedirecting, isLoading } = useContext()

    return {
      isRedirecting,
      isLoading
    }
  }
})
</script>

<template>
  <div class="relative">
    <div v-if="isRedirecting || isLoading" class="absolute top-0 loader"></div>
    <router-view />
  </div>
</template>

<style scoped>
.loader {
  width: 100%;
  height: 6px;
  background: linear-gradient(90deg, #0000, red) left -500px top 0/500px 500px no-repeat;
  animation: l2 1s infinite linear;
  z-index: 100;
}

@keyframes l2 {
  100% {
    background-position: right -50px top 0;
  }
}
</style>
