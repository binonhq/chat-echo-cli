<script lang="ts">
import { defineComponent, ref } from 'vue'
import MyProfileBar from '@/views/components/MyProfileBar.vue'
import ChatBox from '@/views/components/ChatBox.vue'
import ChatInformation from '@/views/components/ChatInformation.vue'

export default defineComponent({
  name: 'ChatPage',
  components: { ChatInformation, ChatBox, MyProfileBar },
  setup() {
    const showChatInformation = ref(false)
    const toggleChatInformation = (value: boolean) => {
      showChatInformation.value = value
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
    <ChatBox class="grow" @toggle-show-chat-information="toggleChatInformation" />
    <ChatInformation v-if="showChatInformation" @toggle-show-chat-information="toggleChatInformation" />
  </div>
</template>

<style scoped>

</style>