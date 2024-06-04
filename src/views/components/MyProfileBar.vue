<script lang="ts">
import { defineComponent } from 'vue'
import { Separator } from '@/components/ui/separator'
import Friends from '@/views/components/OnlineUsers.vue'
import ChatHistory from '@/views/components/ChatHistory.vue'
import { useAuth } from '@/composables/useAuth'
import Avatar from '@/views/components/Avatar.vue'

export default defineComponent({
  name: 'MyProfileBar',
  components: { Avatar, ChatHistory, Friends, Separator },
  setup() {
    const { currentUser } = useAuth()
    return { currentUser }
  }
})
</script>

<template>
  <div class="flex h-screen flex-col items-center gap-4 border-gray-300 px-5 w-[400px] border-r-[1px]">
    <Avatar
      class="mt-10"
      image="https://minimomonimi.com/cdn/shop/products/simple-avatar-minimomonimi-cartoonish-minimalist-01.png?v=1664979841"
      online
      size="default"
    />
    <h1 class="mt-2 text-2xl font-semibold">{{ currentUser.firstName }} {{ currentUser.lastName }}</h1>
    <Separator class="w-full" />
    <Friends />
    <ChatHistory />
  </div>
</template>

<style scoped>

</style>