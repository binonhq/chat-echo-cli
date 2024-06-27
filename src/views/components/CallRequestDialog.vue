<script lang="ts">
import { computed, defineComponent, nextTick, ref, watch } from 'vue'
import { useChatting } from '@/composables/useChatting/useChatting.ts'
import { useAuth } from '@/composables/useAuth'
import Avatar from '@/views/components/Avatar.vue'
import { toast } from '@/components/ui/toast'
import { Icon } from '@iconify/vue'
import cellPhoneRinging from '@/assets/audio/cell-phone-ringing.mp3'

export default defineComponent({
  name: 'CallRequestDialog',
  components: { Icon, Avatar },
  setup() {
    const { callRequest, cancelCall, acceptJoinCall, inCall } = useChatting()
    const { currentUser } = useAuth()
    const isOpen = ref(false)
    const audioRef = ref()
    const isRefusedOrCancel = ref(false)
    const currentCallRequest = ref()

    watch(
      () => callRequest.value,
      (callRequest) => {
        if (callRequest) {
          currentCallRequest.value = callRequest
          isOpen.value = true
          isRefusedOrCancel.value = false
          nextTick(() => {
            if (audioRef.value?.paused) {
              audioRef.value.currentTime = 0
            }
            audioRef.value?.play()
          })
          if (callRequest.from._id === currentUser.value?.userId) {
            setTimeout(() => {
              if (inCall.value) return
              isRefusedOrCancel.value = true
              audioRef.value?.pause()
              cancelCall(callRequest.channel._id)
            }, 30000)
          }
        }
        if (!callRequest && isOpen.value) {
          isRefusedOrCancel.value = true
          audioRef.value?.pause()
        }
      }
    )

    const isFromYou = computed(
      () => currentCallRequest.value.from?._id === currentUser.value?.userId
    )

    const avatarCall = computed(() => {
      if (isFromYou.value)
        return currentCallRequest.value.channel.userIds.filter(
          (u) => u._id !== currentUser.value?.userId
        )[0].avatarId
      if (currentCallRequest.value.channel.type === 'direct') {
        return currentCallRequest.value.channel.userIds.filter(
          (u) => u._id !== currentUser.value?.userId
        )[0].avatarId
      }
      return currentCallRequest.value.channel.avatarId
    })

    const callName = computed(() => {
      if (currentCallRequest.value.channel.type === 'direct') {
        const otherUser = currentCallRequest.value.channel.userIds.filter(
          (u) => u._id !== currentUser.value?.userId
        )[0]
        return `${otherUser.firstName} ${otherUser.lastName}`
      }
      return currentCallRequest.value.channel.name
    })

    const handleCancel = () => {
      audioRef.value?.pause()
      cancelCall(callRequest.value.channel._id)
      toast({
        title: 'Call canceled',
        description: 'The call has been canceled.'
      })
    }

    const handleDecline = () => {
      audioRef.value?.pause()
      cancelCall(callRequest.value.channel._id)
    }

    const handleAccept = () => {
      audioRef.value?.pause()
      acceptJoinCall()
    }

    watch(
      () => inCall.value,
      (inCall) => {
        if (inCall) {
          isOpen.value = false
          audioRef.value?.pause()
        }
      }
    )

    return {
      isOpen,
      callRequest,
      handleCancel,
      handleDecline,
      isRefusedOrCancel,
      callName,
      isFromYou,
      avatarCall,
      audioRef,
      cellPhoneRinging,
      handleAccept
    }
  }
})
</script>

<template>
  <div
    v-if="isOpen"
    :class="[
      'fixed h-screen w-screen bg-black top-0 z-[100] transition-opacity duration-200 flex justify-center items-center',
      isOpen ? 'bg-opacity-80' : 'bg-opacity-0'
    ]"
  >
    <div class="w-[400px] bg-white p-10 rounded-sm">
      <div class="flex flex-col items-center gap-5">
        <template v-if="isFromYou">
          <p class="text-center font-semibold">Calling to</p>
          <Avatar :image-id="avatarCall" />
          <p class="text-center font-semibold">{{ callName }}</p>
          <template v-if="!isRefusedOrCancel">
            <p class="text-center text-sm">Ringing...</p>
            <div class="typing-indicator">
              <div class="typing-circle"></div>
              <div class="typing-circle"></div>
              <div class="typing-circle"></div>
              <div class="typing-shadow"></div>
              <div class="typing-shadow"></div>
              <div class="typing-shadow"></div>
            </div>
            <Button class="mt-5" variant="secondary" @click="handleCancel"
              >Cancel
            </Button>
          </template>
          <template v-else>
            <p class="text-center text-sm">No answer.</p>
            <Button class="mt-5" variant="secondary" @click="isOpen = false"
              >Close
            </Button>
          </template>
        </template>

        <template v-else>
          <p class="text-center font-semibold">Incoming call from</p>
          <Avatar :image-id="avatarCall" />
          <p class="text-center font-semibold">{{ callName }}</p>
          <p v-if="isRefusedOrCancel">The call has been cancel.</p>
          <div v-else class="flex gap-3">
            <Button
              class="bg-green-500 hover:bg-green-600 flex gap-2"
              @click="handleAccept"
            >
              <Icon class="size-4" icon="lucide:phone" />
              Accept
            </Button>
            <Button class="flex gap-2" @click="handleDecline">
              <Icon class="size-4" icon="lucide:circle-off" />
              Decline
            </Button>
          </div>
          <Button
            v-if="isRefusedOrCancel"
            variant="secondary"
            @click="isOpen = false"
            >Close
          </Button>
        </template>
      </div>
      <audio
        ref="audioRef"
        :src="cellPhoneRinging"
        class="hidden"
        controls
      ></audio>
    </div>
  </div>
</template>

<style scoped>
.typing-indicator {
  width: 60px;
  height: 30px;
  position: relative;
  z-index: 4;
}

.typing-circle {
  width: 8px;
  height: 8px;
  position: absolute;
  border-radius: 50%;
  background-color: #000;
  left: 15%;
  transform-origin: 50%;
  animation: typing-circle7124 0.5s alternate infinite ease;
}

@keyframes typing-circle7124 {
  0% {
    top: 20px;
    height: 5px;
    border-radius: 50px 50px 25px 25px;
    transform: scaleX(1.7);
  }

  40% {
    height: 8px;
    border-radius: 50%;
    transform: scaleX(1);
  }

  100% {
    top: 0%;
  }
}

.typing-circle:nth-child(2) {
  left: 45%;
  animation-delay: 0.2s;
}

.typing-circle:nth-child(3) {
  left: auto;
  right: 15%;
  animation-delay: 0.3s;
}

.typing-shadow {
  width: 5px;
  height: 4px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 30px;
  transform-origin: 50%;
  z-index: 3;
  left: 15%;
  filter: blur(1px);
  animation: typing-shadow046 0.5s alternate infinite ease;
}

@keyframes typing-shadow046 {
  0% {
    transform: scaleX(1.5);
  }

  40% {
    transform: scaleX(1);
    opacity: 0.7;
  }

  100% {
    transform: scaleX(0.2);
    opacity: 0.4;
  }
}

.typing-shadow:nth-child(4) {
  left: 45%;
  animation-delay: 0.2s;
}

.typing-shadow:nth-child(5) {
  left: auto;
  right: 15%;
  animation-delay: 0.3s;
}
</style>
