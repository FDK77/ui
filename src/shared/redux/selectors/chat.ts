import { RootState } from '@app/redux/store'

export const getSelectChat = (state: RootState) => state.chat

export const getSelectChatAvatar = (state: RootState) => state.chat.avatar
export const getSelectChatId = (state: RootState) => state.chat.chatId
export const getSelectChatFilters = (state: RootState) => state.chat.filters
export const getSelectChatLastMessage = (state: RootState) => state.chat.lastMessage
export const getSelectChatTitle = (state: RootState) => state.chat.title
export const getSelectChatType = (state: RootState) => state.chat.type
