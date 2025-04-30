import { RootState } from '@/app/redux/store'

export const getSelectFilters = (state: RootState) => state.chat.filters
export const getChatId = (state: RootState) => state.chat.chatId
