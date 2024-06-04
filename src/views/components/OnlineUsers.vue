<script lang="ts">
import { defineComponent } from 'vue'
import { useChatting } from '@/composables/useChatting/useChatting.ts'
import Avatar from '@/views/components/Avatar.vue'
import { Channel, User } from '@/types/types.ts'
import { useAuth } from '@/composables/useAuth'
import { useContext } from '@/composables/useContext'

export default defineComponent({
  name: 'OnlineUsers',
  components: { Avatar },
  setup() {
    const { onlineUsers, handleSelectChannel } = useChatting()
    const { setIsLoading } = useContext()
    const { currentUser } = useAuth()

    const handleSelect = async (user: User) => {
      setIsLoading(true)
      const channel = {
        userIds: [user.userId, currentUser.value.userId]
      } as Channel
      await handleSelectChannel(channel)
      setIsLoading(false)
    }
    
    return {
      onlineUsers,
      handleSelectChannel,
      handleSelect
    }
  }
})
</script>

<template>
  <div v-if="onlineUsers.length" class="flex w-full flex-col">
    <div class="flex justify-between font-semibold">
      <h2>Online</h2>
      <h2>{{ onlineUsers.length }}</h2>
    </div>
    <div class="flex h-full w-full gap-4 overflow-x-scroll py-5">
      <div v-for="user in onlineUsers" :key="user.userId" class="flex flex-col items-center gap-2 cursor-pointer"
           @click="handleSelect(user)">
        <Avatar v-if="user.avatar" :image="user.avatar" online size="sm" />
        <Avatar v-else
                image="https://minimomonimi.com/cdn/shop/products/simple-avatar-minimomonimi-cartoonish-minimalist-01.png?v=1664979841"
                online size="sm" />
        <span class="overflow-hidden truncate text-[8pt]">{{ user.firstName }} {{ user.lastName }}</span>
      </div>
    </div>
    <Separator class="w-full" />
  </div>
</template>

<style scoped>

</style>