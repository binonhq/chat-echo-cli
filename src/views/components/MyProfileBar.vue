<script lang="ts">
import { defineComponent } from 'vue'
import { Separator } from '@/components/ui/separator'
import Friends from '@/views/components/OnlineUsers.vue'
import ChatHistory from '@/views/components/ChatHistory.vue'
import { useAuth } from '@/composables/useAuth'
import Avatar from '@/views/components/Avatar.vue'
import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/vue'

export default defineComponent({
  name: 'MyProfileBar',
  components: { Icon, Button, Avatar, ChatHistory, Friends, Separator },
  setup() {
    const { currentUser } = useAuth()
    return { currentUser }
  }
})
</script>

<template>
  <div
    class="flex h-screen flex-col items-center gap-4 min-w-[450px] max-w-[450px] px-5 pt-5"
  >
    <Avatar
      :image-id="currentUser.avatarId"
      :user-id="currentUser.userId"
      class="mt-10"
      size="default"
    />
    <h1 class="mt-2 text-2xl font-semibold">
      {{ currentUser.firstName }} {{ currentUser.lastName }}
    </h1>
    <Separator class="w-full" />
    <Friends />
    <ChatHistory />
  </div>
</template>

<style scoped></style>
