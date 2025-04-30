import { useEffect } from 'react'

import { IFilter } from '@/shared/const/IFilter'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'

import { Filter } from '../../entities/filter'
import { getSelectChatFilters } from './selectors'
import { clearFilter, selectFilter } from './slice'

export const FilterList = () => {
  const dispatch = useAppDispatch()
  const { id } = useAppSelector(state => state.filter)
  const selectedChatFilters = useAppSelector(getSelectChatFilters)

  const handleSelectChat = (filter: IFilter) => {
    dispatch(selectFilter(filter))
  }

  useEffect(() => {
    if (selectedChatFilters[0]) {
      dispatch(selectFilter(selectedChatFilters[0]))
    } else {
      dispatch(clearFilter())
    }
  }, [selectedChatFilters, dispatch])

  return (
    <div className='flex space-x-1'>
      {selectedChatFilters.map(filter => (
        <Filter
          key={filter.id}
          data={filter}
          selected={filter.id === id}
          onClick={() => handleSelectChat(filter)}
        />
      ))}
    </div>
  )
}
