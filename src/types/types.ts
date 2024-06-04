export type User = {
  userId: string;
  email: string;
  isActive: boolean;
  firstName: string;
  lastName: string;
  channelId: string;
  avatar: string;
}

export type UserRegisterSchema = {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  confirmPassword: String;
}

export enum MessageType {
  DIRECT = 'direct',
  GROUP = 'group',
}

export type Message = {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
  attachment: File;
  stickerId: string;
  type: MessageType;
}

export type Channel = {
  id: string;
  name: string;
  userIds: string[],
  type: MessageType;
}
