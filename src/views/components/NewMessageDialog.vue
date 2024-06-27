<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog/index.js'
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText
} from '@/components/ui/tags-input/index.ts'

import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/vue'
import { useChatting } from '@/composables/useChatting/useChatting.ts'
import { Channel, User } from '@/types/types.ts'
import Avatar from '@/views/components/Avatar.vue'
import { Input } from '@/components/ui/input'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { DialogClose } from '@/components/ui/dialog'

export default defineComponent({
  name: 'NewMessageDialog',
  components: {
    DialogClose,
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
    DialogFooter,
    TagsInput,
    TagsInputInput,
    TagsInputItem,
    TagsInputItemDelete,
    TagsInputItemText
  },
  setup() {
    const router = useRouter()
    const { getAllUser, getOrCreateChannel } = useChatting()
    const { currentUser } = useAuth()
    const listSelectedUserIds = ref([] as string[])
    const allUser = ref([] as User[])
    const filterSearch = ref('')
    const isOpen = ref(false)

    onMounted(async () => {
      allUser.value = await getAllUser()
    })

    const handleSelectUser = (user: User) => {
      if (listSelectedUserIds.value.includes(user.userId)) {
        listSelectedUserIds.value = listSelectedUserIds.value.filter(
          (selectedUser) => selectedUser !== user.userId
        )
      } else {
        listSelectedUserIds.value.push(user.userId)
      }
    }

    const filteredUser = computed(() => {
      return allUser.value.filter((user) => {
        const name = `${user.firstName} ${user.lastName}`
        return name.toLowerCase().includes(filterSearch.value.toLowerCase())
      })
    })

    const handleSendMessage = async () => {
      const listUsers = allUser.value.filter((user) =>
        listSelectedUserIds.value.includes(user.userId)
      )
      const channel = await getOrCreateChannel({
        userIds: [...listSelectedUserIds.value, currentUser.value.userId],
        name: [...listUsers, currentUser.value]
          .map((user) => user.firstName + ' ' + user.lastName)
          .join(', ')
      } as Channel)
      if (channel) {
        await router.push(`/chat?channel_id=${channel._id}`)
      }
      isOpen.value = false
      listSelectedUserIds.value = []
    }

    const handleOpen = () => {
      listSelectedUserIds.value = []
      isOpen.value = true
    }

    const handleClose = () => {
      isOpen.value = false
      listSelectedUserIds.value = []
    }

    return {
      listSelectedUserIds,
      allUser,
      filteredUser,
      handleSelectUser,
      handleSendMessage,
      handleOpen,
      filterSearch,
      isOpen,
      handleClose
    }
  }
})
</script>

<template>
  <Dialog :open="isOpen">
    <Button variant="ghost" @click="handleOpen">
      <Icon icon="lucide:pen" />
    </Button>
    <DialogContent class="max-w-3xl" @close="handleClose">
      <DialogHeader>
        <DialogTitle>New messages</DialogTitle>
        <DialogDescription>
          Select a user to start a conversation. Or you can create a new group.
        </DialogDescription>
      </DialogHeader>
      <div class="flex flex-col gap-3">
        <Input v-model="filterSearch" placeholder="Search user..." />
        <div class="max-h-[500px] overflow-y-scroll px-1 flex flex-col gap-1">
          <div
            v-for="user in filteredUser"
            class="flex gap-3 items-center p-3 rounded-md duration-200 cursor-pointer hover:bg-gray-200"
            @click="handleSelectUser(user)"
          >
            <Avatar :image-id="user.avatarId" size="xs" />
            <div class="flex flex-col gap-1">
              <p class="text-sm">{{ user.firstName }} {{ user.lastName }}</p>
              <p class="text-xs text-gray-400">{{ user.email }}</p>
            </div>
            <div
              v-if="listSelectedUserIds.includes(user.userId)"
              class="ml-auto"
            >
              <Icon class="text-primary size-5" icon="lucide:check" />
            </div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <TagsInput v-model="listSelectedUserIds" class="grow">
            <TagsInputItem
              v-for="item in listSelectedUserIds"
              :key="item"
              :value="item"
            >
              <p class="px-2">
                {{ allUser.find((user) => user.userId === item)?.firstName }}
                {{ allUser.find((user) => user.userId === item)?.lastName }}
              </p>
              <TagsInputItemDelete />
            </TagsInputItem>
            <TagsInputInput disabled />
          </TagsInput>
          <Button
            :disabled="!listSelectedUserIds.length"
            @click="handleSendMessage"
          >
            <Icon icon="lucide:send" />
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<style scoped></style>
