import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Filter } from '@/shared/type/filter'

const initialState: Filter = {
  name: '',
  value: '',
  color: '#000000',
  summary: false
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    selectFilter: (state, action: PayloadAction<Filter>) => {
      return { ...state, ...action.payload }
    },
    unselectFilter: () => initialState
  }
})

export const { selectFilter, unselectFilter } = filterSlice.actions
export default filterSlice.reducer
