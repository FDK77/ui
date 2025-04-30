import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IUser } from '@/shared/const/IUser'

const initialState: IUser = {
  userId: 0,
  username: '',
  displayName: '',
  avatarPath: null
}

export const modalUserSlice = createSlice({
  name: 'modalUser',
  initialState: initialState,
  reducers: {
    selectUser: (state, action: PayloadAction<IUser>) => {
      return { ...state, ...action.payload }
    },
    unSelectUser: () => initialState
  }
})

export const { selectUser, unSelectUser } = modalUserSlice.actions
export default modalUserSlice.reducer
