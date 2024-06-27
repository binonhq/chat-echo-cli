<script lang="ts">
import { defineComponent, ref } from 'vue'
import MyProfileBar from '@/views/components/MyProfileBar.vue'
import ChatBox from '@/views/components/ChatBox.vue'
import ChatInformation from '@/views/components/ChatInformation.vue'
import SideBar from '@/views/components/SideBar.vue'

export default defineComponent({
  name: 'ChatPage',
  components: { SideBar, ChatInformation, ChatBox, MyProfileBar },
  setup() {
    const showChatInformation = ref(false)
    const toggleChatInformation = (value) => {
      if (value !== undefined) {
        showChatInformation.value = value
        return
      }
      showChatInformation.value = !showChatInformation.value
    }

    return {
      showChatInformation,
      toggleChatInformation
    }
  }
})
</script>

<template>
  <div class="flex h-full">
    <MyProfileBar />
    <ChatBox
      class="grow"
      @toggle-show-chat-information="toggleChatInformation"
    />
    <div>
      <ChatInformation
        :class="showChatInformation ? 'w-[450px] opacity-100' : 'w-0 opacity-0'"
        class="overflow-y-hidden duration-200 transition-all ease-out"
        @toggle-show-chat-information="toggleChatInformation"
      />
    </div>
  </div>
</template>

<style scoped></style>
