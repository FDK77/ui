import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Message } from '@/shared/type/message'

interface WsState {
  lastMessagesByFilterId: Record<number, Message>
  newMessagesByChatId: Record<number, boolean>
}

const initialState: WsState = {
  lastMessagesByFilterId: {},
  newMessagesByChatId: {}
}

export const wsMessageSlice = createSlice({
  name: 'ws',
  initialState,
  reducers: {
    messageReceived(state, action: PayloadAction<Message>) {
      const msg = action.payload
      state.lastMessagesByFilterId[msg.filterId] = msg
      state.newMessagesByChatId[msg.chatId] = true
    },
    markChatAsRead(state, action: PayloadAction<number>) {
      delete state.newMessagesByChatId[action.payload]
    }
  }
})

export const { messageReceived, markChatAsRead } = wsMessageSlice.actions
export default wsMessageSlice.reducer
