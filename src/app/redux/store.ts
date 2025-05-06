import { configureStore } from '@reduxjs/toolkit'

import { userSlice } from '@/shared/redux/slices/userSlice'
import wsMessageSlice from '@/shared/redux/slices/wsMessageSlice'

import {
  chatListSlice,
  confirmModalSlice,
  filterSlice,
  modalSettingsFiltersSlice,
  searchSlice
} from '@shared/redux/slices'

export const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    chatList: chatListSlice.reducer,
    filter: filterSlice.reducer,
    user: userSlice.reducer,
    modalSettingsFilters: modalSettingsFiltersSlice.reducer,
    ws: wsMessageSlice,
    confirmModal: confirmModalSlice.reducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
