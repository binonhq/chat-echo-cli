<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useChatting } from '@/composables/useChatting/useChatting.ts'
import NewMessageDialog from '@/views/components/NewMessageDialog.vue'
import { convertTime } from '@/utils/util.ts'
import router from '@/router/router.ts'
import { useAuth } from '@/composables/useAuth'
import { Message } from '@/types/types.ts'

export default defineComponent({
  name: 'ChatHistory',
  methods: { convertTime },
  components: { NewMessageDialog },
  setup() {
    const {
      getHistoryMessages,
      currentChannelId,
      historyChat,
      updateHistoryChat
    } = useChatting()
    const { currentUser } = useAuth()

    const search = ref('')

    const handleSelectChat = async (id: string) => {
      await updateHistoryChat(id)
      await router.push(`/chat?channel_id=${id}`)
    }

    onMounted(async () => {
      await getHistoryMessages()
      await updateHistoryChat(currentChannelId.value)
      if (!currentChannelId.value) {
        if (historyChat.value.length === 0) return
        await router.push('/chat?channel_id=' + historyChat.value[0]._id)
      }
    })

    const filterChat = computed(() => {
      return historyChat.value.filter((chat) => {
        return (
          chat.name?.toLowerCase().includes(search.value.toLowerCase()) || ''
        )
      })
    })

    const getChatContent = (chat: Message) => {
      const isMe = chat.senderId === currentUser.value.userId
      if (chat.attachmentId) {
        return isMe ? 'You sent an attachment' : 'New attachment'
      }
      if (chat.content) {
        return isMe ? 'You: ' + chat.content : chat.content
      }
    }

    return {
      filterChat,
      search,
      currentChannelId,
      handleSelectChat,
      currentUser,
      getChatContent
    }
  }
})
</script>

<template>
  <div class="flex w-full flex-col overflow-y-hidden">
    <div class="flex items-center justify-between mb-2">
      <h1 class="font-semibold">Messages</h1>
      <NewMessageDialog />
    </div>
    <div class="relative mb-3 w-full items-center">
      <Input
        id="search"
        v-model="search"
        class="pl-9"
        placeholder="Search in chat ..."
        type="text"
      />
      <div
        class="absolute inset-y-0 flex items-center justify-center px-3 start-0"
      >
        <Icon
          class="size-4 text-gray-400 cursor-pointer"
          icon="lucide:search"
        />
      </div>
    </div>
    <div class="overflow-y-scroll space-y-1 h-full">
      <div v-if="!filterChat.length">
        <p class="text-center text-gray-400 font-light text-sm mt-10">
          No chat found
        </p>
      </div>
      <div
        v-for="chat in filterChat"
        :key="chat._id"
        :class="[
          'flex items-center justify-between p-3 rounded-[10px] duration-200 cursor-pointer',
          currentChannelId === chat._id.toString()
            ? 'bg-gray-100'
            : 'hover:bg-gray-100'
        ]"
        @click="handleSelectChat(chat._id.toString())"
      >
        <div class="flex items-center gap-3">
          <Avatar
            :image-id="chat.avatarId"
            :type="chat.type"
            :user-id="chat.userId"
            size="xs"
          />
          <div>
            <h2
              :class="chat.isUnread ? 'font-semibold' : ''"
              class="truncate overflow-hidden"
            >
              {{ chat.name }}
            </h2>
            <p
              :class="[
                'font-light text-sm truncate overflow-x-hidden max-w-[200px]',
                chat.isUnread ? 'font-semibold' : ''
              ]"
            >
              {{ getChatContent(chat.message) }}
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2 grow justify-end">
          <p :class="['text-sm', chat.isUnread ? 'font-semibold' : '']">
            {{ convertTime(chat.message.createdAt) }}
          </p>
          <div
            :class="['w-2 h-2 rounded-full', { 'bg-blue-400': chat.isUnread }]"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
