<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog/index.js'

import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/vue'
import { Channel, Message as MessageType, User } from '@/types/types.ts'
import { convertTime } from '@/utils/util.ts'
import Avatar from '@/views/components/Avatar.vue'
import { Input } from '@/components/ui/input'
import { useChatting } from '@/composables/useChatting/useChatting.ts'
import { useAuth } from '@/composables/useAuth'
import { toast } from '@/components/ui/toast'
import router from '@/router/router.ts'

export default defineComponent({
  name: 'DetailUserDialog',
  methods: { convertTime },
  components: {
    Input,
    Avatar,
    Icon,
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
  },
  props: {
    user: {
      type: Object as () => User,
      default: {},
      required: true
    },
    onlineUserIds: {
      type: Array as () => string[],
      default: []
    }
  },
  setup(props) {
    const { handleSendMessage, getOrCreateChannel } = useChatting()
    const { currentUser } = useAuth()

    const messageInput = ref('')

    const handleSend = async () => {
      try {
        const newChannelParam = {
          userIds: [props.user.userId, currentUser.value.userId]
        } as Channel

        const newChannel = await getOrCreateChannel(newChannelParam)

        const message = {
          content: messageInput.value,
          channelId: newChannel._id
        } as MessageType
        handleSendMessage(message)

        toast({
          title: 'Success',
          description: 'Message sent'
        })

        await router.push('/chat?channel_id=' + newChannel._id)
      } catch (e) {
        toast({
          title: 'Something went wrong!',
          description: "Can't send message"
        })
      }
    }

    return {
      messageInput,
      handleSend
    }
  }
})
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <div
        class="gap-5 flex cursor-pointer rounded-md p-5 duration-150 border-[1px] hover:border-primary"
      >
        <Avatar :image-id="user.avatarId" :user-id="user.userId" size="sm" />
        <div>
          <p class="font-semibold mb-2">
            {{ user.firstName }} {{ user.lastName }}
          </p>
          <p class="text-sm font-light">Email: {{ user.email }}</p>
          <p class="text-sm font-light">
            Join at: {{ convertTime(user.createdAt) }}
          </p>
        </div>
      </div>
    </DialogTrigger>
    <DialogContent class="max-w-xl p-10">
      <div class="overflow-y-scroll max-h-2/3 flex flex-col items-center gap-5">
        <div class="relative w-full">
          <img
            alt="avatar"
            class="w-full h-40 object-cover rounded-md"
            src="https://iconerecife.com.br/wp-content/plugins/uix-page-builder/uixpb_templates/images/UixPageBuilderTmpl/default-cover-4.jpg"
          />
          <Avatar
            :image-id="user.avatarId"
            :online="onlineUserIds.includes(user.userId)"
            class="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-[4px] border-white rounded-full shadow"
            size="lg"
          />
        </div>
        <div class="text-center flex flex-col gap-3 -mt-16 z-40">
          <div class="flex flex-col gap- mb-5">
            <h2 class="text-xl font-semibold">
              {{ user.firstName }} {{ user.lastName }}
            </h2>
            <router-link :to="`/community/${user.userId}`" class="">
              <p class="text-sm font-light text-primary hover:underline">
                View profile
              </p>
            </router-link>
          </div>
          <div class="flex gap-2 items-center">
            <Icon class="size-4" icon="lucide:mail" />
            <p class="text-sm font-light">Mail: {{ user.email }}</p>
          </div>
          <div class="flex gap-2 items-center">
            <Icon class="size-4" icon="lucide:calendar" />
            <p class="text-sm font-light">
              Joined at: {{ convertTime(user.createdAt) }}
            </p>
          </div>
        </div>
        <div class="w-full flex gap-3 mt-5">
          <Input
            id="message"
            v-model="messageInput"
            placeholder="Send a new message..."
            type="text"
          />
          <Button @click="handleSend">
            <Icon icon="lucide:send"></Icon>
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<style scoped></style>
