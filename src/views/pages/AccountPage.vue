<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import Avatar from '@/views/components/Avatar.vue'
import { useAuth } from '@/composables/useAuth'
import { Icon } from '@iconify/vue'
import { Separator } from '@/components/ui/separator'
import { convertTime } from '@/utils/util.ts'
import { Button } from '@/components/ui/button'
import { useChatting } from '@/composables/useChatting/useChatting.ts'
import {
  Channel,
  User,
  VoiceSetting as VoiceSettingType
} from '@/types/types.ts'
import VoiceSetting from '@/views/components/VoiceSetting.vue'
import { useRoute, useRouter } from 'vue-router'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast'
import { mainAxios } from '@/main.ts'
import { Label } from '@/components/ui/label'

export default defineComponent({
  name: 'AccountPage',
  methods: { convertTime },
  components: { Label, Input, VoiceSetting, Button, Separator, Icon, Avatar },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { currentUser } = useAuth()
    const { getVoiceSettings, getUserById, handleSelectChannel } = useChatting()
    const userData = ref({} as User)
    const feedbackMessage = ref('')
    const feedbacks = ref([])

    const isMe = computed(() => {
      return (
        route.path.split('/')[1] === 'account' ||
        route.path.split('/')[2] === currentUser.value.userId
      )
    })

    const userId = computed(() => {
      if (isMe.value) return currentUser.value.userId
      return route.path.split('/')[2]
    })

    const voiceSettings = ref([] as VoiceSettingType[])

    const user = computed(() =>
      isMe.value ? currentUser.value : userData.value
    )

    const handleEditProfile = () => {
      router.push('/setting/personal-information')
    }

    const handleSendMessage = async () => {
      const userId = route.path.split('/')[2]
      const channel = {
        userIds: [userId, currentUser.value.userId]
      } as Channel
      await handleSelectChannel(channel)
    }

    const handleUpdateAvatar = async (e: Event) => {
      const target = e.target as HTMLInputElement
      const file = target.files?.[0]
      if (!file) return
      const formData = new FormData()
      formData.append('file', file)
      formData.append('kind', 'avatar')
      try {
        await mainAxios.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          responseType: 'arraybuffer'
        })
        router.go(0)
      } catch (e) {
        toast({
          title: 'Update avatar failed'
        })
      }
    }

    const handleUpdateCover = async (e: Event) => {
      const target = e.target as HTMLInputElement
      const file = target.files?.[0]
      if (!file) return
      const formData = new FormData()
      formData.append('file', file)
      formData.append('kind', 'cover')
      try {
        await mainAxios.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          responseType: 'arraybuffer'
        })
        router.go(0)
      } catch (e) {
        toast({
          title: 'Update cover failed'
        })
      }
    }

    const handleSendFeedback = async () => {
      if (!feedbackMessage.value) {
        toast({
          title: 'Feedback is empty'
        })
        return
      }
      try {
        await mainAxios.post('/auth/give_feedback', {
          content: feedbackMessage.value,
          userId: user.value._id || user.value.userId
        })
        await getUserData()
        toast({
          title: 'Feedback sent'
        })
      } catch (e) {
        toast({
          title: 'Send feedback failed'
        })
      }
    }

    const coverSrc = computed(() => {
      if (user.value.coverId) {
        const host = import.meta.env.VITE_NODE_API
        return `${host}/images/${user.value.coverId}`
      }
      return 'https://iconerecife.com.br/wp-content/plugins/uix-page-builder/uixpb_templates/images/UixPageBuilderTmpl/default-cover-4.jpg'
    })
    const getUserData = async () => {
      try {
        const response = await getUserById(userId.value)
        userData.value = response.user
        feedbacks.value = response.feedbacks
      } catch (e) {
        toast({
          title: 'Get user failed'
        })
      }
    }

    onMounted(async () => {
      await init()
    })

    const init = async () => {
      voiceSettings.value = await getVoiceSettings(userId.value)
      try {
        await getUserData()
      } catch (e) {
        toast({
          title: 'Get user failed'
        })
      }
    }

    watch(userId, async () => {
      await init()
    })

    return {
      user,
      voiceSettings,
      feedbacks,
      feedbackMessage,
      handleEditProfile,
      handleSendMessage,
      handleUpdateAvatar,
      handleUpdateCover,
      handleSendFeedback,
      coverSrc,
      isMe
    }
  }
})
</script>

<template>
  <div
    class="flex gap-5 h-screen overflow-y-scroll w-full flex-col px-10 2xl:px-48 py-10"
  >
    <div class="relative w-full h-72">
      <div class="relative">
        <img
          :src="coverSrc"
          alt="avatar"
          class="w-full h-72 object-cover rounded-md"
        />
        <Button
          v-if="isMe"
          class="absolute top-5 right-5 py-1 h-fit px-3 rounded-sm"
          variant="secondary"
        >
          <label class="flex items-center gap-2" for="upload-cover">
            <Icon class="size-3" icon="lucide:pen" />
            <p class="text-[8pt]">Edit cover</p>
          </label>
          <input
            id="upload-cover"
            accept="image/*"
            class="hidden"
            type="file"
            @change="handleUpdateCover"
          />
        </Button>
      </div>
      <div class="absolute transform left-20 -translate-y-1/2">
        <div class="relative border-[4px] border-white rounded-full shadow">
          <Avatar :image-id="user.avatarId" can-preview size="md" />
          <label
            v-if="isMe"
            class="absolute bottom-0 right-0 text-white p-2 bg-primary rounded-full cursor-pointer border-[4px] border-white"
            for="input-avatar"
          >
            <Icon class="text-white" icon="lucide:camera" />
          </label>
          <input
            id="input-avatar"
            accept="image/*"
            class="hidden"
            type="file"
            @change="handleUpdateAvatar"
          />
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-2 w-full mt-20 pl-20">
      <div class="flex justify-between gap-10">
        <div class="space-y-3">
          <p class="text-2xl font-semibold">
            {{ user.firstName }} {{ user.lastName }}
          </p>
          <p v-if="user.about" class="font-light">{{ user.about }}</p>
        </div>
        <Button
          v-if="isMe"
          class="flex gap-3"
          variant="default"
          @click="handleEditProfile"
        >
          <Icon class="size-4" icon="lucide:pen" />
          Edit Profile
        </Button>
        <Button
          v-else
          class="flex gap-3"
          variant="default"
          @click="handleSendMessage"
        >
          <Icon class="size-4" icon="lucide:send" />
          Message
        </Button>
      </div>
      <div class="flex flex-wrap gap-5 items-center opacity-65 mt-5 w-full">
        <div class="flex gap-3 items-center">
          <Icon class="size-5" icon="lucide:mail" />
          <p class="text-sm font-light">{{ user.email }}</p>
        </div>
        <Separator class="w-[1px] h-5" />
        <template v-if="user.phone">
          <div class="flex gap-3 items-center">
            <Icon class="size-5" icon="lucide:phone" />
            <p class="text-sm font-light">
              {{ user.phone }}
            </p>
          </div>
          <Separator class="w-[1px] h-5" />
        </template>
        <div class="flex gap-3 items-center">
          <Icon class="size-5" icon="lucide:calendar" />
          <p class="text-sm font-light">
            Joined {{ convertTime(user.createdAt) }}
          </p>
        </div>
      </div>
    </div>
    <Separator class="w-full mt-10" />
    <div class="flex flex-col lg:flex-row py-10 gap-10">
      <div v-if="voiceSettings?.length" class="flex flex-col gap-5 grow">
        <p class="text-xl font-semibold">Public voice settings</p>
        <div class="grid lg:grid-cols-2 gap-5">
          <VoiceSetting
            v-for="(setting, index) in voiceSettings"
            :key="setting.id"
            :can-setting="isMe"
            :index="index"
            :setting="setting"
            class="h-full"
          />
        </div>
      </div>
      <div class="ml-auto space-y-5 lg:w-1/3">
        <template v-if="!isMe">
          <p class="font-semibold text-xl">Give a review</p>
          <div class="flex gap-3 w-full">
            <Input v-model="feedbackMessage" placeholder="Your feedback..." />
            <Button
              :disabled="feedbackMessage === ''"
              @click="handleSendFeedback"
            >
              <Icon icon="lucide:send" size="5" />
            </Button>
          </div>
        </template>
        <template v-if="feedbacks.length">
          <p class="font-semibold text-xl">{{ feedbacks.length }} reviews</p>
          <div class="grid grid-cols-1 gap-3">
            <div
              v-for="feedback in feedbacks"
              :key="feedback._id"
              class="border-[1px] rounded-md py-5 px-5 space-y-5"
            >
              <div class="flex gap-4 items-center">
                <Avatar :image-id="feedback.createdBy?.avatarId" size="sm" />
                <div>
                  <router-link
                    :to="`/community/${feedback.createdBy?._id}`"
                    class="font-semibold"
                  >
                    {{ feedback.createdBy?.firstName }}
                    {{ feedback.createdBy?.lastName }}
                  </router-link>
                  <p class="font-light text-sm">
                    {{ convertTime(feedback.createdAt) }}
                  </p>
                </div>
              </div>
              <p class="text-[11pt] pl-9 border-l-2 ml-4 pb-3">
                {{ feedback.content }}
              </p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
