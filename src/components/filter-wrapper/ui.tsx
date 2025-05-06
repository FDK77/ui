import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'

import { Text } from '@ui/text'
import { Title } from '@ui/title'

import { useFilterWrapper } from './modal'

export const FilterWrapper = ({ children }: { children: React.ReactNode }) => {
  const selectedChatId = useAppSelector(state => state.chatList.selectedChatId)

  const filterData = useFilterWrapper(selectedChatId)

  const unreadByChat = useAppSelector(state => state.ws.unreadFilterIdsByChatId)

  if (!selectedChatId || !filterData) {
    return <FilterWrapperClear />
  }

  const { filters, selectedFilterColor, handleSelectChat, selectedFilterId } = filterData
  return (
    <div
      className='h-[calc(100vh-3.75rem)] w-full rounded-tl-xl bg-black p-2.5'
      style={{
        background: selectedFilterColor === '#000000' ? '#000000' : `${selectedFilterColor}1A`
      }}
    >
      <div className='flex space-x-1'>
        {filters.map(filter => (
          <div
            key={filter.id}
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
            {(filter.ureadMessages || unreadByChat[selectedChatId]?.includes(filter.id)) && (
              <div className='ml-auto h-2 w-2 rounded-full bg-white' />
            )}
          </div>
        ))}
      </div>

      <div
        className={`relative w-full bg-[#161616] p-5 ${filters.length === 0 ? 'flex h-full items-center justify-center rounded-md' : 'h-[calc(100vh-6.75rem)] rounded-tr-md rounded-b-md'}`}
      >
        {selectedChatId !== null && filters.length === 0 && (
          <div className='text-base font-bold text-white'>
            Вы ещё не добавили фильтры этому чату
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

const FilterWrapperClear = () => {
  return (
    <div className='h-[calc(100vh-3.75rem)] w-full rounded-tl-xl bg-black p-2.5'>
      <div className='relative flex h-full w-full items-center justify-center rounded-md bg-[#161616] p-5'>
        <Title title='Выберите чат' />
      </div>
    </div>
  )
}
