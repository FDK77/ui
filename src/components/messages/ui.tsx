import { useState } from 'react'

import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'
import { Message } from '@/shared/types/message'
import { ProcedureAvatar } from '@/shared/ui/avatar'

import { FilterWrapper } from '@components/filter-wrapper'

import { Chat } from '@shared/types/chat'

import { Title } from '@ui/title'

import { DeleteIcon } from './assets/delete-icon'
import { SettingsIcon } from './assets/settings-icon'
import { TailIcon } from './assets/tail-icon'
import { useMessages } from './model'

export const Messages = () => {
  const selectedChat = useAppSelector(state =>
    state.chatList.list.find(chat => chat.chatId === state.chatList.selectedChatId)
  )

  const {
    selectedFilterId,
    handleSettingsClick,
    containerRef,
    dataMessages,
    handleUser,
    formatDateToRussian,
    extractTime,
    handelDelete
  } = useMessages()

  let lastDate: string | null = null

  return (
    <div className='h-full w-full bg-[#212121]'>
      <div className='relative flex h-15 w-full items-center justify-center bg-[#212121]'>
        {selectedChat && (
          <MessageHeader
            chat={selectedChat}
            handleSettingsClick={handleSettingsClick}
          />
        )}
      </div>

      <FilterWrapper>
        <div
          ref={containerRef}
          className='h-full overflow-y-auto'
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#3c3c3c transparent' }}
        >
          {selectedFilterId && (
            <button
              className='absolute top-5 right-5 cursor-pointer'
              onClick={() => handelDelete(selectedFilterId)}
            >
              <DeleteIcon />
            </button>
          )}

          <div className='flex min-h-full flex-col justify-end space-y-5'>
            {dataMessages.map(message => {
              const currentDate = formatDateToRussian(message.timestamp)
              const showDate = currentDate !== lastDate
              lastDate = currentDate

              return (
                <div key={message.id}>
                  {showDate && (
                    <div className='my-2 text-center text-sm text-white opacity-50'>
                      {currentDate}
                    </div>
                  )}
                  <MessageItem
                    message={message}
                    extractTime={extractTime}
                    handleUser={handleUser}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </FilterWrapper>
    </div>
  )
}

const MessageHeader = ({
  chat,
  handleSettingsClick
}: {
  chat: Chat
  handleSettingsClick: () => void
}) => {
  return (
    <>
      <ProcedureAvatar
        path={chat.avatar}
        name={chat.title}
      />
      <Title
        title={chat.title}
        className='ml-2.5'
      />
      <div
        className='absolute right-5 flex h-5 w-5 cursor-pointer items-center justify-center'
        onClick={handleSettingsClick}
      >
        <SettingsIcon />
      </div>
    </>
  )
}

const MessageItem = ({
  message,
  extractTime,
  handleUser
}: {
  message: Message
  extractTime: (t: string) => string
  handleUser: (user: Message['sender']) => void
}) => {
  const [showFullText, setShowFullText] = useState(false)
  const handleToggleText = () => setShowFullText(prev => !prev)
  return (
    <div className='flex items-end'>
      <div
        className='cursor-pointer'
        onClick={() => handleUser(message.sender)}
      >
        <ProcedureAvatar
          path={message.sender.avatarPath}
          name={message.sender.displayName}
        />
      </div>
      <div className='relative ml-1 max-w-xl rounded-t-md rounded-br-md bg-[#212121] p-2.5'>
        <TailIcon className='absolute bottom-0 -left-1.5' />
        <div className='flex flex-col gap-1 text-white'>
          <div className='flex items-end justify-between gap-2'>
            <p className='flex-1 text-sm leading-snug break-words'>
              {message.summary ? message.summary : message.text}
            </p>
            <span className='text-xs whitespace-nowrap opacity-50'>
              {extractTime(message.timestamp)}
            </span>
          </div>

          {message.summary && (
            <button
              onClick={handleToggleText}
              className='cursor-pointer self-start text-xs text-[#766ac8] hover:underline focus:outline-none'
            >
              {showFullText ? 'Скрыть оригинал' : 'Показать оригинал'}
            </button>
          )}

          {message.summary && (
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                showFullText ? 'mt-1 max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className='text-sm leading-snug break-words text-gray-300'>{message.text}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
