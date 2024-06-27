<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, ref } from 'vue'
import { Message } from '@/types/types.ts'
import { useAuth } from '@/composables/useAuth'
import Avatar from '@/views/components/Avatar.vue'
import { Button } from '@/components/ui/button'
import { convertTime } from '@/utils/util.ts'
import { mainAxios, voiceAxios } from '@/main.ts'
import { toast } from '@/components/ui/toast'
import ImagePreview from '@/views/components/ImagePreview.vue'

export default defineComponent({
  name: 'Message',
  components: { ImagePreview, Button, Avatar },
  props: {
    message: {
      type: Object as () => Message,
      required: true
    }
  },
  setup(props) {
    const { currentUser } = useAuth()
    const isGettingSound = ref(false)
    const isSoundReady = ref(false)
    const isPlaying = ref(false)
    const audioRef = ref()
    const audio = ref()
    const attachment = ref(
      {} as {
        type: string
        name: string
        size: number
      }
    )

    const isMe = computed(() => {
      return props.message.senderId === currentUser.value.userId
    })

    const handleClickSound = async () => {
      if (isPlaying.value) {
        isPlaying.value = !isPlaying.value
        audioRef.value.pause()
        return
      }

      if (audioRef.value) {
        isPlaying.value = true
        audioRef.value.play()
        return
      }

      try {
        isSoundReady.value = false
        isGettingSound.value = true
        const response = await voiceAxios.get(
          '/text-to-speech/play-message?messageId=' + props.message._id,
          {
            responseType: 'arraybuffer'
          }
        )
        isSoundReady.value = true
        const blob = new Blob([response.data], { type: 'audio/wav' })
        audio.value = URL.createObjectURL(blob)
        await nextTick(() => {
          audioRef.value.play()
          isPlaying.value = true
        })
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to play sound'
        })
      } finally {
        isGettingSound.value = false
      }
    }

    onMounted(async () => {
      if (props.message.attachmentId) {
        try {
          const response = await mainAxios.get(
            '/attachments/' + props.message.attachmentId + '?option=json'
          )
          attachment.value = response.data
        } catch (error) {
          toast({
            title: 'Error',
            description: 'Failed to get attachment'
          })
        }
      }
    })

    const isImageAttachment = computed(() => {
      return attachment.value.type.includes('image')
    })

    const handleOpenAttachment = () => {
      window.open(
        import.meta.env.VITE_API + '/attachments/' + props.message.attachmentId,
        '_blank'
      )
    }

    return {
      isMe,
      audio,
      isSoundReady,
      isPlaying,
      isGettingSound,
      convertTime,
      audioRef,
      attachment,
      isImageAttachment,
      handleClickSound,
      handleOpenAttachment
    }
  }
})
</script>

<template>
  <div
    :class="[
      'flex items-start gap-4',
      { 'flex-row-reverse mr-6 justify-end': isMe }
    ]"
  >
    <div class="w-fit">
      <Avatar
        :image-id="message.avatarId"
        :user-id="message.senderId"
        size="xxs"
      />
    </div>
    <div class="space-y-1 grow">
      <div
        :class="['flex gap-3 items-center text-sm', { 'justify-end': isMe }]"
      >
        <p class="font-medium">{{ isMe ? 'You' : message.senderName }}</p>
        <p class="text-gray-400 font-light text-[9pt]">
          {{ convertTime(message.createdAt, true) }}
        </p>
      </div>
      <div
        :class="[
          'flex gap-2 items-center justify-start w-full',
          { 'flex-row-reverse': isMe }
        ]"
      >
        <div
          v-if="message.content"
          :class="{
            'bg-emerald-200 rounded-tr-none': isMe,
            'bg-sky-200 rounded-tl-none': !isMe
          }"
          class="flex rounded-sm px-3 py-2 max-w-[60%] overflow-hidden"
        >
          <p class="font-light text-[11pt] w-full">
            {{ message.content }}
          </p>
        </div>
        <ImagePreview
          v-if="attachment.name && isImageAttachment"
          :image-id="message.attachmentId"
          class-props="max-w-[350px] rounded-md"
        />
        <div
          v-if="attachment.name && !isImageAttachment"
          class="flex gap-2 items-start border-[1px] border-gray-200 rounded-sm p-3 max-w-[60%] overflow-hidden cursor-pointer bg-white"
          @click="handleOpenAttachment"
        >
          <div class="p-3 bg-emerald-200 rounded-full">
            <Icon class="size-5 cursor-pointer" icon="lucide:paperclip" />
          </div>
          <div>
            <p class="text-sm font-medium">
              {{ attachment.name }}
            </p>
            <p class="text-gray-500">
              {{ (attachment.size / 1024).toFixed(2) }} KB
            </p>
          </div>
        </div>
        <div
          v-if="message.content"
          :class="[
            'rounded-full cursor-pointer transition-all duration-300 ease-out flex items-center gap-2 p-2',
            { 'bg-gray-200': isPlaying }
          ]"
          @click="handleClickSound"
        >
          <div v-if="!isSoundReady && isGettingSound" role="status">
            <div class="loader"></div>
          </div>
          <Icon v-else icon="lucide:audio-lines"></Icon>
        </div>
      </div>
    </div>
    <audio
      v-if="audio"
      ref="audioRef"
      :src="audio"
      class="hidden"
      controls
      v-on:ended="isPlaying = false"
    />
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
