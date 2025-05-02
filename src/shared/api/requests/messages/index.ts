import { Message } from '@shared/type/message'

import { api } from '@api/initance'

export const getMessages = (filterId: number) => api.get<Message[]>(`messages/filter/${filterId}`)
