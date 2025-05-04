import { User } from './user'

export interface Message {
  id: number
  text: string
  summary: null | string
  timestamp: string
  sender: User
  filterId: number
  chatId: number
}
