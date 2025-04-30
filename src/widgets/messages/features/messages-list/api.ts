import axiosInit from '@/shared/api/axiosInit'
import { IMessage } from '@/shared/const/IMessage'

export const getMessages = async (id: number): Promise<IMessage[]> => {
  return (await axiosInit.get<IMessage[]>(`messages/filter/${id}`)).data
}
