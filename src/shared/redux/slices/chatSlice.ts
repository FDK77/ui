import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Chat } from '@/shared/type/chat'

const initialState: Chat = {
  chatId: null,
  title: '',
  type: 'USER',
  lastMessage: '',
  avatar: null
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState: initialState,
  reducers: {
    selectChat: (state, action: PayloadAction<Chat>) => {
      return { ...state, ...action.payload }
    },
    unselectChat: () => initialState
  }
})

export const { selectChat, unselectChat } = chatSlice.actions
export default chatSlice.reducer
