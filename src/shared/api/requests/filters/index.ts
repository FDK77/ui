import { Filter } from '@shared/type/filter'

import { api } from '@api/initance'

export const getFilters = (chatId: number) => api.get<Filter[]>(`messages/filter/${chatId}`)
