import { RootState } from '@/app/redux/store'

export const getSelectChatImage = (state: RootState) => state.chat.avatar

export const getSelectChatTitle = (state: RootState) => state.chat.title
