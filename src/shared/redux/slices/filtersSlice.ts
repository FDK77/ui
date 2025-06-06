import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Filter } from '@shared/types/filter'

interface FilterState {
  filters: Filter[]
  selectedFilterId: number | null
}

const initialState: FilterState = {
  filters: [],
  selectedFilterId: null
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Filter[]>) {
      state.filters = action.payload
    },
    selectFilter(state, action: PayloadAction<number | null>) {
      state.selectedFilterId = action.payload
      const filter = state.filters.find(c => c.id === action.payload)
      if (filter) filter.unreadMessages = false
    },
    updateFilter(state, action: PayloadAction<Filter>) {
      const idx = state.filters.findIndex(f => f.id === action.payload.id)
      if (idx !== -1) {
        state.filters[idx] = action.payload
      }
    },
    addFilter(state, action: PayloadAction<Filter>) {
      state.filters.push(action.payload)
    },
    removeFilter(state, action: PayloadAction<number>) {
      state.filters = state.filters.filter(f => f.id !== action.payload)
    }
  }
})

export const { setFilters, selectFilter, updateFilter, addFilter, removeFilter } =
  filterSlice.actions

export default filterSlice.reducer
