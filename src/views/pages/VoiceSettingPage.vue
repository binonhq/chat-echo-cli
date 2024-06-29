<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { Separator } from '@/components/ui/separator'
import { Icon } from '@iconify/vue'
import UploadAudioDialog from '@/views/components/UploadAudioDialog.vue'
import { useAuth } from '@/composables/useAuth'
import { convertTime } from '@/utils/util.ts'
import { VoiceSetting as VoiceSettingType } from '@/types/types.ts'
import VoiceSetting from '@/views/components/VoiceSetting.vue'
import { useChatting } from '@/composables/useChatting/useChatting.ts'

export default defineComponent({
  name: 'VoiceSettingPage',
  components: { VoiceSetting, UploadAudioDialog, Icon, Separator },
  setup() {
    const { currentUser } = useAuth()
    const { getVoiceSettings } = useChatting()
    const voiceSettings = ref<VoiceSettingType[]>([])
    const isLoading = ref(true)

    onMounted(async () => {
      voiceSettings.value = await getVoiceSettings(currentUser.value.userId)
      isLoading.value = false
    })

    return {
      voiceSettings,
      isLoading,
      convertTime
    }
  }
})
</script>

<template>
  <template v-if="isLoading"></template>
  <template v-else>
    <div
      v-if="voiceSettings.length"
      class="flex max-h-screen w-full flex-col px-48 py-10 gap-10"
    >
      <h1 class="text-4xl font-semibold">Your voice settings</h1>
      <div class="grid grid-cols-2 xl:grid-cols-3 gap-5 overflow-y-scroll">
        <UploadAudioDialog :animate-on-hover="false" class="h-fit" with-text />
        <VoiceSetting
          v-for="(setting, index) in voiceSettings"
          :key="setting.id"
          :index="index"
          :setting="setting"
          can-setting
          class="h-full"
        />
      </div>
    </div>
    <div v-else class="flex max-h-screen w-full flex-col px-20 py-10">
      <div class="flex flex-col justify-center h-full gap-10">
        <h2 class="font-semibold text-5xl text-center">
          Change Your
          <span
            class="from-purple-600 via-pink-600 to-red-500 bg-gradient-to-r bg-clip-text text-transparent"
            >Text to Speech</span
          >
          with
          <span
            class="from-purple-600 via-pink-600 to-red-500 bg-gradient-to-r bg-clip-text text-transparent"
            >AI</span
          >
        </h2>
        <h2 class="font-light text-3xl text-center">
          Creating your first voice setting now
        </h2>
        <Separator class="h-[1px] w-72 mx-auto bg-primary" />
        <div class="text-center space-y-3">
          <h2 class="font-semibold text-3xl text-center">
            Transforming Your Text to Speech in
            <span
              class="from-purple-600 via-pink-600 to-red-500 bg-gradient-to-r bg-clip-text text-transparent"
              >3 Simple Steps</span
            >
          </h2>
          <h2 class="font-light text-sm text-gray-400 w-1/3 mx-auto">
            ChatEcho collects your voice setting. For each your messages, users
            can enjoy the generated voice messages without recording
          </h2>
        </div>
        <div class="flex items-start justify-center mt-10">
          <div class="text-center flex flex-col gap-3 items-center">
            <div
              class="h-48 w-72 border-2 border-primary rounded-md flex items-center justify-center shadow-md"
            >
              <UploadAudioDialog />
            </div>
            <div class="flex flex-col gap-1 items-center w-72">
              <h2 class="font-semibold">1. Upload Voice Recording</h2>
              <p class="font-light text-gray-400 text-sm w-2/3">
                Select voice & Upload or Recording Audio
              </p>
            </div>
          </div>
          <Separator class="h-[2px] w-32 bg-primary mt-24" />
          <div class="text-center flex flex-col gap-3 items-center opacity-40">
            <div
              class="h-48 w-72 border-2 border-primary rounded-md shadow-md p-2"
            >
              <img
                alt="wave"
                class="object-cover w-full h-full"
                src="@/assets/images/voice_setting_2.png"
              />
            </div>
            <div class="flex flex-col gap-1 items-center w-72">
              <h2 class="font-semibold">2. Generate model</h2>
              <p class="font-light text-gray-400 text-sm w-2/3">
                AI will Generate and save the voice setting
              </p>
            </div>
          </div>
          <Separator class="h-[2px] w-32 bg-primary mt-24 opacity-40" />
          <div class="text-center flex flex-col gap-3 items-center opacity-40">
            <div
              class="h-48 w-72 border-2 border-primary rounded-md shadow-md p-2"
            >
              <img
                alt="wave"
                class="object-cover w-full h-full"
                src="@/assets/images/voice_setting_1.png"
              />
            </div>
            <div class="flex flex-col gap-1 items-center w-72">
              <h2 class="font-semibold">3. Enjoy the result</h2>
              <p class="font-light text-gray-400 text-sm w-2/3">
                Listen to converted vocal. Public and share the result
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<style scoped></style>
