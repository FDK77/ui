// shared/redux/slices/modalSlice.ts
import { createSlice } from '@reduxjs/toolkit'

export const modalSettingsFiltersSlice = createSlice({
  name: 'modal',
  initialState: {
    isSendSettingsOpen: false
  },
  reducers: {
    openSettingsModal: state => {
      state.isSendSettingsOpen = true
    },
    closeSettingsModal: state => {
      state.isSendSettingsOpen = false
    }
  }
})

export const { openSettingsModal, closeSettingsModal } = modalSettingsFiltersSlice.actions
export default modalSettingsFiltersSlice.reducer
