import { RootState } from '@/app/redux/store'

export const getSelectFilter = (state: RootState) => state.filter

export const getSelectFilterId = (state: RootState) => state.filter.id
export const getSelectFilterName = (state: RootState) => state.filter.name
export const getSelectFilterValue = (state: RootState) => state.filter.value
export const getSelectFilterSummary = (state: RootState) => state.filter.summary
export const getSelectFilterColor = (state: RootState) => state.filter.color
