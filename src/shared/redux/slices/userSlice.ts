import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from '@shared/type/user'

interface UserState {
  user: User | null
  isOpen: boolean
}

const initialState: UserState = {
  user: null,
  isOpen: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    selectUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isOpen = true
    },
    unselectUser: state => {
      state.user = null
      state.isOpen = false
    }
  }
})

export const { selectUser, unselectUser } = userSlice.actions
export default userSlice.reducer
