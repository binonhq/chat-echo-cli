<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import Message from '@/views/components/Message.vue'
import { Input } from '@/components/ui/input'
import { Icon } from '@iconify/vue'
import { Toggle } from '@/components/ui/toggle'
import Avatar from '@/views/components/Avatar.vue'
import { useChatting } from '@/composables/useChatting/useChatting.ts'
import { Message as MessageType } from '@/types/types.ts'

export type ChatInfo = {
  name: string,
  avatar: string
}

export default defineComponent({
  name: 'ChatBox',
  components: { Avatar, Toggle, Icon, Input, Message },
  setup(props, { emit }) {
    const { handleSendMessage, getDetailMessages, currentChannelId } = useChatting()

    const messageData = ref([] as MessageType[])
    const isShowStickerBox = ref(false)
    const isShowAttachFile = ref(false)
    const messageContent = ref('')
    const attachment = ref({} as File)
    const sticker = ref('')
    const chatInfo = ref({} as ChatInfo)

    const isDisableSendButton = computed(() => {
      return !messageContent.value && !attachment.value
    })

    const toggleStickerBox = () => {
      isShowStickerBox.value = !isShowStickerBox.value
    }
    const toggleShowAttachFile = () => {
      isShowAttachFile.value = !isShowAttachFile.value
    }
    const toggleShowChatInformation = () => {
      emit('toggle-show-chat-information', true)
    }
    const sendMessage = () => {
      const message = {
        content: messageContent.value,
        attachment: attachment.value,
        stickerId: sticker.value
      } as MessageType
      handleSendMessage(message)
    }
    const onFileChange = (e: any) => {
      attachment.value = e.target.files[0]
    }

    watch(() => currentChannelId.value, async (newVal) => {
        if (newVal) {
          const detailMessage = await getDetailMessages(newVal)
          messageData.value = detailMessage.messages
          chatInfo.value = {
            name: detailMessage?.name,
            avatar: detailMessage?.avatar
          }
        }
      },
      {
        immediate: true
      })


    return {
      isShowStickerBox,
      messageData,
      toggleStickerBox,
      toggleShowChatInformation,
      toggleShowAttachFile,
      sendMessage,
      isShowAttachFile,
      messageContent,
      attachment,
      isDisableSendButton,
      currentChannelId,
      chatInfo,
      onFileChange
    }
  }
})
</script>

<template>
  <div class="flex h-screen flex-col gap-5 p-5">
    <div v-if="!currentChannelId" class="text-center my-auto text-xl">
      Select a chat to start messaging
    </div>
    <template v-else>
      <div class="relative mb-3 w-full items-center">
        <Input id="search" class="pl-9" placeholder="Search in chat ..." type="text" />
        <div class="absolute inset-y-0 flex items-center justify-center px-3 start-0">
          <Icon class="size-4 text-gray-400 cursor-pointer" icon="lucide:search" />
        </div>
      </div>
      <div class="flex justify-between gap-2 items-center">
        <div class="space-y-2">
          <h2 class="text-sm font-light text-gray-500">Chat with</h2>
          <h2 class="text-xl font-semibold">{{ chatInfo.name }}</h2>
        </div>
        <div class="flex gap-3">
          <Icon class="size-5 text-primary cursor-pointer" icon="lucide:search" />
          <Icon class="size-5 text-primary cursor-pointer" icon="lucide:info" @click="toggleShowChatInformation" />
        </div>
      </div>
      <div v-if="!messageData.length" class="flex flex-col items-center gap-3 mt-32">
        <Avatar :image="chatInfo.avatar"
                online size="default" />
        <h2 class="text-xl font-semibold">{{ chatInfo.name }}</h2>
        <p class="font-light text-gray-400 text-sm">Start the first message...</p>
      </div>
      <div v-else class="mt-auto flex w-full flex-col overflow-y-scroll space-y-2">
        <Message v-for="message in messageData" :key="message.id" :message="message" class="max-w-1/2" />
      </div>
      <div class="mt-auto space-y-2">
        <div v-if="isShowAttachFile">
          <Input class="h-full" type="file" @change="onFileChange" />
        </div>
        <div class="flex w-full gap-2">
          <Input id="message" v-model="messageContent" class="w-full" placeholder="Type a message ..." type="text" />
          <Toggle @click="toggleStickerBox">
            <Icon icon="lucide:smile" />
          </Toggle>
          <Toggle @click="toggleShowAttachFile">
            <Icon icon="lucide:paperclip" />
          </Toggle>
          <Button :disabled="isDisableSendButton" class="px-8" @click="sendMessage">
            Send
          </Button>
        </div>
        <div v-if="isShowStickerBox" class="flex flex-col h-[300px]">
          <div class="mt-3 flex grow gap-5">
            <div class="bg-gray-200 text-center w-[70px] h-[70px] rounded-[2px]"></div>
            <div class="bg-gray-200 text-center w-[70px] h-[70px] rounded-[2px]"></div>
            <div class="bg-gray-200 text-center w-[70px] h-[70px] rounded-[2px]"></div>
            <div class="bg-gray-200 text-center w-[70px] h-[70px] rounded-[2px]"></div>
          </div>
          <div class="flex gap-3">
            <div class="bg-gray-200 text-center w-[30px] h-[30px] rounded-[2px]"></div>
            <div class="bg-gray-200 text-center w-[30px] h-[30px] rounded-[2px]"></div>
            <div class="bg-gray-200 text-center w-[30px] h-[30px] rounded-[2px]"></div>
            <div class="bg-gray-200 text-center w-[30px] h-[30px] rounded-[2px]"></div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>

</style>