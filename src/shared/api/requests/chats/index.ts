import { api } from '@api/initance'

import { Chat } from '@/shared/type/chat'

export const getChats = () => api.get<Chat[]>('chats')
