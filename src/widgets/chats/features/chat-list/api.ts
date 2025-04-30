import axiosInit from '@/shared/api/axiosInit'
import { IChat } from '@/shared/const/IChat'

export const getChats = async (): Promise<IChat[]> => {
  return (await axiosInit.get<IChat[]>('chats')).data
}
