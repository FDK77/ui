import { Chats } from '@widgets/chats'
import { Messages } from '@widgets/messages'

export const AppLayout = () => {
  return (
    <div className='flex h-screen w-full bg-[black]'>
      <Chats />
      <Messages />
    </div>
  )
}
