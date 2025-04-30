import { ChatList } from './features/chat-list'
import { Search } from './features/search'

export const Chats = () => {
  return (
    <div className='h-screen w-1/3 space-y-5 bg-[#212121] p-5'>
      <Search />
      <ChatList />
    </div>
  )
}
