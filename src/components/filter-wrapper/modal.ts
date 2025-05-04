import { useEffect } from 'react'

import { getSelectChatId, getSelectFilterColor, getSelectFilterId } from '@shared/redux/selectors'
import { selectFilter, unselectFilter } from '@shared/redux/slices'
import { Filter } from '@shared/type/filter'

import { useGetFilters } from '@api/hooks/useGetFilters'

import { useAppDispatch } from '@lib/hooks/useAppDispatch'
import { useAppSelector } from '@lib/hooks/useAppSelector'

export const useFilterWrapper = () => {
  const selectedChatId = useAppSelector(getSelectChatId)
  const selectedFilterId = useAppSelector(getSelectFilterId)
  const selectedFilterColor = useAppSelector(getSelectFilterColor)
  const dispatch = useAppDispatch()

  const { dataFilters } = useGetFilters(selectedChatId)

  const handleSelectChat = (filter: Filter) => {
    dispatch(selectFilter(filter))
  }

  useEffect(() => {
    if (dataFilters[0]) {
      dispatch(selectFilter(dataFilters[0]))
    } else {
      dispatch(unselectFilter())
    }
  }, [dataFilters])

  return { selectedFilterId, selectedFilterColor, dataFilters, handleSelectChat }
}
