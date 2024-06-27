export type User = {
  _id: string
  userId: string
  email: string
  isActive: boolean
  firstName: string
  lastName: string
  channelId: string
  avatarId: string
  createdAt: string
  voiceSettingId: string
  phone: string
  about: string
  coverId: string
}

export type UserRegisterSchema = {
  firstName: String
  lastName: String
  email: String
  password: String
  confirmPassword: String
}

export enum ChannelType {
  DIRECT = 'direct',
  GROUP = 'group'
}

export type Message = {
  _id: string
  content: string
  senderId: string
  senderName: string
  channelId: string
  createdAt: string
  attachmentId: string
  stickerId: string
  avatarId: string
}

export type Channel = {
  id: string
  name: string
  userIds: string[]
  type: ChannelType
  onCall: boolean
}

export type HistoryChat = {
  _id: string
  name: string
  type: ChannelType
  message: Message
  avatarId: string
  isUnread: boolean
  userId: string
}

export type VoiceSetting = {
  id: string
  name: string
  createAt: string
}

export type ChannelDetail = {
  _id: string
  name: string
  type: ChannelType
  userIds: User[]
  avatarId: string
  onCall: boolean
  attachments: Attachment[]
  images: string[]
}

export type Attachment = {
  _id: string
  name: string
  createdAt?: string
}

export type CallRequest = {
  from: User
  channel: ChannelDetail
  option: string
}
