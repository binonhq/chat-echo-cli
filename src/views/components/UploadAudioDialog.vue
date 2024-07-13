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

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/vue'
import { mainAxios } from '@/main.ts'
import { toast } from '@/components/ui/toast'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { Separator } from '@/components/ui/separator'

type AudioDevice = {
  id: string
  name: string
}

export default defineComponent({
  name: 'UploadAudioDialog',
  components: {
    Separator,
    Icon,
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    Label,
    RadioGroup,
    RadioGroupItem
  },
  props: {
    animateOnHover: {
      type: Boolean,
      default: true
    },
    withText: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const router = useRouter()
    const { currentUser } = useAuth()

    const availableRecordingDevices = ref([] as AudioDevice[])
    const selectedRecordingDevice = ref({} as AudioDevice)
    const audioFiles = ref<File[]>([])
    const isRecording = ref(false)
    const audios = ref<string[]>([])
    const mediaRecorderRef = ref<MediaRecorder>()
    const step = ref('initial')
    const isOpen = ref(false)
    const timeRecording = ref(0)
    const timeRecordingInterval = ref()

    const getAvailableRecordingDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices()
      availableRecordingDevices.value = devices
        .filter((device) => device.kind === 'audioinput' && device.deviceId)
        ?.map((device) => {
          return {
            id: device.deviceId,
            name: device.label
          } as AudioDevice
        })
      selectedRecordingDevice.value = availableRecordingDevices.value.length
        ? availableRecordingDevices.value[0]
        : ({} as AudioDevice)
    }

    const handleSelectDevice = (device: AudioDevice) => {
      selectedRecordingDevice.value = device
    }

    const handleRecording = () => {
      if (isRecording.value) {
        // Stop recording
        if (mediaRecorderRef.value) {
          mediaRecorderRef.value.stop()
        }
        isRecording.value = false
        timeRecording.value = 0
        clearInterval(timeRecordingInterval.value)
        return
      }
      // Start recording
      isRecording.value = true

      timeRecordingInterval.value = setInterval(() => {
        timeRecording.value += 1
      }, 1000)

      navigator.mediaDevices
        .getUserMedia({ audio: { deviceId: selectedRecordingDevice.value.id } })
        .then((stream) => {
          const mediaRecorder = new MediaRecorder(stream)
          const chunks: Blob[] = []
          mediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data)
          }
          mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'audio/wav' })
            const newFile = new File([blob], 'audio.wav', { type: 'audio/wav' })
            if (newFile.size / 1024 / 1024 > 5) {
              toast({
                title: 'Error',
                description: 'Audio file should be less than 5MB'
              })
              return
            }
            audioFiles.value.pop()
            audios.value.pop()
            audioFiles.value.push(newFile)
            audios.value.push(URL.createObjectURL(newFile))
          }
          mediaRecorderRef.value = mediaRecorder
          mediaRecorder.start()
        })
    }

    const onChangeFile = (e: any) => {
      if (e.target.files[0].size / 1024 / 1024 > 5) {
        toast({
          title: 'Error',
          description: 'Audio file should be less than 5MB'
        })
        return
      }
      audioFiles.value.pop()
      audios.value.pop()
      audioFiles.value.push(e.target.files[0])
      audios.value.push(URL.createObjectURL(e.target.files[0]))
    }

    const handleRemoveAudio = (index: number) => {
      audioFiles.value.splice(index, 1)
      audios.value.splice(index, 1)
    }

    const createNewVoiceSetting = async () => {
      try {
        const formData = new FormData()
        formData.append('file', audioFiles.value[0])
        formData.append('kind', 'voice_setting')
        await mainAxios.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          responseType: 'arraybuffer'
        })

        toast({
          title: 'Success',
          description: 'New voice setting created'
        })
        router.go(0)
      } catch (e) {
        toast({
          title: 'Error',
          description: 'Failed to create new voice setting'
        })
      }
    }

    const openDialog = () => {
      isOpen.value = true
      changeStep('initial')
    }

    const closeDialog = () => {
      isOpen.value = false
    }

    const changeStep = (newStep: string) => {
      step.value = newStep
    }

    const timeRecordingDisplay = computed(() => {
      const minutes = Math.floor(timeRecording.value / 60)
      const seconds = timeRecording.value % 60
      return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    })

    onMounted(() => {
      getAvailableRecordingDevices()
    })

    return {
      selectedRecordingDevice,
      availableRecordingDevices,
      handleSelectDevice,
      handleRecording,
      onChangeFile,
      handleRemoveAudio,
      audios,
      isRecording,
      audioFiles,
      currentUser,
      createNewVoiceSetting,
      step,
      changeStep,
      openDialog,
      isOpen,
      closeDialog,
      timeRecordingDisplay
    }
  }
})
</script>

<template>
  <Dialog :open="isOpen">
    <div
      :class="animateOnHover ? 'hover:scale-110' : ''"
      class="px-10 py-8 border-dashed border-blue-500 rounded-md border-2 shadow duration-200 cursor-pointer"
      @click="openDialog"
    >
      <div class="flex items-center justify-center gap-5">
        <Icon class="text-blue-500 w-10 h-10" icon="lucide:upload" />
        <p v-if="withText" class="text-blue-500 font-semibold">Upload audio</p>
      </div>
    </div>
    <DialogContent class="min-w-[70vw]" @close="closeDialog">
      <DialogHeader>
        <DialogTitle>Create a new voice</DialogTitle>
        <DialogDescription>
          Add a new voice setting for yourself
        </DialogDescription>
      </DialogHeader>
      <div class="overflow-y-scroll min-h-[70vh]">
        <template v-if="step === 'initial'">
          <div class="grid grid-cols-2 gap-5">
            <div class="flex flex-col gap-10 px-20 py-10 justify-center">
              <div class="flex flex-col gap-5">
                <Icon
                  class="w-20 h-20 p-5 rounded-full bg-green-100 text-stone-500"
                  icon="lucide:mic"
                />
                <p class="text-3xl font-medium">
                  Hi, {{ currentUser.firstName }} {{ currentUser.lastName }},
                  let's record a sample of your voice.
                </p>
                <p>
                  Please ensure you're in a quiet environment and use a
                  microphone for more effective recording.
                </p>
              </div>
              <div class="flex flex-col gap-3">
                <p class="font-medium">Select a recording device</p>
                <RadioGroup :default-value="availableRecordingDevices[0].id">
                  <Label
                    v-for="device in availableRecordingDevices"
                    :class="
                      selectedRecordingDevice.id === device.id
                        ? 'border-primary'
                        : ''
                    "
                    :for="device.id"
                    class="flex items-center gap-2 border-[1px] duration-200 px-3 py-5 rounded-md cursor-pointer"
                    @click="handleSelectDevice(device)"
                  >
                    <RadioGroupItem
                      :id="device.id"
                      :aria-checked="selectedRecordingDevice.id === device.id"
                      :value="device.id"
                      @click="handleSelectDevice(device)"
                    />
                    <p>{{ device.name }}</p>
                  </Label>
                </RadioGroup>
              </div>
              <div class="flex flex-col gap-2">
                <Button class="rounded-full" @click="changeStep('recording')"
                  >Start recording your voice
                </Button>
                <Button
                  class="rounded-full"
                  variant="secondary"
                  @click="changeStep('upload')"
                  >Or you can upload your audio here
                </Button>
              </div>
            </div>
            <div class="flex items-center">
              <img
                alt="voice setting"
                class="w-full object-cover"
                src="@/assets/images/add_voice.jpg"
              />
            </div>
          </div>
        </template>
        <div v-else class="relative px-20 py-10 h-full">
          <Button
            class="absolute top-0 left-10 rounded-full w-12 h-12"
            variant="ghost"
            @click="changeStep('initial')"
          >
            <Icon class="w-8 h-8" icon="lucide:arrow-left" />
          </Button>
          <div
            v-if="step === 'recording'"
            class="grid grid-cols-2 gap-5 h-full"
          >
            <div
              class="flex flex-col items-center justify-center gap-2 py-5 w-full h-full"
            >
              <p class="text-xl">{{ timeRecordingDisplay }}</p>
              <Button
                :class="{ 'bg-green-500': isRecording }"
                class="rounded-full w-20 h-20"
                @click="handleRecording"
              >
                <Icon
                  :fill="isRecording"
                  :icon="isRecording ? 'lucide:square' : 'lucide:mic'"
                  class="size-7"
                />
              </Button>
              <p class="text-xl text-center py-2">
                {{ isRecording ? 'Recording...' : 'Start record' }}
              </p>
              <p class="text-[9pt] text-gray-500 text-center w-2/3">
                *For the best audio quality, please ensure you are recording in
                a quiet environment free from background noise.
              </p>
              <p class="text-[9pt] text-gray-500 text-center w-2/3">
                *The recording should be no longer than 30 seconds.
              </p>
              <separator v-if="audios.length" class="my-5" />
              <div v-if="audios.length" class="w-full px-10">
                <p class="font-semibold mb-2">Your audios</p>
                <div
                  v-for="(audio, index) in audios"
                  class="flex items-center gap-4 mb-2"
                >
                  <audio :src="audio" class="w-full" controls></audio>
                  <Button
                    class="flex gap-1 items-center"
                    @click="handleRemoveAudio(index)"
                  >
                    <Icon icon="lucide:trash" />
                  </Button>
                </div>
              </div>
            </div>
            <div class="border-l-[1px] px-10 flex flex-col gap-10">
              <p class="text-gray-500 text-xl">Voice sample script</p>
              <p class="text-xl leading-loose">
                Hello and welcome! We're thrilled to have you here. In today's
                session, we'll explore a variety of topics designed to enhance
                your knowledge and skills. Sit back, relax, and enjoy the
                journey. If you have any questions or need further assistance,
                feel free to reach out at any time. Let's make this experience
                both enjoyable and informative. Thank you for joining us, and
                let's get started!
              </p>
            </div>
          </div>
          <div v-if="step === 'upload'" class="flex flex-col gap-10 h-full p-5">
            <p class="text-2xl font-semibold">Upload your voice</p>
            <div class="flex items-center justify-center w-full h-56">
              <label
                class="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                for="dropzone-file"
              >
                <div
                  class="flex flex-col items-center justify-center pt-5 pb-6"
                >
                  <svg
                    aria-hidden="true"
                    class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    fill="none"
                    viewBox="0 0 20 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    MP3 or WAV
                  </p>
                  <p
                    class="text-xs text-gray-500 dark:text-gray-400 w-2/3 text-center"
                  >
                    Please upload a file that is small in size and free from
                    noise for optimal processing
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  accept="audio/*"
                  class="hidden"
                  type="file"
                  @change="onChangeFile"
                />
              </label>
            </div>
            <div v-if="audios.length" class="w-full">
              <p class="font-semibold mb-2">Your audios</p>
              <div
                v-for="(audio, index) in audios"
                class="flex items-center gap-4 mb-2"
              >
                <audio :src="audio" class="w-full" controls></audio>
                <Button
                  class="flex gap-1 items-center"
                  @click="handleRemoveAudio(index)"
                >
                  <Icon icon="lucide:trash" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button
          v-if="step !== 'initial'"
          :disabled="!audioFiles.length"
          @click="createNewVoiceSetting"
        >
          Create
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style scoped></style>
