import { IUser } from './IUser'

export interface IMessage {
  id: number
  text: string
  summary: null | string
  timestamp: string
  sender: IUser
}
