import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ConfirmModalState {
  isOpen: boolean
  message: string
}

const initialState: ConfirmModalState = {
  isOpen: false,
  message: ''
}

export const confirmModalSlice = createSlice({
  name: 'confirmModal',
  initialState,
  reducers: {
    openConfirmModal: (state, action: PayloadAction<{ message: string }>) => {
      state.isOpen = true
      state.message = action.payload.message
    },
    closeConfirmModal: state => {
      state.isOpen = false
      state.message = ''
    }
  }
})

export const { openConfirmModal, closeConfirmModal } = confirmModalSlice.actions
export default confirmModalSlice.reducer
