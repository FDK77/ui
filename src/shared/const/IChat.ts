import { IFilter } from './IFilter'

export interface IChat {
  chatId: number
  title: string
  image: null | string
  filters: IFilter[]
  type: 'USER' | 'CHAT' | 'CHANNEL'
}
