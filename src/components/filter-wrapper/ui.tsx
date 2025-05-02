import { useEffect } from 'react'

import {
  getSelectChatFilters,
  getSelectFilterColor,
  getSelectFilterId
} from '@shared/redux/selectors'
import { selectFilter, unselectFilter } from '@shared/redux/slices'
import { Filter } from '@shared/type/filter'

import { useAppDispatch } from '@lib/hooks/useAppDispatch'
import { useAppSelector } from '@lib/hooks/useAppSelector'

import { Text } from '@ui/text'

export const FilterWrapper = ({ children }: { children: React.ReactNode }) => {
  const selectedChatFilters = useAppSelector(getSelectChatFilters)
  const selectedFilterId = useAppSelector(getSelectFilterId)
  const selectedFilterColor = useAppSelector(getSelectFilterColor)
  const dispatch = useAppDispatch()

  const handleSelectChat = (filter: Filter) => {
    dispatch(selectFilter(filter))
  }

  useEffect(() => {
    if (selectedChatFilters[0]) {
      dispatch(selectFilter(selectedChatFilters[0]))
    } else {
      dispatch(unselectFilter())
    }
  }, [selectedChatFilters])

  return (
    <div
      className='h-[calc(100vh-3.75rem)] w-full rounded-tl-xl bg-black p-2.5'
      style={{
        background: selectedFilterColor === '#000000' ? '#000000' : `${selectedFilterColor}1A`
      }}
    >
      <div className='flex space-x-1'>
        {selectedChatFilters.map(filter => (
          <div
            className={`flex min-w-24 cursor-default items-center justify-center gap-2 rounded-t-md px-2.5 py-1.5 text-white ${filter.id === selectedFilterId ? 'bg-[#161616]' : 'bg-[#161616c5]'}`}
            onClick={() => handleSelectChat(filter)}
          >
            <div
              className='h-3 w-3 rounded-full'
              style={{ backgroundColor: filter.color }}
            />
            <Text
              text={filter.name}
              opacity={!(filter.id === selectedFilterId)}
            />
          </div>
        ))}
      </div>

      <div
        className={`relative w-full bg-[#161616] p-5 ${selectedChatFilters.length === 0 ? 'flex h-full items-center justify-center rounded-md' : 'h-[calc(100vh-6.75rem)] rounded-tr-md rounded-b-md'}`}
      >
        {selectedChatFilters.length === 0 && (
          <div className='text-base font-bold text-white'>Добавите фильтр</div>
        )}
        {children}
      </div>
    </div>
  )
}
