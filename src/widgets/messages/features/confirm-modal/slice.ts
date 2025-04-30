import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ConfirmModalState {
  isOpen: boolean
  message: string
  onConfirm?: () => void
}

const initialState: ConfirmModalState = {
  isOpen: false,
  message: ''
}

export const confirmModalSlice = createSlice({
  name: 'confirmModal',
  initialState,
  reducers: {
    openConfirmModal: (
      state,
      action: PayloadAction<{ message: string; onConfirm: () => void }>
    ) => {
      state.isOpen = true
      state.message = action.payload.message
      state.onConfirm = action.payload.onConfirm
    },
    closeConfirmModal: state => {
      state.isOpen = false
      state.message = ''
      state.onConfirm = undefined
    },
    confirm: state => {
      state.onConfirm?.()
      state.isOpen = false
      state.message = ''
      state.onConfirm = undefined
    }
  }
})

export const { openConfirmModal, closeConfirmModal, confirm } = confirmModalSlice.actions
export default confirmModalSlice.reducer
