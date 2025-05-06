import { Message } from '@shared/types/message'

import { api } from '@api/initance'

export const getMessages = (filterId: number) => api.get<Message[]>(`messages/filter/${filterId}`)
