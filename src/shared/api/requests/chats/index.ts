import { Chat } from '@shared/type/chat'

import { api } from '@api/initance'

export const getChats = () => api.get<Chat[]>('chats')
