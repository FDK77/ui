import { Filter } from '@shared/types/filter'

import { api } from '@api/initance'

export const getFilters = (chatId: number) => api.get<Filter[]>(`filters/${chatId}`)

export const postFilters = (chatId: number, filters: Filter[]) =>
  api.post('/chats/settings', { chatId: chatId, filters: filters })
