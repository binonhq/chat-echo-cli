import { ComputedRef } from 'vue'
import { Channel, Message, User } from '@/types/types.ts'

export type ConnectToWebsocket = () => void;

export interface UseChatting {
  connectToWebsocket: ConnectToWebsocket;
  onlineUsers: ComputedRef<User[]>;
  handleSelectChannel: (channel: Channel) => Promise<void>;
  handleSendMessage: (message: Message) => void;
  getDetailMessages: (channelId: string) => any;
  getOrCreateChannel: (channel: Channel) => Promise<any>;
  getHistoryMessages: () => Promise<any>;
  currentChannelId: ComputedRef<string>;
}

export type UseChattingReturn = () => UseChatting;