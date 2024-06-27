<script lang="ts">
import { defineComponent, watch } from 'vue'
import SideBar from '@/views/components/SideBar.vue'
import { useAuth } from '@/composables/useAuth'
import router from '@/router/router.ts'
import { useChatting } from '@/composables/useChatting/useChatting.ts'
import CallRequestDialog from '@/views/components/CallRequestDialog.vue'

export default defineComponent({
  name: 'MainLayout',
  components: { CallRequestDialog, SideBar },
  setup() {
    const { isAuthenticated } = useAuth()
    const { connectToWebsocket } = useChatting()

    watch(
      () => isAuthenticated.value,
      (isAuthenticated) => {
        if (!isAuthenticated) {
          router.push('/login')
          return
        }
        connectToWebsocket()
      },
      {
        immediate: true
      }
    )

    return {}
  }
})
</script>

<template>
  <div class="flex w-full min-h-screen z-0">
    <SideBar class="h-screen" />
    <RouterView class="grow" />
  </div>
  <CallRequestDialog />
</template>

<style scoped></style>
