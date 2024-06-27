<script lang="ts">
import { computed, defineComponent, nextTick, ref } from 'vue'
import { mainAxios, voiceAxios } from '@/main.ts'
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
    const audio = ref()
    const audioRef = ref()
    const isPlaying = ref(false)

    const isActive = computed(() => {
      return currentUser.value.voiceSettingId === props.setting.id
    })

    const handlePlayVoiceSetting = async () => {
      if (isPlaying.value) {
        audioRef.value.pause()
        isPlaying.value = false
        return
      }
      if (audio.value) {
        audioRef.value.play()
        isPlaying.value = true
        audioRef.value.onEnded = () => {
          isPlaying.value = false
        }
        return
      }

      try {
        const res = await voiceAxios.get(`/text-to-speech/play_voice_setting?voice_setting_id=${props.setting.id}`, {
          responseType: 'arraybuffer'
        })
        const blob = new Blob([res.data], { type: 'audio/wav' })
        audio.value = URL.createObjectURL(blob)
        await nextTick(() => {
          audioRef.value.play()
          isPlaying.value = true
          audioRef.value.onEnded = () => {
            isPlaying.value = false
          }
        })
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to play voice setting'
        })
      }
    }

    const handleActivate = async () => {
      try {
        await mainAxios.put(`/auth/update_voice?voice_setting_id=${props.setting.id}`)
        router.go(0)
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to activate voice setting'
        })
      }
    }

    return {
      handlePlayVoiceSetting,
      convertTime,
      isActive,
      audio,
      isPlaying,
      audioRef,
      handleActivate
    }
  }
})
</script>

<template>
  <div
    class="flex justify-between items-center mb-2 border-[1px] p-5 rounded-md h-fit hover:border-primary cursor-pointer">
    <div class="flex gap-4 items-center">
      <button class="bg-primary text-white size-10 rounded-full flex items-center justify-center"
              @click="handlePlayVoiceSetting()">
        <Icon :icon="isPlaying ? 'lucide:square' : 'lucide:play'" />
      </button>
      <div class="flex flex-col gap-1">
        <p class="text-lg font-semibold">Setting {{ index + 1 }}</p>
        <p class="text-sm text-gray-500">Create at: {{ convertTime(setting.createAt) }}</p>
      </div>
    </div>
    <div v-if="canSetting" class="flex items-center gap-2">
      <Badge v-if="isActive">Active</Badge>
      <DropdownMenu v-if='canSetting'>
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
          <DropdownMenuItem v-if="!isActive">
            <div class="flex gap-2 items-center">
              <Icon icon="lucide-trash"></Icon>
              <p>Remove</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div class="flex gap-2 items-center">
              <Icon icon="lucide-globe"></Icon>
              <p>Public</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <audio v-if="audio" ref="audioRef" :src="audio" class='hidden' controls v-on:ended="isPlaying=false" />
  </div>
</template>

<style scoped>

</style>