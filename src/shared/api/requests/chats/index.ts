import { Chat } from '@shared/types/chat'

import { api } from '@api/initance'

export const getChats = () => api.get<Chat[]>('chats')

export const postSync = () => api.post('chats/sync')
