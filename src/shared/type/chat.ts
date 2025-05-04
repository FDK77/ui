import { Filter } from './filter'

export interface Chat {
  chatId: number | null
  title: string
  avatar: null | string
  filters: Filter[]
  lastMessage: null | string
  type: 'USER' | 'CHAT' | 'CHANNEL'
}
