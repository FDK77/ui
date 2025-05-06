export interface Chat {
  chatId: number
  title: string
  avatar: null | string
  lastMessage: null | string
  unreadMessages: boolean
  type: 'USER' | 'CHAT' | 'CHANNEL'
}
