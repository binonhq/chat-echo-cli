import { ConnectToWebsocket, UseChattingReturn } from '@/composables/useChatting/types.ts'
import { getToken } from '@/utils/util.ts'
import { useStore } from 'vuex'
import { Types } from '@/store/modules/chatting.ts'
import { computed } from 'vue'
import { Channel, Message, MessageType, User } from '@/types/types.ts'
import router from '@/router/router.ts'
import { mainAxios } from '@/main.ts'
import { toast } from '@/components/ui/toast'
import { useRoute } from 'vue-router'


export const useChatting: UseChattingReturn = () => {
  const host = import.meta.env.VITE_HOST
  const port = import.meta.env.VITE_PORT
  const store = useStore()
  const route = useRoute()

  const onlineUsers = computed(
    () => store.state.chatting.onlineUsers?.filter(user => user.userId !== store.state.user.currentUser.userId)
  )

  const webSocketInstance = computed(() => store.state.chatting.webSocket)

  const currentChannelId = computed(() => route.query?.channel_id as string)

  const connectToWebsocket: ConnectToWebsocket = async () => {
    const url = `ws://${host}:${port}?token=${getToken().accessToken}`
    const ws = new WebSocket(url)
    await store.dispatch(Types.SET_WEB_SOCKET, ws)

    ws.onopen = () => {
      console.log('Connected to the server websocket')
    }
    ws.addEventListener('message', handleReceiveMessage)
    ws.addEventListener('close', () => {
      setTimeout(() => {
        console.log('Disconnected. Trying to reconnect.')
        connectToWebsocket()
      }, 1000)
    })

  }

  const handleReceiveMessage = async (event: MessageEvent) => {
    const messageData = JSON.parse(event.data)
    if ('online' in messageData) {
      if (messageData.online) {
        await store.dispatch(Types.SET_ONLINE_USERS, messageData.online.map((user: any) => {
          return {
            userId: user.userId,
            email: user.email,
            isActive: true,
            firstName: user.firstName,
            lastName: user.lastName,
            channelId: user.channelId
          } as User
        }))
      }
    } else if ('text' in messageData) {
      // if (messageData.sender === selectedUserId) {
      //   setMessages(prev => ([...prev, { ...messageData }]))
      // }
    }
  }

  const handleSelectChannel = async (channel: Channel) => {
    const channelData = await getOrCreateChannel(channel)
    await router.push('/chat?channel_id=' + channelData._id)
  }

  const getOrCreateChannel = async (channel: Channel) => {
    try {
      const channelRes = await mainAxios.post('/channel', {
        name: channel.name,
        userIds: channel.userIds
      })
      return channelRes.data
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to create channel'
      })
      return {}
    }
  }

  const handleSendMessage = (message: Message) => {
    const messageData = {
      senderId: store.state.user.currentUser.userId,
      receiverId: store.state.chatting.receiverId,
      content: message.content,
      attachment: message.attachment,
      stickerId: message.stickerId,
      type: MessageType.DIRECT
    } as Message
    webSocketInstance.value.send(JSON.stringify(messageData))
  }

  const getDetailMessages = async (channelId: string) => {
    try {
      const response = await mainAxios.get(`/message/${channelId}`)
      return response.data
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to get messages'
      })
      return {}
    }
  }

  const getHistoryMessages = async () => {
    try {
      const response = await mainAxios.get('/message')
      return response.data
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to get messages'
      })
      return {}
    }
  }

  return {
    onlineUsers,
    currentChannelId,
    connectToWebsocket,
    handleSendMessage,
    handleSelectChannel,
    getDetailMessages,
    getOrCreateChannel,
    getHistoryMessages
  }
}