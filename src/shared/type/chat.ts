export interface Chat {
  chatId: number | null
  title: string
  avatar: null | string
  lastMessage: null | string
  type: 'USER' | 'CHAT' | 'CHANNEL'
}
