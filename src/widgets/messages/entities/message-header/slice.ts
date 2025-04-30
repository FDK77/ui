import { createSlice } from '@reduxjs/toolkit'

interface settingsModalState {
  isOpen: boolean
}

const initialState: settingsModalState = {
  isOpen: false
}

export const settingsModalSlice = createSlice({
  name: 'settingsModal',
  initialState: initialState,
  reducers: {
    openModal: state => {
      state.isOpen = true
    },
    closeModal: state => {
      state.isOpen = false
    }
  }
})

export const { openModal, closeModal } = settingsModalSlice.actions
export default settingsModalSlice.reducer
