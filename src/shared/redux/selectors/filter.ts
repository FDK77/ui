import { RootState } from '@/app/redux/store'

// Получить весь слайс фильтров
export const getSelectFilterState = (state: RootState) => state.filter

// Получить список всех фильтров
export const getSelectFilters = (state: RootState) => state.filter.filters

// Получить ID выбранного фильтра
export const getSelectFilterId = (state: RootState) => state.filter.selectedFilterId

// Получить активный фильтр (объект)
export const getSelectedFilter = (state: RootState) => {
  const { filters, selectedFilterId } = state.filter
  return filters.find(f => f.id === selectedFilterId) ?? null
}

// Получить отдельные поля активного фильтра
export const getSelectFilterName = (state: RootState) => getSelectedFilter(state)?.name ?? ''
export const getSelectFilterValue = (state: RootState) => getSelectedFilter(state)?.value ?? ''
export const getSelectFilterSummary = (state: RootState) =>
  getSelectedFilter(state)?.summary ?? false
export const getSelectFilterColor = (state: RootState) =>
  getSelectedFilter(state)?.color ?? '#000000'
export const areAllFiltersRead = (state: RootState): boolean => {
  return state.filter.filters.every(f => !f.unreadMessages)
}
