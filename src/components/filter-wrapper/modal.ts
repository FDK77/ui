import { useEffect } from 'react'

import { readChat } from '@/shared/redux/slices'
import { selectFilter, setFilters } from '@/shared/redux/slices/filtersSlice'
import { markFilterAsRead } from '@/shared/redux/slices/wsMessageSlice'

import {
  areAllFiltersRead,
  getSelectFilterColor,
  getSelectFilterId,
  getSelectFilters
} from '@shared/redux/selectors'
import { Filter } from '@shared/types/filter'

import { useGetFilters } from '@api/hooks/useGetFilters'

import { useAppDispatch } from '@lib/hooks/useAppDispatch'
import { useAppSelector } from '@lib/hooks/useAppSelector'

export const useFilterWrapper = (selectedChatId: number | null) => {
  const dispatch = useAppDispatch()

  const selectedFilterId = useAppSelector(getSelectFilterId)
  const selectedFilterColor = useAppSelector(getSelectFilterColor)
  const filters = useAppSelector(getSelectFilters)
  const allRead = useAppSelector(areAllFiltersRead)
  const { dataFilters } = useGetFilters(selectedChatId ?? undefined)

  const handleSelectChat = (filter: Filter) => {
    if (!selectedChatId) return
    dispatch(selectFilter(filter.id))
    dispatch(markFilterAsRead({ chatId: selectedChatId, filterId: filter.id }))
  }

  useEffect(() => {
    if (!selectedChatId) return

    if (allRead) {
      dispatch(readChat(selectedChatId))
    }
  }, [selectedFilterId])

  useEffect(() => {
    if (!selectedChatId || !dataFilters) return

    dispatch(setFilters(dataFilters))

    if (dataFilters[0]) {
      dispatch(selectFilter(dataFilters[0].id))
      dispatch(markFilterAsRead({ chatId: selectedChatId, filterId: dataFilters[0].id }))
    } else {
      dispatch(selectFilter(null))
    }
  }, [dataFilters, selectedChatId, dispatch])

  return {
    selectedFilterId: selectedFilterId ?? null,
    selectedFilterColor: selectedFilterColor ?? '#000000',
    filters: filters ?? [],
    handleSelectChat
  }
}
