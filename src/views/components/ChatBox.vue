<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch
} from 'vue'
import Message from '@/views/components/Message.vue'
import { Input } from '@/components/ui/input'
import { Icon } from '@iconify/vue'
import { Toggle } from '@/components/ui/toggle'
import Avatar from '@/views/components/Avatar.vue'
import { useChatting } from '@/composables/useChatting/useChatting.ts'
import { Message as MessageType } from '@/types/types.ts'
import { convertTime } from '../../utils/util.ts'
import { Button } from '@/components/ui/button'
import { Textarea as TextArea } from '@/components/ui/textarea'
import CallOption from '@/views/components/CallOption.vue'
import { Badge } from '@/components/ui/badge'
import { mainAxios } from '@/main.ts'
import { toast } from '@/components/ui/toast'

export type ChatInfo = {
  name: string
  avatarId: string
}

export default defineComponent({
  name: 'ChatBox',
  methods: { convertTime },
  components: {
    Badge,
    CallOption,
    TextArea,
    Button,
    Avatar,
    Toggle,
    Icon,
    Input,
    Message
  },
  setup(props, { emit }) {
    const {
      handleSendMessage,
      getDetailMessages,
      currentChannelId,
      conversation
    } = useChatting()

    const isShowStickerBox = ref(false)
    const isShowAttachFile = ref(false)
    const messageContent = ref('')
    const attachment = ref(null as File | null)
    const stickerId = ref('')
    const chatInfo = ref({} as ChatInfo)
    const chatBoxRef = ref<null | HTMLElement>(null)
    const channelType = ref('')
    const messageIndex = ref(0)
    const isSending = ref(false)

    const isDisableSendButton = computed(() => {
      return messageContent.value === '' && !attachment.value
    })

    const toggleStickerBox = () => {
      isShowStickerBox.value = !isShowStickerBox.value
    }
    const toggleShowAttachFile = () => {
      isShowAttachFile.value = !isShowAttachFile.value
    }
    const toggleShowChatInformation = () => {
      emit('toggle-show-chat-information')
    }

    const handleUploadAttachment = async () => {
      const file = attachment.value
      if (!file) return
      const formData = new FormData()
      formData.append('file', file)
      formData.append('kind', 'attachment')
      formData.append('channelId', currentChannelId.value)
      try {
        const response = await mainAxios.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          responseType: 'json'
        })
        return response.data.id
      } catch (e) {
        toast({
          title: 'Update avatar failed'
        })
      }
      return ''
    }

    const sendMessage = async () => {
      isSending.value = true
      if (isDisableSendButton.value) {
        return
      }
      const attachmentId = await handleUploadAttachment()

      const message = {
        content: messageContent.value,
        attachmentId: attachmentId,
        stickerId: stickerId.value,
        channelId: currentChannelId.value
      } as MessageType

      handleSendMessage(message)
      messageContent.value = ''
      attachment.value = null
      stickerId.value = ''
      isShowAttachFile.value = false
      isSending.value = false
    }
    const onFileChange = (e: any) => {
      attachment.value = e.target.files[0]
    }

    const scrollToBottom = () => {
      nextTick(() => {
        if (chatBoxRef.value) {
          chatBoxRef.value.scrollTop = chatBoxRef.value.scrollHeight
        }
      })
    }

    const loadOlderMessages = async () => {
      if (currentChannelId.value) {
        const previousScrollHeight = chatBoxRef.value?.scrollHeight || 0
        messageIndex.value++
        await getDetailMessages(currentChannelId.value, messageIndex.value)
        await nextTick(() => {
          if (chatBoxRef.value) {
            chatBoxRef.value.scrollTop =
              chatBoxRef.value.scrollHeight - previousScrollHeight
          }
        })
      }
    }

    const handleScroll = async () => {
      if (chatBoxRef.value && chatBoxRef.value.scrollTop === 0) {
        await loadOlderMessages()
      }
    }

    watch(
      () => currentChannelId.value,
      async (newVal) => {
        if (newVal) {
          messageIndex.value = 0
          const detailMessage = await getDetailMessages(
            newVal,
            messageIndex.value
          )
          chatInfo.value = {
            name: detailMessage?.name,
            avatarId: detailMessage?.avatarId
          }
          channelType.value = detailMessage?.type
          await nextTick(() => scrollToBottom())
        }
      },
      {
        immediate: true
      }
    )

    watch(
      () => conversation.value[conversation.value.length - 1],
      () => {
        scrollToBottom()
      }
    )

    const detailConversation = computed(() => {
      const groupedByDate = conversation.value.reduce(
        (acc: { [key: string]: any }, message) => {
          const date = new Date(message.createdAt).toDateString()
          if (!acc[date]) {
            acc[date] = []
          }
          acc[date].push(message)
          return acc
        },
        {}
      )

      return Object.entries(groupedByDate).map(([date, conversation]) => ({
        date,
        conversation
      }))
    })

    const removeAttachment = () => {
      attachment.value = null
      isShowAttachFile.value = false
    }

    onMounted(() => {
      if (chatBoxRef.value) {
        chatBoxRef.value.addEventListener('scroll', handleScroll)
      }
    })

    onBeforeUnmount(() => {
      if (chatBoxRef.value) {
        chatBoxRef.value.removeEventListener('scroll', handleScroll)
      }
    })

    return {
      detailConversation,
      isShowStickerBox,
      toggleStickerBox,
      toggleShowChatInformation,
      toggleShowAttachFile,
      sendMessage,
      isShowAttachFile,
      messageContent,
      attachment,
      isDisableSendButton,
      isSending,
      currentChannelId,
      chatInfo,
      rawConversation: conversation,
      chatBoxRef,
      channelType,
      removeAttachment,
      onFileChange
    }
  }
})
</script>

<template>
  <div class="flex h-screen flex-col gap-5 py-5 pb-0">
    <div
      v-if="!currentChannelId"
      class="text-center h-full flex justify-center items-center text-xl border-[1px] border-b-none rounded-t-md"
    >
      Select a chat to start messaging
    </div>
    <template v-else>
      <div class="flex justify-between gap-2 items-center">
        <div class="space-y-1">
          <h2 class="font-light text-md text-gray-500">Chat with</h2>
          <h2
            class="text-3xl font-semibold truncate overflow-y-hidden max-w-2xl"
          >
            {{ chatInfo.name }}
          </h2>
        </div>
        <div class="flex gap-3 items-center">
          <Badge class="h-fit font-medium"
            >{{ channelType === 'direct' ? 'Private' : 'Group' }} chat
          </Badge>
          <CallOption v-if="channelType !== 'group'" />
          <Button
            size="icon"
            variant="ghost"
            @click="toggleShowChatInformation"
          >
            <Icon
              class="size-5 text-primary cursor-pointer"
              icon="lucide:info"
            />
          </Button>
        </div>
      </div>

      <div
        class="overflow-y-scroll border-[1px] px-5 py-5 rounded-t-md flex flex-col gap-7 grow justify-end"
      >
        <div
          v-if="!rawConversation.length"
          class="flex flex-col items-center gap-3 mb-auto mt-32"
        >
          <Avatar :image-id="chatInfo.avatarId" size="default" />
          <h2 class="text-xl font-semibold">{{ chatInfo.name }}</h2>
          <p class="font-light text-gray-400 text-sm">
            Start the first message...
          </p>
        </div>
        <div
          ref="chatBoxRef"
          class="mt-auto flex w-full flex-col gap-7 overflow-y-auto"
        >
          <template v-for="conversation in detailConversation">
            <div
              class="flex justify-center items-center gap-5 text-sm font-light"
            >
              <div class="bg-gray-200 text-center w-[100px] h-[1px]"></div>
              <div class="text-center text-gray-400 text-sm">
                {{ convertTime(conversation.date) }}
              </div>
              <div class="bg-gray-200 text-center w-[100px] h-[1px]"></div>
            </div>
            <Message
              v-for="message in conversation.conversation"
              :key="message._id"
              :message="message"
              class="pl-3"
            />
          </template>
        </div>

        <div class="space-y-2">
          <div v-if="isShowAttachFile" class="flex gap-2 items-center">
            <Input class="h-full" type="file" @change="onFileChange" />
            <Button v-if="attachment" variant="ghost" @click="removeAttachment">
              <Icon icon="lucide:trash-2" />
            </Button>
          </div>
          <div
            class="flex w-full gap-2 border-[1px] rounded-md px-5 py-3 bg-white"
          >
            <Input
              id="message"
              v-model="messageContent"
              class="w-full border-none p-0 bg-white"
              placeholder="Type a message ..."
              v-on:keyup.enter="sendMessage"
            />
            <Toggle>
              <Icon icon="lucide:mic" />
            </Toggle>
            <Toggle @click="toggleShowAttachFile">
              <Icon icon="lucide:paperclip" />
            </Toggle>
            <Button
              :disabled="isDisableSendButton || isSending"
              @click="sendMessage"
            >
              <div v-if="isSending" class="loader"></div>
              <Icon v-else icon="lucide:send" />
            </Button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.loader {
  width: 15px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 2px solid darkred;
  animation:
    l20-1 0.8s infinite linear alternate,
    l20-2 1.6s infinite linear;
}

@keyframes l20-1 {
  0% {
    clip-path: polygon(50% 50%, 0 0, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%);
  }
  12.5% {
    clip-path: polygon(
      50% 50%,
      0 0,
      50% 0%,
      100% 0%,
      100% 0%,
      100% 0%,
      100% 0%
    );
  }
  25% {
    clip-path: polygon(
      50% 50%,
      0 0,
      50% 0%,
      100% 0%,
      100% 100%,
      100% 100%,
      100% 100%
    );
  }
  50% {
    clip-path: polygon(
      50% 50%,
      0 0,
      50% 0%,
      100% 0%,
      100% 100%,
      50% 100%,
      0% 100%
    );
  }
  62.5% {
    clip-path: polygon(
      50% 50%,
      100% 0,
      100% 0%,
      100% 0%,
      100% 100%,
      50% 100%,
      0% 100%
    );
  }
  75% {
    clip-path: polygon(
      50% 50%,
      100% 100%,
      100% 100%,
      100% 100%,
      100% 100%,
      50% 100%,
      0% 100%
    );
  }
  100% {
    clip-path: polygon(
      50% 50%,
      50% 100%,
      50% 100%,
      50% 100%,
      50% 100%,
      50% 100%,
      0% 100%
    );
  }
}

@keyframes l20-2 {
  0% {
    transform: scaleY(1) rotate(0deg);
  }
  49.99% {
    transform: scaleY(1) rotate(135deg);
  }
  50% {
    transform: scaleY(-1) rotate(0deg);
  }
  100% {
    transform: scaleY(-1) rotate(-135deg);
  }
}
</style>
