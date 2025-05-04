import { api } from '@/shared/api/initance'

export const deleteMesseges = (filterId: number) => api.delete(`messages/filter/${filterId}`)
