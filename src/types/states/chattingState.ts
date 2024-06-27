import { CallRequest, HistoryChat, Message, User } from '@/types/types.ts'

export type ChattingState = {
  onlineUsers: User[]
  webSocket: WebSocket | null
  conversation: Message[]
  historyChat: HistoryChat[]
  callRequest: CallRequest | null
  inCall: boolean
  isEndConversation: boolean
}
