import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Chat } from '@/shared/types/chat'

interface ChatListState {
  list: Chat[]
  selectedChatId: number | null
}

const initialState: ChatListState = {
  list: [],
  selectedChatId: null
}

export const chatListSlice = createSlice({
  name: 'chatList',
  initialState,
  reducers: {
    setChatList: (state, action: PayloadAction<Chat[]>) => {
      state.list = action.payload
    },
    selectChat: (state, action: PayloadAction<number>) => {
      state.selectedChatId = action.payload
    },
    updateChat: (state, action: PayloadAction<Chat>) => {
      const index = state.list.findIndex(c => c.chatId === action.payload.chatId)
      if (index !== -1) state.list[index] = action.payload
    },
    readChat: (state, action: PayloadAction<number>) => {
      const chat = state.list.find(c => c.chatId === action.payload)
      if (chat) chat.unreadMessages = false
    }
  }
})

export const { setChatList, selectChat, updateChat, readChat } = chatListSlice.actions
export default chatListSlice.reducer
