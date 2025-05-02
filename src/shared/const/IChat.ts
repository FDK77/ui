import { IFilter } from './IFilter'

export interface IChat {
  chatId: number
  title: string
  avatar: null | string
  filters: IFilter[]
  lastMessage: null | string
  type: 'USER' | 'CHAT' | 'CHANNEL'
}
