<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useChatting } from '@/composables/useChatting/useChatting.ts'

export default defineComponent({
  name: 'ChatHistory',
  setup() {
    const {} = useChatting()
    const historyChat = [
      {
        id: 1,
        name: 'John Doe',
        avatar: 'https://minimomonimi.com/cdn/shop/products/simple-avatar-minimomonimi-cartoonish-minimalist-01.png?v=1664979841',
        message: 'Hello, how are you?',
        time: '10:00',
        unread: true,
        active: true
      },
      {
        id: 2,
        name: 'Jane Doe',
        avatar: 'https://minimomonimi.com/cdn/shop/products/simple-avatar-minimomonimi-cartoonish-minimalist-01.png?v=1664979841',
        message: 'I am fine, thank you',
        time: '10:01',
        unread: false
      },
      {
        id: 3,
        name: 'John Smith',
        avatar: 'https://minimomonimi.com/cdn/shop/products/simple-avatar-minimomonimi-cartoonish-minimalist-01.png?v=1664979841',
        message: 'How about you?',
        time: '10:02',
        unread: true
      }
    ]

    const handleSelectChat = (id: string) => {
    }

    const currentChat = computed(() => {
      return '123'
    })

    return {
      historyChat,
      currentChat,
      handleSelectChat
    }
  }
})
</script>

<template>
  <div class="flex w-full flex-col overflow-y-hidden">
    <h1 class="mb-2 font-semibold">Chats</h1>
    <div class="relative mb-3 w-full items-center">
      <Input id="search" class="pl-9" placeholder="Search in chat ..." type="text" />
      <div class="absolute inset-y-0 flex items-center justify-center px-3 start-0">
        <Icon class="size-4 text-gray-400 cursor-pointer" icon="lucide:search" />
      </div>
    </div>
    <div class="overflow-y-scroll space-y-1 h-full">
      <div v-if="!historyChat.length">
        <p class="text-center text-gray-400 font-light text-sm mt-10">No chat found</p>
      </div>
      <div v-for="chat in historyChat" :key="chat.id"
           :class="['flex items-center justify-between p-3 rounded-[10px] duration-200 cursor-pointer',
             currentChat === chat.id.toString() ? 'bg-primary text-white' :'hover:bg-gray-100'
           ]"
           @click="handleSelectChat(chat.id.toString())"
      >
        <div class="flex items-center gap-3">
          <Avatar :image="chat.avatar" online size="xs" />
          <div>
            <h2 :class="chat.unread ? 'font-semibold' : ''">{{ chat.name }}</h2>
            <p :class="['font-light text-sm', chat.unread ? 'font-semibold' : '']">
              {{ chat.message }}</p>
          </div>
        </div>
        <div class="flex flex-col items-end">
          <p :class="['text-sm', chat.unread ? 'font-semibold' : '']">{{ chat.time }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>