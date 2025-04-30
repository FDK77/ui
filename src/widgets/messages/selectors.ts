import { RootState } from '@/app/redux/store'

export const getSelectChatId = (state: RootState) => state.chat.chatId
export const getSelectFilterId = (state: RootState) => state.filter.id
export const getSelectUserId = (state: RootState) => state.modalUser.userId
export const getSelectSettingIsOpen = (state: RootState) => state.settingsModal.isOpen
export const getSelectConfirmModalIsOpen = (state: RootState) => state.confirmModal.isOpen
