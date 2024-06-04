import { User } from '@/types/types.ts'

export type ChattingState = {
  onlineUsers: User[];
  webSocket: WebSocket | null;
}


