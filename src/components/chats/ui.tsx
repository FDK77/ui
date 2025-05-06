import { postSync } from '@/shared/api/requests'
import { ProcedureAvatar } from '@/shared/ui/avatar'

import { getSelectChatId } from '@shared/redux/selectors'
import { selectChat, selectSearch } from '@shared/redux/slices'
import { Chat } from '@shared/type/chat'

import { useGetChats } from '@api/hooks'

import { useAppDispatch } from '@lib/hooks/useAppDispatch'
import { useAppSelector } from '@lib/hooks/useAppSelector'

import { Text } from '@ui/text'
import { Title } from '@ui/title'

import { GroupIcon } from './assets/group-icon'
import { MegaphoneIcon } from './assets/megaphone-icon'
import { ReloadIcon } from './assets/reload-icon'

export const Chats = () => {
  const dispatch = useAppDispatch()
  const search = useAppSelector(state => state.search.search)
  const selectedChatId = useAppSelector(getSelectChatId)
  const chatUnread = useAppSelector(state => state.ws.unreadFilterIdsByChatId)
  const lastMessage = useAppSelector(state => state.ws.lastMessagesByChatId)

  const { dataChats } = useGetChats()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(selectSearch(e.target.value))
  }

  const handleSelectChat = (chat: Chat) => {
    dispatch(selectChat(chat))
  }

  const handleUpdateChats = async () => {
    await postSync()
  }

  return (
    <div className='h-screen w-1/3 space-y-5 bg-[#212121] p-5'>
      <div className='item-center flex space-x-5'>
        <input
          type='text'
          className='w-full rounded-md bg-[#161616] p-2.5 text-white outline-0'
          placeholder='Поиск...'
          value={search}
          onChange={handleChange}
        />
        <button
          className='cursor-pointer'
          onClick={handleUpdateChats}
        >
          <ReloadIcon />
        </button>
      </div>

      <div
        className='h-[calc(100vh-6.25rem)] space-y-2.5 overflow-y-auto pr-2'
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#3c3c3c transparent'
        }}
      >
        {dataChats
          .filter(chat => chat.title.toLowerCase().includes(search.toLowerCase()))
          .map(chat => (
            <div
              key={chat.chatId}
              className={`flex w-full cursor-default rounded-md px-2 py-1 ${chat.chatId === selectedChatId ? 'bg-[#766ac8]' : 'transition-colors hover:bg-[#675cad]'}`}
              onClick={() => handleSelectChat(chat)}
            >
              <ProcedureAvatar
                path={chat.avatar}
                name={chat.title}
              />

              <div className='info ml-2.5 flex w-full flex-col justify-between'>
                <div className='flex items-center justify-between'>
                  <div className='flex space-x-1'>
                    {chat.type === 'CHANNEL' ? (
                      <MegaphoneIcon />
                    ) : (
                      chat.type === 'CHAT' && <GroupIcon />
                    )}
                    <Title title={chat.title} />
                  </div>
                  {!!chatUnread[chat.chatId] && (
                    <div className='ml-auto h-2 w-2 rounded-full bg-white' />
                  )}
                </div>
                <Text
                  text={
                    lastMessage[chat.chatId]
                      ? lastMessage[chat.chatId]
                      : chat.lastMessage
                        ? chat.lastMessage
                        : ''
                  }
                  opacity={!(chat.chatId === selectedChatId)}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
