import { useLayoutEffect, useRef, useState } from 'react'

import { FilterWrapper } from '@components/filter-wrapper'

import { getSelectChatAvatar, getSelectChatTitle, getSelectFilterId } from '@shared/redux/selectors'
import { selectUser } from '@shared/redux/slices/userSlice'

import { useGetMessages } from '@api/hooks/useGetMessages'

import { useAppDispatch } from '@lib/hooks/useAppDispatch'
import { useAppSelector } from '@lib/hooks/useAppSelector'

import { Avatar } from '@ui/avatar'
import { Title } from '@ui/title'

import { TailIcon } from './assets/tail-icon'

export const Messages = () => {
  const [showFullText, setShowFullText] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null) //для проматывания скролла вниз

  const selectedChatTitle = useAppSelector(getSelectChatTitle)
  const selectedChatImage = useAppSelector(getSelectChatAvatar)
  const selectedFilterId = useAppSelector(getSelectFilterId)
  const dispatch = useAppDispatch()

  const { dataMessages } = useGetMessages(selectedFilterId === undefined ? -1 : selectedFilterId) //TODO: Пересмотреть

  useLayoutEffect(() => {
    const container = containerRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, [dataMessages])

  const handleToggleText = () => setShowFullText(prev => !prev)

  return (
    <div className='h-full w-full bg-[#212121]'>
      <div className='relative flex h-15 w-full items-center justify-center bg-[#212121]'>
        {selectedChatTitle && (
          <>
            <Avatar
              path={selectedChatImage}
              name={selectedChatTitle}
            />
            <Title
              title={selectedChatTitle}
              className='ml-2.5'
            />
            {/* <div
              className='absolute right-5 flex h-5 w-5 cursor-pointer items-center justify-center'
              onClick={handleSettingsClick}
            >
              <SettingsIcon />
            </div> */}
          </>
        )}
      </div>

      <FilterWrapper>
        <div
          ref={containerRef}
          className='h-full overflow-y-auto'
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#3c3c3c transparent' }}
        >
          <div className='flex min-h-full flex-col justify-end space-y-5'>
            {dataMessages.map(message => (
              <div
                className='flex items-end'
                key={message.id}
              >
                <div
                  className='cursor-pointer'
                  onClick={() => dispatch(selectUser(message.sender))}
                >
                  <Avatar
                    path={message.sender.avatarPath}
                    name={message.sender.displayName}
                  />
                </div>
                <div className='relative ml-1 max-w-xl rounded-t-md rounded-br-md bg-[#212121] p-2.5'>
                  <TailIcon className='absolute bottom-0 -left-1.5' />
                  <div className='flex flex-col gap-1 text-white'>
                    {/* Summary и время */}
                    <div className='flex items-end justify-between gap-2'>
                      <p className='flex-1 text-sm leading-snug break-words'>
                        {message.summary ? message.summary : message.text}
                      </p>
                      <span className='text-xs whitespace-nowrap opacity-50'>{123}</span>
                    </div>

                    {/* Кнопка */}
                    {message.summary && (
                      <button
                        onClick={handleToggleText}
                        className='cursor-pointer self-start text-xs text-[#766ac8] hover:underline focus:outline-none'
                      >
                        {showFullText ? 'Скрыть оригинал' : 'Показать оригинал'}
                      </button>
                    )}

                    {/* Анимированный оригинальный текст */}
                    {message.summary && (
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          showFullText ? 'mt-1 max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <p className='text-sm leading-snug break-words text-gray-300'>
                          {message.text}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FilterWrapper>
    </div>
  )
}
