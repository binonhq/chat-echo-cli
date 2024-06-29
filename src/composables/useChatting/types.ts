import { ComputedRef } from 'vue'
import { Channel, Message } from '@/types/types.ts'

export type ConnectToWebsocket = () => Promise<any>

export interface UseChatting {
  makeNewCall: (channelId: string, option: string) => Promise<void>
  getVoiceSettings: (userId: string) => Promise<any>
  getUserById: (userId: string) => Promise<any>
  currentChannelId: ComputedRef<string>
  updateHistoryChat: (channelId: string) => Promise<void>
  onlineUsers: ComputedRef<any>
  webSocketInstance: ComputedRef<any>
  handleSelectChannel: (channel: Channel) => Promise<void>
  getDetailChannel: (channelId: string) => Promise<any>
  cancelCall: (channelId: string) => void
  getDetailMessages: (channelId: string, index: number) => Promise<any>
  getOrCreateChannel: (channel: Channel) => Promise<any>
  connectToWebsocket: () => Promise<any>
  getHistoryMessages: () => Promise<any>
  handleSendMessage: (message: Message) => void
  inCall: ComputedRef<any>
  getAllUser: () => Promise<any>
  sendPeerSignal: (id: string, channelId: string) => void
  callRequest: ComputedRef<any>
  acceptJoinCall: () => void
  conversation: ComputedRef<Message[]>
  historyChat: ComputedRef<any>
}

export type UseChattingReturn = () => UseChatting
