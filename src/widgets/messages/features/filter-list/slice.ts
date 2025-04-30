import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IFilter } from '@/shared/const/IFilter'

const initialState: IFilter = {
  name: '',
  value: '',
  color: '#000000',
  summary: false
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    selectFilter: (state, action: PayloadAction<IFilter>) => {
      return { ...state, ...action.payload }
    },
    clearFilter: () => initialState
  }
})

export const { selectFilter, clearFilter } = filterSlice.actions
export default filterSlice.reducer
