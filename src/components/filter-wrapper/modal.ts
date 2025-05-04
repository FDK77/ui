import { useEffect } from 'react'

import {
  getSelectChatId,
  getSelectFilterColor,
  getSelectFilterId,
  getSelectFilters
} from '@shared/redux/selectors'
import { selectFilter, setFilters } from '@shared/redux/slices/filterSlice'
import { Filter } from '@shared/type/filter'

import { useGetFilters } from '@api/hooks/useGetFilters'

import { useAppDispatch } from '@lib/hooks/useAppDispatch'
import { useAppSelector } from '@lib/hooks/useAppSelector'

export const useFilterWrapper = () => {
  const selectedChatId = useAppSelector(getSelectChatId)
  const selectedFilterId = useAppSelector(getSelectFilterId)
  const selectedFilterColor = useAppSelector(getSelectFilterColor)
  const filters = useAppSelector(getSelectFilters)
  const dispatch = useAppDispatch()

  const { dataFilters } = useGetFilters(selectedChatId ?? undefined)

  const handleSelectChat = (filter: Filter) => {
    dispatch(selectFilter(filter.id))
  }

  useEffect(() => {
    if (!dataFilters) return

    // сохраняем фильтры в Redux
    dispatch(setFilters(dataFilters))

    // выбираем первый фильтр по умолчанию
    if (dataFilters[0]) {
      dispatch(selectFilter(dataFilters[0].id))
    } else {
      dispatch(selectFilter(null))
    }
  }, [dataFilters, dispatch])

  return { selectedFilterId, selectedFilterColor, selectedChatId, filters, handleSelectChat }
}
