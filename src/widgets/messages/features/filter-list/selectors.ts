import { RootState } from '@/app/redux/store'

export const getSelectChatFilters = (state: RootState) => state.chat.filters
