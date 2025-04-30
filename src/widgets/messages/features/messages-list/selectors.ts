import { RootState } from '@/app/redux/store'

export const getSelectFilterId = (state: RootState) => state.filter.id
export const getSelectChatId = (state: RootState) => state.chat.chatId
