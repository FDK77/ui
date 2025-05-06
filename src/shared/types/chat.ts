export interface Chat {
  chatId: number
  title: string
  avatar: null | string
  lastMessage: null | string
  ureadMessages: boolean
  type: 'USER' | 'CHAT' | 'CHANNEL'
}
