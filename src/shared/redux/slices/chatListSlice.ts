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
      const chat = state.list.find(c => c.chatId === action.payload)
      if (chat) chat.ureadMessages = false
    },
    updateChat: (state, action: PayloadAction<Chat>) => {
      const index = state.list.findIndex(c => c.chatId === action.payload.chatId)
      if (index !== -1) state.list[index] = action.payload
    }
  }
})

export const { setChatList, selectChat, updateChat } = chatListSlice.actions
export default chatListSlice.reducer
