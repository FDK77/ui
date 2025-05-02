import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  search: ''
}

export const searchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    selectSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    clearSearch: state => {
      state.search = ''
    }
  }
})

export const { selectSearch, clearSearch } = searchSlice.actions
export default searchSlice.reducer
