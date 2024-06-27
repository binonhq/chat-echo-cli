<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText
} from '@/components/ui/tags-input'
import { Button } from '@/components/ui/button'
import Avatar from '@/views/components/Avatar.vue'
import { ChannelDetail, User } from '@/types/types.ts'
import { useChatting } from '@/composables/useChatting/useChatting.ts'
import { useAuth } from '@/composables/useAuth'
import { toast } from '@/components/ui/toast'
import { mainAxios } from '@/main.ts'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'EditGroup',
  components: {
    DialogClose,
    DialogTrigger,
    Avatar,
    Button,
    TagsInput,
    DialogHeader,
    DialogContent,
    DialogDescription,
    Input,
    Dialog,
    TagsInputInput,
    TagsInputItem,
    TagsInputItemDelete,
    TagsInputItemText
  },
  props: {
    groupInfo: {
      type: Object as () => ChannelDetail,
      required: true
    }
  },
  setup(props, { emit }) {
    const router = useRouter()
    const { getAllUser, getHistoryMessages } = useChatting()
    const { currentUser } = useAuth()

    const isOpen = ref(false)
    const groupName = ref(props.groupInfo.name)
    const filterSearch = ref('')
    const allUser = ref([] as User[])
    const isOpenAddUserDialog = ref(false)
    
    const groupMemberIds = ref(
      props.groupInfo.userIds
        ?.map((user) => user._id)
        .filter((id) => id !== currentUser.value.userId) || []
    )

    const groupMembers = computed(() => {
      return allUser.value.filter((user) => {
        return groupMemberIds.value.includes(user.userId)
      })
    })

    const filteredUser = computed(() => {
      return allUser.value.filter((user) => {
        const name = `${user.firstName} ${user.lastName}`
        return name.toLowerCase().includes(filterSearch.value.toLowerCase())
      })
    })

    const handleCancel = () => {
      isOpen.value = false
      groupMemberIds.value =
        props.groupInfo.userIds
          ?.map((user) => user._id)
          .filter((id) => id !== currentUser.value.userId) || []
      groupName.value = props.groupInfo.name
      filterSearch.value = ''
    }

    const handleCancelSelectUser = () => {
      filterSearch.value = ''
      groupMemberIds.value =
        props.groupInfo.userIds
          ?.map((user) => user._id)
          .filter((id) => id !== currentUser.value.userId) || []
      isOpenAddUserDialog.value = false
    }

    const handleSelectUser = (user: User) => {
      if (groupMemberIds.value.includes(user.userId)) {
        groupMemberIds.value = groupMemberIds.value.filter(
          (selectedUser) => selectedUser !== user.userId
        )
      } else {
        groupMemberIds.value.push(user.userId)
      }
    }

    const handleRemoveMember = (userId: string) => {
      groupMemberIds.value = groupMemberIds.value.filter(
        (selectedUser) => selectedUser !== userId
      )
    }

    const handleSave = async () => {
      try {
        await mainAxios.put(`/channel/${props.groupInfo._id}`, {
          name: groupName.value,
          userIds: [...groupMemberIds.value, currentUser.value.userId]
        })
        toast({
          title: 'Success',
          description: 'Group updated successfully'
        })
        isOpen.value = false
        router.go(0)
      } catch (e) {
        toast({
          title: 'Error',
          description: 'Failed to update group'
        })
      }
    }

    const handleLeaveGroup = async () => {
      try {
        await mainAxios.put(`/channel/${props.groupInfo._id}`, {
          name: groupName.value,
          userIds: [...groupMemberIds.value]
        })
        toast({
          title: 'Success',
          description: 'You have left the group'
        })
        isOpen.value = false
        emit('close-chat-information')
        await getHistoryMessages()
        await router.push('/chat')
      } catch (e) {
        toast({
          title: 'Error',
          description: 'Failed to leave group'
        })
      }
    }

    const handleUpdateAvatar = async (e: Event) => {
      const target = e.target as HTMLInputElement
      const file = target.files?.[0]
      if (!file) return
      const formData = new FormData()
      formData.append('file', file)
      formData.append('kind', 'avatar-group')
      formData.append('channelId', props.groupInfo._id)
      try {
        await mainAxios.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          responseType: 'arraybuffer'
        })
      } catch (e) {
        toast({
          title: 'Update avatar failed'
        })
      }
    }

    onMounted(async () => {
      allUser.value = await getAllUser()
    })

    watch(
      () => props.groupInfo,
      (newVal) => {
        groupName.value = newVal.name
        groupMemberIds.value =
          newVal.userIds
            ?.map((user) => user._id)
            .filter((id) => id !== currentUser.value.userId) || []
      }
    )

    return {
      groupName,
      isOpen,
      groupMemberIds,
      allUser,
      filterSearch,
      filteredUser,
      groupMembers,
      isOpenAddUserDialog,
      currentUser,
      handleLeaveGroup,
      handleCancelSelectUser,
      handleSelectUser,
      handleSave,
      handleCancel,
      handleRemoveMember,
      handleUpdateAvatar
    }
  }
})
</script>

<template>
  <Dialog :open="isOpen">
    <Button class="flex gap-2 w-full" variant="outline" @click="isOpen = true">
      <Icon icon="lucide:pen" />
      Edit Group
    </Button>
    <DialogContent class="max-w-3xl" @close="isOpen = false">
      <DialogHeader>
        <DialogTitle class="font-semibold">Edit Group</DialogTitle>
        <DialogDescription> Edit your group information</DialogDescription>
        <div class="flex flex-col gap-3 p-10 pt-0">
          <div class="flex flex-col items-center gap-4">
            <div class="relative border-[4px] border-white rounded-full shadow">
              <Avatar
                :image-id="groupInfo.avatarId"
                :type="groupInfo.type"
                size="md"
              />
              <label
                class="absolute bottom-0 right-0 text-white p-2 bg-primary rounded-full cursor-pointer border-[4px] border-white"
                for="upload-group-avatar"
              >
                <Icon class="text-white" icon="lucide:camera" />
              </label>
              <input
                id="upload-group-avatar"
                accept="image/*"
                class="hidden"
                type="file"
                @change="handleUpdateAvatar"
              />
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <p class="font-medium text-sm">Group name</p>
            <Input v-model="groupName" />
          </div>
          <div>
            <div class="flex justify-between items-center mb-2">
              <p class="font-medium text-sm">
                Group members ({{ groupMemberIds.length + 1 }})
              </p>
              <Dialog :open="isOpenAddUserDialog">
                <Button
                  class="flex gap-2"
                  size="icon"
                  variant="outline"
                  @click="isOpenAddUserDialog = true"
                >
                  <Icon icon="lucide:plus" />
                </Button>
                <DialogContent
                  class="max-w-3xl"
                  @close="handleCancelSelectUser"
                >
                  <DialogHeader>
                    <DialogTitle>Add member</DialogTitle>
                    <DialogDescription>
                      Select a user to add to the group
                    </DialogDescription>
                  </DialogHeader>
                  <Input v-model="filterSearch" placeholder="Search user..." />
                  <div
                    class="max-h-[500px] overflow-y-scroll px-1 flex flex-col gap-1"
                  >
                    <div
                      v-for="user in filteredUser"
                      class="flex gap-3 items-center p-3 rounded-md duration-200 cursor-pointer hover:bg-gray-200"
                      @click="handleSelectUser(user)"
                    >
                      <Avatar :image-id="user.avatarId" size="xs" />
                      <div class="flex flex-col gap-1">
                        <p class="text-sm">
                          {{ user.firstName }} {{ user.lastName }}
                        </p>
                        <p class="text-xs text-gray-400">{{ user.email }}</p>
                      </div>
                      <div
                        v-if="groupMemberIds.includes(user.userId)"
                        class="ml-auto"
                      >
                        <Icon class="text-primary size-5" icon="lucide:check" />
                      </div>
                    </div>
                  </div>
                  <TagsInput v-model="groupMemberIds" class="grow">
                    <TagsInputItem
                      v-for="item in groupMemberIds"
                      :key="item"
                      :value="item"
                    >
                      <p class="px-2">
                        {{
                          allUser.find((user) => user.userId === item)
                            ?.firstName
                        }}
                        {{
                          allUser.find((user) => user.userId === item)?.lastName
                        }}
                      </p>
                      <TagsInputItemDelete />
                    </TagsInputItem>
                    <TagsInputInput disabled />
                  </TagsInput>
                  <div class="flex gap-2 justify-end">
                    <Button variant="secondary" @click="handleCancelSelectUser">
                      Cancel
                    </Button>
                    <Button
                      :disabled="
                        !groupMemberIds.length || groupMemberIds.length < 2
                      "
                      @click="isOpenAddUserDialog = false"
                    >
                      Save
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div class="max-h-[220px] overflow-y-scroll flex flex-col gap-3">
              <div
                v-for="member in [currentUser, ...groupMembers]"
                :key="member.userId"
                class="flex gap-3 items-center rounded-md duration-200"
              >
                <Avatar :image-id="member.avatarId" size="xs" />
                <div class="flex flex-col gap-1">
                  <p
                    v-if="member.userId !== currentUser.userId"
                    class="text-sm"
                  >
                    {{ member.firstName }} {{ member.lastName }}
                  </p>
                  <p v-else class="text-sm">You</p>
                  <p class="text-xs text-gray-400">{{ member.email }}</p>
                </div>
                <div
                  v-if="member.userId !== currentUser.userId"
                  class="ml-auto"
                >
                  <Button
                    size="icon"
                    variant="outline"
                    @click="handleRemoveMember(member.userId)"
                  >
                    <Icon class="size-4" icon="lucide:trash-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex gap-2 justify-between">
          <Button @click="handleLeaveGroup">Leave Group</Button>
          <div class="flex gap-2">
            <Button variant="secondary" @click="handleCancel">Cancel</Button>
            <Button @click="handleSave">Save</Button>
          </div>
        </div>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>

<style scoped></style>
