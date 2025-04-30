import { IChat } from '@/shared/const/IChat'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'

import { Chat } from '../../entities/chat'
import { useChats } from './model'
import { selectChat } from './slice'

export const ChatList = () => {
  const dispatch = useAppDispatch()
  const { chatId } = useAppSelector(state => state.chat)

  const { chats, loading, error } = useChats()

  const handleSelectChat = (chat: IChat) => {
    dispatch(selectChat(chat))
  }

  const { search } = useAppSelector(state => state.search)

  if (loading) {
    return (
      <div className='flex h-full items-center justify-center'>
        <span>Loading...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex h-full items-center justify-center'>
        <span>Error: {error}</span>
      </div>
    )
  }

  return (
    <div
      className='h-[calc(100vh-6.25rem)] space-y-2.5 overflow-y-auto pr-2'
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#3c3c3c transparent'
      }}
    >
      {chats
        .filter(chat => chat.title.toLowerCase().includes(search.toLowerCase()))
        .map(chat => (
          <Chat
            key={chat.chatId}
            data={chat}
            selected={chat.chatId === chatId}
            onClick={() => handleSelectChat(chat)}
          />
        ))}
    </div>
  )
}

//TODO: добавить надпись ничего не нашли
