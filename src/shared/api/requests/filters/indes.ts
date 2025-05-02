import { api } from '@api/initance'

import { Filter } from '@/shared/type/filter'

export const getMessages = (chatId: number) => api.get<Filter[]>(`messages/filter/${chatId}`)
