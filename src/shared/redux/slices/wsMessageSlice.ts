import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { WsMessage } from '@/shared/types/message'

interface WsState {
  lastMessagesByFilterId: Record<number, WsMessage>
  lastMessagesByChatId: Record<number, WsMessage>
  unreadFilterIdsByChatId: Record<number, number[]> // chatId → [filterId, ...]
}

const initialState: WsState = {
  lastMessagesByFilterId: {},
  lastMessagesByChatId: {},
  unreadFilterIdsByChatId: {}
}

export const wsMessageSlice = createSlice({
  name: 'ws',
  initialState,
  reducers: {
    messageReceived(state, action: PayloadAction<{ message: WsMessage; currentFilterId: number }>) {
      const { message: msg, currentFilterId } = action.payload

      state.lastMessagesByFilterId[msg.filterId] = msg
      state.lastMessagesByChatId[msg.chatId] = msg

      if (currentFilterId === msg.filterId) {
        return
      }

      const existing = state.unreadFilterIdsByChatId[msg.chatId] ?? []
      if (!existing.includes(msg.filterId)) {
        state.unreadFilterIdsByChatId[msg.chatId] = [...existing, msg.filterId]
      }
    },

    markFilterAsRead(state, action: PayloadAction<{ chatId: number; filterId: number }>) {
      const { chatId, filterId } = action.payload
      const current = state.unreadFilterIdsByChatId[chatId]

      if (!current) return

      const filtered = current.filter(id => id !== filterId)
      if (filtered.length === 0) {
        delete state.unreadFilterIdsByChatId[chatId]
      } else {
        state.unreadFilterIdsByChatId[chatId] = filtered
      }
    }
  }
})

export const { messageReceived, markFilterAsRead } = wsMessageSlice.actions
export default wsMessageSlice.reducer
