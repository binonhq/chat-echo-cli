<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import { useChatting } from '@/composables/useChatting/useChatting.ts'
import { ChannelDetail } from '@/types/types.ts'
import { mainAxios } from '@/main.ts'
import { toast } from '@/components/ui/toast'
import EditGroup from '@/views/components/EditGroup.vue'
import ImagePreview from '@/views/components/ImagePreview.vue'

export default defineComponent({
  name: 'ChatInformation',
  components: { ImagePreview, EditGroup, Button, Icon },
  setup(props, { emit }) {
    const { getDetailChannel, currentChannelId, getDetailMessages } =
      useChatting()
    const detailChannel = ref({} as ChannelDetail)

    const toggleHideChatInformation = () => {
      emit('toggle-show-chat-information', false)
    }

    const handleDeleteChat = async () => {
      try {
        await mainAxios.delete(`/channel/${currentChannelId.value}`)
        toast({
          title: 'Delete chat successfully'
        })
        await getDetailMessages(currentChannelId.value, 0)
      } catch (e) {
        toast({
          title: 'Delete chat failed'
        })
      }
    }

    const handleOpenAttachment = (id: string) => {
      window.open(import.meta.env.VITE_API + '/attachments/' + id, '_blank')
    }

    watch(
      currentChannelId,
      async () => {
        if (!currentChannelId.value) return
        detailChannel.value = await getDetailChannel(currentChannelId.value)
      },
      {
        immediate: true
      }
    )

    return {
      detailChannel,
      toggleHideChatInformation,
      handleDeleteChat,
      handleOpenAttachment
    }
  }
})
</script>

<template>
  <div
    class="flex h-screen flex-col items-center gap-4 py-5 px-5 overflow-scroll"
  >
    <div class="flex w-full items-center justify-between">
      <h1 class="font-medium">Chat detail</h1>
      <Button size="icon" variant="ghost" @click="toggleHideChatInformation">
        <Icon class="size-5 text-primary cursor-pointer" icon="lucide:x" />
      </Button>
    </div>
    <Avatar :image-id="detailChannel.avatarId" :type="detailChannel.type" />
    <div>
      <p class="text-center text-2xl font-medium">{{ detailChannel.name }}</p>
      <p v-if="detailChannel.type === 'group'" class="text-sm text-gray-500">
        {{ detailChannel.userIds.length }} members
      </p>
    </div>

    <template v-if="detailChannel.images?.length">
      <Separator class="w-full" />
      <div class="w-full flex flex-col gap-3">
        <div class="flex w-full justify-between gap-3 items-center">
          <h2 class="font-medium text-sm">
            Images ({{ detailChannel.images.length }})
          </h2>
          <Button class="h-fit" variant="ghost">See all</Button>
        </div>
        <div class="flex h-full w-full gap-2 pb-3 overflow-x-scroll px-2">
          <ImagePreview
            v-for="imageId in detailChannel.images"
            :key="imageId"
            :image-id="imageId"
            class-props="min-w-32 w-32 h-32 rounded-md border-[1px]"
          />
        </div>
      </div>
    </template>

    <template v-if="detailChannel.attachments?.length">
      <Separator class="w-full" />
      <div class="grow w-full flex flex-col gap-3">
        <div class="flex w-full justify-between gap-3 items-center">
          <h2 class="font-medium text-sm">
            Attachments ({{ detailChannel.attachments.length }})
          </h2>
          <Button class="h-fit" variant="ghost">See all</Button>
        </div>
        <div class="flex w-full flex-col gap-5 overflow-y-scroll">
          <div
            v-for="attachment in detailChannel.attachments"
            :key="attachment._id"
            class="px-3 flex gap-2 items-center w-full overflow-hidden cursor-pointer"
            @click="handleOpenAttachment(attachment._id)"
          >
            <Icon class="size-5 cursor-pointer" icon="lucide:paperclip" />
            <div class="flex flex-col gap-1">
              <p class="font-medium">{{ attachment.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>

    <Separator class="w-full" />
    <div class="flex gap-2 w-full">
      <EditGroup
        v-if="detailChannel.type === 'group'"
        :group-info="detailChannel"
        @close-chat-information="toggleHideChatInformation"
      />
      <Button
        class="w-full py-3 flex gap-2"
        size="default"
        variant="outline"
        @click="handleDeleteChat"
      >
        <Icon class="size-4" icon="lucide:trash-2" />
        Delete chat
      </Button>
    </div>
  </div>
</template>

<style scoped></style>
