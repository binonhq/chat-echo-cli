<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import SideBar from '@/views/components/SideBar.vue'
import { useAuth } from '@/composables/useAuth'
import router from '@/router/router.ts'
import { useChatting } from '@/composables/useChatting/useChatting.ts'

export default defineComponent({
  name: 'MainLayout',
  components: { SideBar },
  setup() {
    const { isAuthenticated } = useAuth()
    const { connectToWebsocket } = useChatting()
    const navCollapsedSize = 4
    const isCollapsed = ref(false)

    const onCollapse = () => {
      isCollapsed.value = true
    }

    const onExpand = () => {
      isCollapsed.value = false
    }

    watch(() => isAuthenticated.value, (isAuthenticated) => {
      if (!isAuthenticated) {
        router.push('/login')
        return
      }
      connectToWebsocket()
    }, {
      immediate: true
    })

    return {
      navCollapsedSize,
      isCollapsed,
      onCollapse,
      onExpand
    }
  }
})
</script>

<template>
  <ResizablePanelGroup
    id="resize-panel-group-1"
    class="h-full items-stretch min-h-screen"
    direction="horizontal"
  >
    <ResizablePanel
      id="resize-panel-1"
      :class="isCollapsed ? 'min-w-[50px] transition-all duration-300 ease-in-out' : ''"
      :collapsed-size="navCollapsedSize"
      :default-size="0"
      :max-size="15"
      :min-size="15"
      collapsible
      @collapse="onCollapse"
      @expand="onExpand"
    >
      <SideBar :isCollapsed="isCollapsed" />
    </ResizablePanel>
    <ResizableHandle id="resize-handle-1" with-handle />
    <ResizablePanel id="resize-panel-2">
      <RouterView />
    </ResizablePanel>
  </ResizablePanelGroup>
</template>

<style scoped>

</style>