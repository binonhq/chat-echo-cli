<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { mainAxios } from '@/main.ts'
import { toast } from '@/components/ui/toast'
import { convertTime } from '@/utils/util.ts'
import { VoiceSetting } from '@/types/types.ts'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'VoiceSetting',
  components: {
    Badge,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
  },
  props: {
    setting: {
      type: Object as () => VoiceSetting,
      required: true
    },
    index: {
      type: Number,
      default: 0
    },
    canSetting: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { currentUser } = useAuth()
    const router = useRouter()
    const audioRef = ref()
    const isPlaying = ref(false)

    const isActive = computed(() => {
      return currentUser.value.voiceSettingId === props.setting.id
    })

    const isPublished = computed(() => {
      return !currentUser.value.privateVoiceSettings.includes(props.setting.id)
    })

    const handlePlayVoiceSetting = async () => {
      if (isPlaying.value) {
        audioRef.value.pause()
        isPlaying.value = false
        return
      }
      audioRef.value.play()
      isPlaying.value = true
      audioRef.value.onEnded = () => {
        isPlaying.value = false
      }
      return
    }

    const audioSrc =
      import.meta.env.VITE_NODE_SERVER + '/voice-settings/' + props.setting.id

    const handleActivate = async () => {
      try {
        await mainAxios.put(
          `/auth/update_voice?voice_setting_id=${props.setting.id}`
        )
        router.go(0)
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to activate voice setting'
        })
      }
    }

    const handleRemove = async () => {
      try {
        await mainAxios.delete(
          `/auth/delete_voice_setting?voice_setting_id=${props.setting.id}`
        )
        router.go(0)
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to remove voice setting'
        })
      }
    }

    const handleUpdatePublish = async () => {
      try {
        await mainAxios.put(
          `/auth/publish_voice_setting?voice_setting_id=${props.setting.id}&option=${isPublished.value ? 'unpublish' : 'publish'}`
        )
        router.go(0)
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to update publish voice setting'
        })
      }
    }

    const handleClone = async () => {
      try {
        await mainAxios.post(
          `/auth/clone_voice_setting?voice_setting_id=${props.setting.id}`
        )
        toast({
          title: 'Success',
          description: 'Voice setting cloned'
        })
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to clone voice setting'
        })
      }
    }

    return {
      handlePlayVoiceSetting,
      convertTime,
      isActive,
      isPlaying,
      audioRef,
      isPublished,
      handleRemove,
      handleActivate,
      handleUpdatePublish,
      handleClone,
      audioSrc
    }
  }
})
</script>

<template>
  <div
    class="flex justify-between items-center mb-2 border-[1px] p-5 rounded-md h-fit hover:border-primary cursor-pointer"
  >
    <div class="flex gap-4 items-center">
      <button
        class="bg-primary text-white size-10 rounded-full flex items-center justify-center"
        @click="handlePlayVoiceSetting()"
      >
        <Icon :icon="isPlaying ? 'lucide:square' : 'lucide:play'" />
      </button>
      <div class="flex flex-col gap-1">
        <p class="text-md font-semibold">Setting {{ index + 1 }}</p>
        <p class="text-[9pt] text-gray-500">
          Create at: {{ convertTime(setting.createAt) }}
        </p>
      </div>
    </div>
    <div v-if="canSetting" class="flex items-center gap-2">
      <div class="flex flex-col gap-2">
        <Badge v-if="isActive" class="bg-green-500">Active</Badge>
        <Badge :class="isPublished ? 'bg-blue-400' : 'bg-primary'"
          >{{ isPublished ? 'Public' : 'Private' }}
        </Badge>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button size="icon" variant="ghost">
            <Icon icon="lucide-ellipsis-vertical"></Icon>
            <span class="sr-only">More</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" class="gap-1 flex flex-col">
          <DropdownMenuItem v-if="!isActive" @click="handleActivate">
            <div class="flex gap-2 items-center">
              <Icon icon="lucide-arrow-up-from-line"></Icon>
              <p>Activate</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem v-if="!isActive" @click="handleRemove">
            <div class="flex gap-2 items-center">
              <Icon icon="lucide-trash"></Icon>
              <p>Remove</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div class="flex gap-2 items-center" @click="handleUpdatePublish">
              <Icon v-if="!isPublished" icon="lucide-globe"></Icon>
              <Icon v-else icon="lucide-lock"></Icon>
              <p>{{ isPublished ? 'Unpublish' : 'Publish' }}</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <div v-else>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button size="icon" variant="ghost">
            <Icon icon="lucide-ellipsis-vertical"></Icon>
            <span class="sr-only">More</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" class="gap-1 flex flex-col">
          <DropdownMenuItem @click="handleClone">
            <div class="flex gap-2 items-center">
              <Icon icon="lucide:copy-plus"></Icon>
              <p>Clone</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <audio
      ref="audioRef"
      :src="audioSrc"
      class="hidden"
      controls
      v-on:ended="isPlaying = false"
    />
  </div>
</template>

<style scoped></style>
