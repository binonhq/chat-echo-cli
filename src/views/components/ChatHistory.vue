<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ChatHistory',
  setup() {
    const historyChatFake = [
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
      },
      {
        id: 4,
        name: 'Jane Smith',
        avatar: 'https://minimomonimi.com/cdn/shop/products/simple-avatar-minimomonimi-cartoonish-minimalist-01.png?v=1664979841',
        message: 'I am fine too',
        time: '10:03',
        unread: false
      },
      {
        id: 5,
        name: 'John Doe',
        avatar: 'https://minimomonimi.com/cdn/shop/products/simple-avatar-minimomonimi-cartoonish-minimalist-01.png?v=1664979841',
        message: 'Hello, how are you?',
        time: '10:00',
        unread: true
      },
      {
        id: 6,
        name: 'Jane Doe',
        avatar: 'https://minimomonimi.com/cdn/shop/products/simple-avatar-minimomonimi-cartoonish-minimalist-01.png?v=1664979841',
        message: 'I am fine, thank you',
        time: '10:01',
        unread: false
      },
      {
        id: 7,
        name: 'John Smith',
        avatar: 'https://minimomonimi.com/cdn/shop/products/simple-avatar-minimomonimi-cartoonish-minimalist-01.png?v=1664979841',
        message: 'How about you?',
        time: '10:02',
        unread: true
      },
      {
        id: 8,
        name: 'John Smith',
        avatar: 'https://minimomonimi.com/cdn/shop/products/simple-avatar-minimomonimi-cartoonish-minimalist-01.png?v=1664979841',
        message: 'How about you?',
        time: '10:02',
        unread: true
      },
      {
        id: 9,
        name: 'John Smith',
        avatar: 'https://minimomonimi.com/cdn/shop/products/simple-avatar-minimomonimi-cartoonish-minimalist-01.png?v=1664979841',
        message: 'How about you?',
        time: '10:02',
        unread: true
      }, {
        id: 10,
        name: 'John Smith',
        avatar: 'https://minimomonimi.com/cdn/shop/products/simple-avatar-minimomonimi-cartoonish-minimalist-01.png?v=1664979841',
        message: 'How about you?',
        time: '10:02',
        unread: true
      }
    ]
    return {
      historyChatFake
    }
  }
})
</script>

<template>
  <div class="w-full flex flex-col overflow-y-hidden">
    <h1 class="font-semibold mb-2">Chats</h1>
    <div class="relative w-full max-w-sm items-center mb-3">
      <Input id="search" class="pl-8" placeholder="Search chat ..." type="text" />
      <div class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
        <svg class="size-5 text-muted-foreground" fill="none" stroke="currentColor" stroke-width="1.5"
             viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg">
          <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>
      </div>
    </div>
    <div class="overflow-y-scroll">
      <div v-for="chat in historyChatFake" :key="chat.id"
           :class="['flex items-center justify-between p-3 rounded-[10px]', {
              'bg-stone-700 text-white': chat.active
           }]"
      >
        <div class="flex items-center gap-3">
          <img :src="chat.avatar" alt="avatar" class="w-12 h-12 rounded-full">
          <div>
            <h2 :class="chat.unread ? 'font-semibold' : 'text-gray-400'">{{ chat.name }}</h2>
            <p :class="['font-light text-sm', chat.unread ? 'font-semibold' : 'text-gray-400']">
              {{ chat.message }}</p>
          </div>
        </div>
        <div class="flex flex-col items-end">
          <p :class="['text-sm', chat.unread ? 'font-semibold' : 'text-gray-400']">{{ chat.time }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>