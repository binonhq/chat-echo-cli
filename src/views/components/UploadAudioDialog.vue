<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
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
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'

type AudioDevice = {
  id: string
  name: string
}

export default defineComponent({
  name: 'UploadAudioDialog',
  components: {
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
    const { currentUser } = useAuth()
    const router = useRouter()

    const availableRecordingDevices = ref([] as AudioDevice[])
    const selectedRecordingDevice = ref({} as AudioDevice)
    const audioFiles = ref<File[]>([])
    const isRecording = ref(false)
    const audios = ref<string[]>([])
    const mediaRecorderRef = ref<MediaRecorder>()

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
        return
      }
      // Start recording
      isRecording.value = true
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
            audioFiles.value.push(newFile)
            audios.value.push(URL.createObjectURL(newFile))
          }
          mediaRecorderRef.value = mediaRecorder
          mediaRecorder.start()
        })
    }

    const onChangeFile = (e: any) => {
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
      createNewVoiceSetting
    }
  }
})
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <div
        :class="animateOnHover ? 'hover:scale-110' : ''"
        class="px-10 py-8 border-dashed border-blue-500 rounded-md border-2 shadow duration-200 cursor-pointer"
      >
        <div class="flex items-center justify-center gap-5">
          <Icon class="text-blue-500 w-10 h-10" icon="lucide:upload" />
          <p v-if="withText" class="text-blue-500 font-semibold">
            Upload audio
          </p>
        </div>
      </div>
    </DialogTrigger>
    <DialogContent class="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Create a new voice</DialogTitle>
        <DialogDescription>
          Select a recording device to start recording your voice
        </DialogDescription>
      </DialogHeader>
      <div class="h-full overflow-y-scroll max-h-[60vh]">
        <template v-if="audios.length">
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
        </template>
        <div class="grid grid-cols-1 gap-5 h-full">
          <div
            v-if="availableRecordingDevices.length"
            class="flex flex-col gap-3"
          >
            <p class="text-sm font-semibold">Recording a new audio</p>
            <div class="border-[1px] px-5 py-3 rounded-md space-y-3 h-full">
              <p class="text-sm font-semibold">Select a recording device</p>
              <div class="flex items-center gap-2">
                <RadioGroup :default-value="availableRecordingDevices[0].id">
                  <div
                    v-for="device in availableRecordingDevices"
                    class="flex items-center space-x-2"
                    @click="handleSelectDevice(device)"
                  >
                    <RadioGroupItem
                      :id="device.id"
                      :value="device.id"
                      @click="handleSelectDevice(device)"
                    />
                    <Label :for="device.id">{{ device.name }}</Label>
                  </div>
                </RadioGroup>
              </div>
              <div class="flex flex-col items-center gap-2 py-5">
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
                <p class="text-sm text-center">
                  {{ isRecording ? 'Recording...' : 'Start record' }}
                </p>
                <p class="text-[9pt] text-gray-500 text-center w-2/3">
                  *For the best audio quality, please ensure you are recording
                  in a quiet environment free from background noise.
                </p>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-3">
            <p class="text-sm font-semibold">Or upload your voice</p>
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
          </div>
        </div>
      </div>
      <DialogFooter class="">
        <Button :disabled="!audioFiles.length" @click="createNewVoiceSetting">
          Create
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style scoped></style>
