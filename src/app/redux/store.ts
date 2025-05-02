import { configureStore } from '@reduxjs/toolkit'

// import { settingsModalSlice } from '@/widgets/messages/entities/message-header'
// import { modalUserSlice } from '@/widgets/messages/entities/modal-user/slice'
// import { confirmModalSlice } from '@/widgets/messages/features/confirm-modal/slice'

import { chatSlice, filterSlice, searchSlice } from '@shared/redux/slices'

export const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    chat: chatSlice.reducer,
    filter: filterSlice.reducer

    // settingsModal: settingsModalSlice.reducer,
    // modalUser: modalUserSlice.reducer,
    // confirmModal: confirmModalSlice.reducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
