import {
  ConnectToWebsocket,
  UseChattingReturn
} from '@/composables/useChatting/types.ts'
import { getToken } from '@/utils/util.ts'
import { useStore } from 'vuex'
import { Types } from '@/store/modules/chatting.ts'
import { computed } from 'vue'
import { CallRequest, Channel, Message, User } from '@/types/types.ts'
import { mainAxios } from '@/main.ts'
import { toast } from '@/components/ui/toast'
import { useRoute, useRouter } from 'vue-router'

export const useChatting: UseChattingReturn = () => {
  const nodeServer = import.meta.env.VITE_NODE_SERVER
  const host = import.meta.env.VITE_NODE_HOST
  const port = import.meta.env.VITE_NODE_PORT
  const store = useStore()
  const route = useRoute()
  const router = useRouter()

  const onlineUsers = computed(() =>
    store.state.chatting.onlineUsers?.filter(
      (user: any) => user.userId !== store.state.user.currentUser.userId
    )
  )

  const webSocketInstance = computed(() => store.state.chatting.webSocket)

  const currentChannelId = computed(() => route.query?.channel_id as string)

  const conversation = computed(() => store.state.chatting.conversation)

  const historyChat = computed(() => store.state.chatting.historyChat)

  const callRequest = computed(() => store.state.chatting.callRequest)

  const inCall = computed(() => store.state.chatting.inCall)

  const getAllUser = async () => {
    try {
      const response = await mainAxios.get('/user')
      return response.data
    } catch (e) {
      toast({
        title: 'Something went wrong!',
        description: "Can't get all user"
      })
    }
  }

  const connectToWebsocket: ConnectToWebsocket = async () => {
    // if host is https then use wss
    let url = `ws://${host}:${port}?token=${getToken().accessToken}`
    if (nodeServer.includes('https')) {
      url = `wss://${host}:${port}?token=${getToken().accessToken}`
    }

    const ws = new WebSocket(url)

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
    await store.dispatch(Types.SET_WEB_SOCKET, ws)
    return ws
  }

  const closeWebsocket = () => {
    webSocketInstance.value.close()
    store.dispatch(Types.SET_WEB_SOCKET, null)
    console.log('Websocket closed')
  }

  const handleReceiveMessage = async (event: MessageEvent) => {
    const messageData = JSON.parse(event.data)
    const { type, data } = messageData
    switch (type) {
      case 'online-users':
        await handleOnlineUsers(data)
        break
      case 'error':
        toast({
          title: 'Error',
          description: data.message
        })
        break
      case 'message':
        await handleGetMessage(data)
        break
      case 'new-call':
        await handleNewCall(data)
        break
      case 'cancel-call':
        await store.dispatch(Types.SET_CALL_REQUEST, null)
        break
      case 'join-call':
        await handleJoinCall(data)
        break
    }
  }

  const handleGetMessage = async (data: any) => {
    const { message, history } = data
    const channel = message.channelId
    if (channel === currentChannelId.value) {
      const isExist = conversation.value.find(
        (chat: Message) => chat._id === message._id
      )
      if (!isExist) {
        await store.dispatch(Types.SET_CONVERSATION, [
          ...conversation.value,
          message
        ])
      }
    } else {
      toast({
        avatarId: message.sender.avatarId,
        title: 'You have a new message!',
        description:
          message.senderName +
          ': ' +
          (message.content.length > 20
            ? message.content.slice(0, 20) + '...'
            : message.content)
      })
    }

    await store.dispatch(
      Types.SET_CHAT_HISTORY,
      history.map((channel: any) => {
        if (currentChannelId.value === channel._id) {
          return {
            ...channel,
            isUnread: false
          }
        }
        return channel
      })
    )
  }

  const handleOnlineUsers = async (data: any) => {
    await store.dispatch(
      Types.SET_ONLINE_USERS,
      data.map((user: any) => {
        return {
          userId: user?.userId,
          email: user?.email,
          isActive: true,
          firstName: user?.firstName,
          lastName: user?.lastName,
          channelId: user?.channelId,
          avatarId: user?.avatarId
        } as User
      })
    )
  }

  const handleNewCall = async (data: any) => {
    const { caller, channel, option } = data
    if (!caller || !channel || !option) {
      toast({
        title: 'Error',
        description: 'Failed to join call'
      })
      return
    }
    const callRequest = {
      from: caller as User,
      channel: channel,
      option: option
    } as CallRequest
    await store.dispatch(Types.SET_CALL_REQUEST, callRequest)
  }

  const handleJoinCall = async (data: any) => {
    const { channelId, option } = data
    const isFromMe =
      callRequest.value?.from._id === store.state.user.currentUser.userId
    if (!channelId || !option) {
      toast({
        title: 'Error',
        description: 'Failed to join call'
      })
      return
    }
    await store.dispatch(Types.SET_IN_CALL, true)
    window.open(
      `/call?channel_id=${channelId}&option=${option}&isFromMe=${isFromMe}`,
      '_blank'
    )
  }

  const handleSelectChannel = async (channel: Channel) => {
    const channelData = await getOrCreateChannel(channel)
    await router.push('/chat?channel_id=' + channelData._id)
  }

  const updateHistoryChat = async (channelId: string) => {
    const history = historyChat.value.map((channel: any) => {
      if (channel._id === channelId) {
        return {
          ...channel,
          isUnread: false
        }
      }
      return channel
    })
    await store.dispatch(Types.SET_CHAT_HISTORY, history)
  }

  const getOrCreateChannel = async (channel: Channel) => {
    try {
      const channelRes = await mainAxios.post('/channel', {
        channelId: channel.id,
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

  const getDetailChannel = async (channelId: string) => {
    try {
      const response = await mainAxios.get(`/channel/${channelId}`)
      return response.data
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.response.data.message
          ? err.response.data.message
          : 'Failed to get channel'
      })
      await router.push('/chat')
      return {}
    }
  }

  const handleSendMessage = (message: Message) => {
    const messageData = {
      senderId: store.state.user.currentUser.userId,
      channelId: message.channelId,
      content: message.content,
      attachmentId: message.attachmentId,
      stickerId: message.stickerId
    } as Message
    webSocketInstance.value.send(
      JSON.stringify({ type: 'send-message', data: messageData })
    )
  }

  const getDetailMessages = async (channelId: string, index: number = 0) => {
    try {
      if (index != 0 && store.state.chatting.isEndConversation) {
        return
      }
      const response = await mainAxios.get(`/message/${channelId}`, {
        params: { index }
      })
      if (response.data.messages) {
        if (index === 0) {
          await store.dispatch(Types.SET_CONVERSATION, response.data.messages)
        } else {
          await store.dispatch(Types.ADD_CONVERSATION, response.data.messages)
        }
      }
      await store.dispatch(
        Types.SET_IS_END_CONVERSATION,
        !!response.data.isEndOfList
      )
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
      const response = await mainAxios.get('/channel')
      await store.dispatch(Types.SET_CHAT_HISTORY, response.data)
      return response.data
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to get messages'
      })
      return {}
    }
  }

  const getVoiceSettings = async (userId: string) => {
    try {
      const response = await mainAxios.get('/voice-settings?user_id=' + userId)
      return response.data.settings
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to get voice settings'
      })
    }
  }

  const makeNewCall = async (channelId: string, option: string) => {
    await store.dispatch(Types.SET_IN_CALL, false)
    const callData = {
      callerId: store.state.user.currentUser.userId,
      channelId: channelId,
      option: option
    }
    webSocketInstance.value.send(
      JSON.stringify({ type: 'new-call', data: callData })
    )
  }

  const acceptJoinCall = () => {
    const callData = {
      actionUserId: store.state.user.currentUser.userId,
      option: callRequest.value?.option,
      channelId: callRequest.value?.channel._id
    }
    webSocketInstance.value.send(
      JSON.stringify({ type: 'accept-call', data: callData })
    )
  }

  const cancelCall = (channelId: string) => {
    const callData = {
      actionUserId: store.state.user.currentUser.userId,
      channelId: channelId
    }
    webSocketInstance.value.send(
      JSON.stringify({ type: 'cancel-call', data: callData })
    )
  }

  const sendPeerSignal = (id: string, channelId: string) => {
    const callData = {
      senderId: store.state.user.currentUser.userId,
      channelId: channelId,
      peerId: id
    }
    webSocketInstance.value.send(
      JSON.stringify({ type: 'peer-signal', data: callData })
    )
  }

  const getUserById = async (userId: string) => {
    try {
      const response = await mainAxios.get(`/user/${userId}`)
      return response.data
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to get user'
      })
      return {}
    }
  }

  return {
    onlineUsers,
    currentChannelId,
    conversation,
    historyChat,
    callRequest,
    inCall,
    webSocketInstance,
    getAllUser,
    updateHistoryChat,
    connectToWebsocket,
    handleSendMessage,
    handleSelectChannel,
    getDetailMessages,
    getOrCreateChannel,
    getHistoryMessages,
    getVoiceSettings,
    makeNewCall,
    cancelCall,
    acceptJoinCall,
    sendPeerSignal,
    getDetailChannel,
    getUserById,
    closeWebsocket
  }
}
