<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { User } from '@/types/types.ts'
import { convertTime } from '@/utils/util.ts'
import { useChatting } from '@/composables/useChatting/useChatting.ts'
import { Button } from '@/components/ui/button'
import { TagsInput } from '@/components/ui/tags-input'
import {
  Dialog,
  DialogFooter,
  DialogHeader
} from '@/components/ui/dialog/index.js'
import NewMessageDialog from '@/views/components/NewMessageDialog.vue'
import DetailUserDialog from '@/views/components/DetailUserDialog.vue'

export default defineComponent({
  name: 'CommunityPage',
  methods: { convertTime },
  components: {
    DetailUserDialog,
    NewMessageDialog,
    TagsInput,
    DialogHeader,
    Dialog,
    Button,
    DialogFooter
  },
  setup() {
    const { onlineUsers, getAllUser } = useChatting()
    const allUser = ref([] as User[])
    const search = ref('')
    const filterOnline = ref(false)

    const filterUser = computed(() => {
      return allUser.value.filter((user) => {
        return (
          user.firstName.toLowerCase().includes(search.value.toLowerCase()) &&
          (filterOnline.value
            ? onlineUsers.value.some(
                (onlineUser) => onlineUser.userId === user.userId
              )
            : true)
        )
      })
    })

    const onlineUserIds = computed(() =>
      onlineUsers.value.map((user) => user.userId)
    )

    const handleToggleOnline = () => {
      filterOnline.value = !filterOnline.value
    }

    onMounted(async () => {
      allUser.value = await getAllUser()
    })

    return {
      search,
      onlineUsers,
      filterUser,
      onlineUserIds,
      filterOnline,
      handleToggleOnline
    }
  }
})
</script>

<template>
  <div class="flex max-h-screen flex-col px-10 2xl:px-48 py-10">
    <h1 class="text-4xl font-semibold">Community</h1>
    <div class="mt-20 flex justify-between items-center gap-5">
      <div class="relative flex max-w-xl grow items-center">
        <Input
          id="search"
          v-model="search"
          class="pl-8"
          placeholder="Search people"
          type="text"
        />
        <div
          class="absolute inset-y-0 flex items-center justify-center px-2 start-0"
        >
          <svg
            class="size-5 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <Checkbox
          id="online"
          :checked="filterOnline"
          @update:checked="handleToggleOnline"
        />
        <label
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          for="online"
        >
          Online
        </label>
      </div>
    </div>

    <div
      class="mt-5 gap-5 grid grid-cols-1 overflow-y-scroll lg:grid-cols-2 2xl:grid-cols-3"
    >
      <DetailUserDialog
        v-for="(people, i) in filterUser"
        :key="i"
        :onlineUserIds="onlineUserIds"
        :user="people"
      />
    </div>
  </div>
</template>

<style scoped></style>
