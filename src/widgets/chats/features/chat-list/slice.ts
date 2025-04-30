import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IChat } from '@/shared/const/IChat'

const initialState: IChat = {
  chatId: 0,
  title: '',
  type: 'USER',
  filters: [{ id: 0, name: '', color: '', text: '', summary: false }],
  image: null
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState: initialState,
  reducers: {
    selectChat: (state, action: PayloadAction<IChat>) => {
      return { ...state, ...action.payload }
    }
  }
})

export const { selectChat } = chatSlice.actions
export default chatSlice.reducer
