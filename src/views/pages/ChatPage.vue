<script lang="ts">
import { defineComponent } from 'vue'
import MyProfileBar from '@/views/components/MyProfileBar.vue'
import ChatBox from '@/views/components/ChatBox.vue'
import ChatInformation from '@/views/components/ChatInformation.vue'

export default defineComponent({
  name: 'ChatPage',
  components: { ChatInformation, ChatBox, MyProfileBar }
})
</script>

<template>
  <div class="flex h-full">
    <MyProfileBar />
    <ChatBox class="grow" />
    <ChatInformation />
  </div>
</template>

<style scoped>

</style>