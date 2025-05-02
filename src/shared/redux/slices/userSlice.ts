import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from '@shared/type/user'

const initialState: User = {
  userId: 0,
  username: '',
  displayName: '',
  phoneNumber: null,
  avatarPath: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    selectUser: (state, action: PayloadAction<User>) => {
      return { ...state, ...action.payload }
    },
    unselectUser: () => initialState
  }
})

export const { selectUser, unselectUser } = userSlice.actions
export default userSlice.reducer
