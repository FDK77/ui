import { Chats } from '@components/chats'
import { Messages } from '@components/messages'

export const AppLayout = () => {
  return (
    <div className='flex h-screen w-full bg-[black]'>
      <Chats />
      <Messages />
    </div>
  )
}
