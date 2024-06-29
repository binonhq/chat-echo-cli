<script lang="ts">
import { defineComponent, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useRoute } from 'vue-router'
import Logo from '@/views/components/Logo.vue'
import { Button } from '@/components/ui/button'
import { Toggle } from '@/components/ui/toggle'
import { Icon } from '@iconify/vue'
import Avatar from '@/views/components/Avatar.vue'
import { useChatting } from '@/composables/useChatting/useChatting.ts'
import { Channel } from '@/types/types.ts'
import { Peer } from 'peerjs'

export default defineComponent({
  name: 'CallPage',
  components: { Avatar, Icon, Toggle, Button, Logo },
  setup() {
    const { currentUser } = useAuth()
    const {
      getOrCreateChannel,
      sendPeerSignal,
      connectToWebsocket,
      cancelCall
    } = useChatting()
    const route = useRoute()
    const { channel_id, option } = route.query

    const channel = ref()
    const listJoiners = ref([])
    const isTurnOffCamera = ref(option === 'audio')
    const isSoundOff = ref(false)
    const isMicOff = ref(false)
    const isCallOff = ref(false)
    const avatarCall = ref('')
    const nameCall = ref('')

    const myVideoRef = ref<HTMLVideoElement | null>(null)
    const otherVideoRef = ref<HTMLVideoElement | null>(null)

    const myPeer = new Peer()
    const callRefs = ref<{ [key: string]: any }>({})
    const mediaStream = ref<MediaStream | null>(null)

    const getUserMedia =
      navigator?.getUserMedia ||
      navigator?.webkitGetUserMedia ||
      navigator?.mozGetUserMedia

    myPeer.on('open', (id) => {
      console.log('My peer id:', id)
      sendPeerSignal(id, channel_id?.toString() || '')
    })

    myPeer.on('call', (call) => {
      getUserMedia(
        { video: true, audio: true },
        (mediaStream) => {
          myVideoRef.value.srcObject = mediaStream
          myVideoRef.value.play()
          call.answer(mediaStream)
          call.on('stream', function (remoteStream) {
            nextTick(() => {
              otherVideoRef.value.srcObject = remoteStream
              otherVideoRef.value.play()
            })
          })
        },
        (err) => {
          console.log('Failed to get local stream', err)
        }
      )
    })

    const toggleSound = () => {
      isSoundOff.value = !isSoundOff.value
    }

    const toggleMic = () => {
      isMicOff.value = !isMicOff.value
    }

    const toggleCamera = () => {
      isTurnOffCamera.value = !isTurnOffCamera.value
      if (isTurnOffCamera.value && mediaStream.value) {
        mediaStream.value.getVideoTracks().forEach((track) => track.stop())
      } else {
        // Restart the video if the camera is turned on
        getUserMedia(
          { video: true, audio: true },
          (stream) => {
            mediaStream.value = stream
            if (myVideoRef.value) {
              myVideoRef.value.srcObject = mediaStream.value
              myVideoRef.value.play()
            }
          },
          (err) => {
            console.log('Failed to get local stream', err)
          }
        )
      }
    }

    const handleOffCall = () => {
      cancelCall(channel_id?.toString() || '')
      Object.values(callRefs.value).forEach((call) => call.close())
      myPeer.destroy()
    }

    onMounted(async () => {
      const ws = await connectToWebsocket()

      ws.addEventListener('message', (event) => {
        const data = JSON.parse(event.data)
        if (data.type === 'peer-signal') {
          const { peerId } = data.data
          if (!peerId) return
          listJoiners.value.push(peerId)
          getUserMedia(
            { video: true, audio: true },
            (mediaStream) => {
              const call = myPeer.call(peerId, mediaStream)
              callRefs.value[peerId] = call
              call.on('stream', function (remoteStream) {
                otherVideoRef.value.srcObject = remoteStream
                otherVideoRef.value.play()
              })
            },
            (err) => {
              console.log('Failed to get local stream', err)
            }
          )
        } else if (data.type === 'cancel-call') {
          isCallOff.value = true
          myPeer.destroy()
        }
      })

      getOrCreateChannel({
        id: channel_id
      } as Channel).then((res) => {
        channel.value = res
        avatarCall.value =
          channel.value.avatarId ||
          channel.value.userIds.find(
            (user) => user._id != currentUser.value.userId
          ).avatarId ||
          ''
        const listUser = channel.value.userIds.filter(
          (user) => user._id != currentUser.value.userId
        )
        nameCall.value =
          listUser.length === 1
            ? listUser[0].firstName + ' ' + listUser[0].lastName
            : listUser
                .map((user) => user.firstName + ' ' + user.lastName)
                .join(', ')

        isCallOff.value = !channel.value.onCall
      })
    })

    // watch(
    //   [isTurnOffCamera, isMicOff],
    //   () => {
    //     navigator.mediaDevices
    //       .getUserMedia({
    //         video: !isTurnOffCamera.value,
    //         audio: !isMicOff.value
    //       })
    //       .then((stream) => {
    //         nextTick(() => {
    //           if (myVideoRef.value) {
    //             myVideoRef.value.srcObject = stream
    //             myVideoRef.value.play()
    //           }
    //         })
    //       })
    //   },
    //   {
    //     immediate: true
    //   }
    // )

    onBeforeUnmount(() => {
      handleOffCall()
    })

    window.addEventListener('beforeunload', () => {
      handleOffCall()
    })

    return {
      currentUser,
      listJoiners,
      isTurnOffCamera,
      isSoundOff,
      isMicOff,
      isCallOff,
      nameCall,
      avatarCall,
      myVideoRef,
      otherVideoRef,
      handleOffCall,
      toggleSound,
      toggleMic,
      toggleCamera
    }
  }
})
</script>

<template>
  <div
    class="bg-gradient-to-br from-black justify-between from-10% to-stone-900 min-h-screen w-screen text-white py-10 pb-32 px-20 flex flex-col gap-5"
  >
    <p class="font-semibold text-2xl">ChatEcho</p>
    <template v-if="!isCallOff">
      <div
        v-if="!listJoiners.length"
        class="grow flex flex-col items-center justify-center gap-5"
      >
        <Avatar :image-id="avatarCall" size="xl" />
        <p>{{ nameCall }}</p>
        <div class="loader my-3">
          <div class="circle">
            <div class="dot"></div>
            <div class="outline"></div>
          </div>
          <div class="circle">
            <div class="dot"></div>
            <div class="outline"></div>
          </div>
          <div class="circle">
            <div class="dot"></div>
            <div class="outline"></div>
          </div>
          <div class="circle">
            <div class="dot"></div>
            <div class="outline"></div>
          </div>
        </div>
        <p class="text-center text-xl font-light">
          Waiting for others to join the call
        </p>
      </div>
      <div
        :class="[
          'grow w-full grid gap-5 grid-cols-2',
          listJoiners.length ? '' : 'hidden'
        ]"
      >
        <div
          class="w-full h-full relative rounded-md bg-stone-900 flex flex-col items-center justify-center"
        >
          <video
            ref="myVideoRef"
            autoplay
            class="rounded-md w-full h-full object-cover"
          ></video>
          <!--          <div v-if="isTurnOffCamera" class="">-->
          <!--            <Avatar :image="currentUser.avatar" size="md" />-->
          <!--          </div>-->
          <!--          <div class="flex gap-3 absolute top-3 right-3">-->
          <!--            <div v-if="isTurnOffCamera">-->
          <!--              <div class="p-4 bg-black bg-opacity-40 rounded-full">-->
          <!--                <Icon class="size-5" icon="lucide:video-off" />-->
          <!--              </div>-->
          <!--            </div>-->
          <!--            <div v-if="isMicOff">-->
          <!--              <div class="p-4 bg-black bg-opacity-40 rounded-full">-->
          <!--                <Icon class="size-5" icon="lucide:mic-off" />-->
          <!--              </div>-->
          <!--            </div>-->
          <!--            <div v-if="isSoundOff">-->
          <!--              <div class="p-4 bg-black bg-opacity-40 rounded-full">-->
          <!--                <Icon class="size-5" icon="lucide:volume-x" />-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->
          <p
            class="absolute bottom-2 right-2 px-5 py-1 bg-black bg-opacity-40 rounded-md"
          >
            You
          </p>
        </div>
        <div
          class="w-full h-full relative rounded-md bg-stone-900 flex flex-col items-center justify-center"
        >
          <video
            ref="otherVideoRef"
            autoplay
            class="rounded-md w-full h-full object-cover"
          ></video>
          <!--          <div v-if="isTurnOffCamera" class="">-->
          <!--            <Avatar :image="currentUser.avatar" size="md" />-->
          <!--          </div>-->
          <!--          <div class="flex gap-3 absolute top-3 right-3">-->
          <!--            <div v-if="isTurnOffCamera">-->
          <!--              <div class="p-4 bg-black bg-opacity-40 rounded-full">-->
          <!--                <Icon class="size-5" icon="lucide:video-off" />-->
          <!--              </div>-->
          <!--            </div>-->
          <!--            <div v-if="isMicOff">-->
          <!--              <div class="p-4 bg-black bg-opacity-40 rounded-full">-->
          <!--                <Icon class="size-5" icon="lucide:mic-off" />-->
          <!--              </div>-->
          <!--            </div>-->
          <!--            <div v-if="isSoundOff">-->
          <!--              <div class="p-4 bg-black bg-opacity-40 rounded-full">-->
          <!--                <Icon class="size-5" icon="lucide:volume-x" />-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->
          <p
            class="absolute bottom-2 right-2 px-5 py-1 bg-black bg-opacity-40 rounded-md"
          >
            {{ nameCall }}
          </p>
        </div>
      </div>

      <div
        class="fixed right-0 bottom-0 w-full bg-black bg-opacity-30 py-5 flex gap-5 items-center justify-center"
      >
        <div class="flex gap-5 justify-end w-1/3">
          <Button
            :class="isSoundOff ? 'bg-primary' : ''"
            class="rounded-full"
            size="icon"
            variant="ghost"
            @click="toggleSound"
          >
            <Icon
              :icon="isSoundOff ? 'lucide:volume-x' : 'lucide:volume-2'"
              class="size-5 cursor-pointer"
            />
          </Button>
          <Button
            :class="isMicOff ? 'bg-primary' : ''"
            class="rounded-full"
            size="icon"
            variant="ghost"
            @click="toggleMic"
          >
            <Icon
              :icon="isMicOff ? 'lucide:mic-off' : 'lucide:mic'"
              class="size-5 cursor-pointer"
            />
          </Button>
        </div>
        <Button
          class="bg-primary rounded-full w-14 h-14"
          variant="ghost"
          @click="handleOffCall"
        >
          <Icon class="size-5 cursor-pointer" icon="lucide:phone-off" />
        </Button>
        <div class="w-1/3">
          <Button
            :class="isTurnOffCamera ? 'bg-primary' : ''"
            class="rounded-full"
            size="icon"
            variant="ghost"
            @click="toggleCamera"
          >
            <Icon
              :icon="isTurnOffCamera ? 'lucide:video-off' : 'lucide:video'"
              class="size-5 cursor-pointer"
            />
          </Button>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="grow flex flex-col items-center justify-center gap-5 pb-32">
        <Avatar :image-id="avatarCall" size="xl" />
        <p>{{ nameCall }}</p>
        <p class="text-center text-xl font-light">Call has ended</p>
      </div>
    </template>
  </div>
</template>

<style scoped>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  --color: hsl(0, 0%, 87%);
  --animation: 2s ease-in-out infinite;
}

.loader .circle {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 20px;
  height: 20px;
  border: solid 2px var(--color);
  border-radius: 50%;
  margin: 0 10px;
  background-color: transparent;
  animation: circle-keys var(--animation);
}

.loader .circle .dot {
  position: absolute;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: var(--color);
  animation: dot-keys var(--animation);
}

.loader .circle .outline {
  position: absolute;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  animation: outline-keys var(--animation);
}

.circle:nth-child(2) {
  animation-delay: 0.3s;
}

.circle:nth-child(3) {
  animation-delay: 0.6s;
}

.circle:nth-child(4) {
  animation-delay: 0.9s;
}

.circle:nth-child(5) {
  animation-delay: 1.2s;
}

.circle:nth-child(2) .dot {
  animation-delay: 0.3s;
}

.circle:nth-child(3) .dot {
  animation-delay: 0.6s;
}

.circle:nth-child(4) .dot {
  animation-delay: 0.9s;
}

.circle:nth-child(5) .dot {
  animation-delay: 1.2s;
}

.circle:nth-child(1) .outline {
  animation-delay: 0.9s;
}

.circle:nth-child(2) .outline {
  animation-delay: 1.2s;
}

.circle:nth-child(3) .outline {
  animation-delay: 1.5s;
}

.circle:nth-child(4) .outline {
  animation-delay: 1.8s;
}

.circle:nth-child(5) .outline {
  animation-delay: 2.1s;
}

@keyframes circle-keys {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.5);
    opacity: 0.5;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes dot-keys {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes outline-keys {
  0% {
    transform: scale(0);
    outline: solid 20px var(--color);
    outline-offset: 0;
    opacity: 1;
  }

  100% {
    transform: scale(1);
    outline: solid 0 transparent;
    outline-offset: 20px;
    opacity: 0;
  }
}
</style>
