<script lang="ts">
import { defineComponent, ref } from 'vue'
import Message from '@/views/components/Message.vue'
import { Input } from '@/components/ui/input'

export default defineComponent({
  name: 'ChatBox',
  components: { Input, Message },
  setup() {
    const messageDataFake = [
      // {
      //   id: 1,
      //   message: 'Hello, how are you?',
      //   isMe: false
      // },
      // {
      //   id: 2,
      //   message: 'I am fine, thank you.',
      //   isMe: true
      // },
      // {
      //   id: 3,
      //   message: 'What are you doing?',
      //   isMe: false
      // },
      // {
      //   id: 4,
      //   message: 'I am working on my project.',
      //   isMe: true
      // },
      // {
      //   id: 5,
      //   message: 'That is great!',
      //   isMe: false
      // },
      // {
      //   id: 6,
      //   message: 'Yes, it is.',
      //   isMe: true
      // },
      // {
      //   id: 7,
      //   message: 'Hello, how are you?',
      //   isMe: false
      // },
      // {
      //   id: 8,
      //   message: 'I am fine, thank you.',
      //   isMe: true
      // },
      // {
      //   id: 9,
      //   message: 'What are you doing?',
      //   isMe: false
      // },
      // {
      //   id: 10,
      //   message: 'I am working on my project.',
      //   isMe: true
      // },
      // {
      //   id: 11,
      //   message: 'That is great!',
      //   isMe: false
      // },
      // {
      //   id: 12,
      //   message: 'Yes, it is.',
      //   isMe: true
      // },
      // {
      //   id: 13,
      //   message: 'Hello, how are you?',
      //   isMe: false
      // },
      // {
      //   id: 14,
      //   message: 'I am fine, thank you.',
      //   isMe: true
      // },
      // {
      //   id: 15,
      //   message: 'Hello! Nice to meetyou',
      //   isMe: false
      // },
      // {
      //   id: 16,
      //   message: 'I am working on my project.',
      //   isMe: true
      // },
      // {
      //   id: 17,
      //   message: 'That is great!',
      //   isMe: false
      // },
      // {
      //   id: 18,
      //   message: 'Yes, it is.',
      //   isMe: true
      // },
      {
        id: 19,
        message: 'Hello, how are you?',
        isMe: false
      },
      {
        id: 20,
        message: 'I am fine, thank you.',
        isMe: true
      },
      {
        id: 21,
        message: 'What are you doing?',
        isMe: false
      },
      {
        id: 22,
        message: 'I am working on my project.',
        isMe: true
      },
      {
        id: 23,
        message: 'That is great!',
        isMe: false
      },
      {
        id: 24,
        message: 'Yes, it is.',
        isMe: true
      }
    ]
    const isShowStickerBox = ref(false)
    const isHasFileAttached = ref(false)
    const toggleStickerBox = () => {
      isShowStickerBox.value = !isShowStickerBox.value
    }
    return {
      isShowStickerBox,
      messageDataFake,
      toggleStickerBox,
      isHasFileAttached
    }
  }
})
</script>

<template>
  <div class="px-10 py-5 flex flex-col gap-5 h-screen">
    <div class="relative w-full items-center mb-3">
      <Input id="search" class="pl-8" placeholder="Search in chat ..." type="text" />
      <div class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
        <svg class="size-5 text-muted-foreground" fill="none" stroke="currentColor" stroke-width="1.5"
             viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg">
          <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>
      </div>
    </div>
    <div class="space-y-2">
      <h2 class="text-sm font-light text-gray-500">Chat with</h2>
      <h2 class="font-semibold text-xl">Bino</h2>
    </div>
    <div class="flex flex-col space-y-2 w-full overflow-y-scroll mt-auto">
      <Message v-for="message in messageDataFake" :key="message.id" :message="message" class="max-w-1/2" />
    </div>
    <div v-if="isHasFileAttached">
      <Input type="file" />
    </div>
    <div class="flex w-full gap-4">
      <Input id="message" class="w-full" placeholder="Type a message ..." type="text" />
      <Button :class="{'bg-stone-300' : isShowStickerBox}" variant="secondary" @click="toggleStickerBox">
        =))
      </Button>
      <Button variant="secondary" @click="()=>{ isHasFileAttached = !isHasFileAttached}">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg">
          <path
            d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
            stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </Button>
      <Button class="w-36">
        Send
      </Button>
    </div>
    <div v-if="isShowStickerBox" class="h-[500px] flex flex-col border-t border-gray-100">
      <div class="grow flex gap-5 mt-3">
        <div class="w-[70px] h-[70px] bg-gray-200 rounded-[2px] text-center"></div>
        <div class="w-[70px] h-[70px] bg-gray-200 rounded-[2px] text-center"></div>
        <div class="w-[70px] h-[70px] bg-gray-200 rounded-[2px] text-center"></div>
        <div class="w-[70px] h-[70px] bg-gray-200 rounded-[2px] text-center"></div>
      </div>
      <div class="flex gap-3">
        <div class="w-[30px] h-[30px] bg-gray-200 rounded-[2px] text-center"></div>
        <div class="w-[30px] h-[30px] bg-gray-200 rounded-[2px] text-center"></div>
        <div class="w-[30px] h-[30px] bg-gray-200 rounded-[2px] text-center"></div>
        <div class="w-[30px] h-[30px] bg-gray-200 rounded-[2px] text-center"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>