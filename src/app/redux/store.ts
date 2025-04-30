import { configureStore } from '@reduxjs/toolkit'

import { chatSlice } from '@/widgets/chats/features/chat-list'
import { searchSlice } from '@/widgets/chats/features/search/slice'
import { settingsModalSlice } from '@/widgets/messages/entities/message-header'
import { modalUserSlice } from '@/widgets/messages/entities/modal-user/slice'
import { confirmModalSlice } from '@/widgets/messages/features/confirm-modal/slice'
import { filterSlice } from '@/widgets/messages/features/filter-list'

// import { settingMessageSlice } from './slices/settingMessageSlice'

export const store = configureStore({
  reducer: {
    chat: chatSlice.reducer,
    filter: filterSlice.reducer,
    search: searchSlice.reducer,
    settingsModal: settingsModalSlice.reducer,
    modalUser: modalUserSlice.reducer,
    confirmModal: confirmModalSlice.reducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
