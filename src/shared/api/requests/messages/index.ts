import { api } from '@api/initance'

import { IMessage } from '@/shared/const/IMessage'

export const getMessages = (filterId: number) => api.get<IMessage[]>(`messages/filter/${filterId}`)
