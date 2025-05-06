import { User } from './user'

export interface Message {
  id: number
  text: string
  summary: null | string
  timestamp: string
  sender: User
}

export interface WsMessage extends Message {
  chatId: number
  filterId: number
}
