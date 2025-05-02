import { IChat } from '@/shared/const/IChat'
import { Avatar } from '@/shared/ui/avatar'
import { Text } from '@/shared/ui/text'
import { Title } from '@/shared/ui/title'

import { GroupIcon } from './assets/group-icon'
import { MegaphoneIcon } from './assets/megaphone-icon'

interface ChatProps {
  data: IChat
  selected: boolean
  onClick?: () => void
}

export const Chat = ({ data, selected, onClick }: ChatProps) => {
  return (
    <div
      className={`flex w-full cursor-default rounded-md px-2 py-1 ${selected ? 'bg-[#766ac8]' : 'transition-colors hover:bg-[#675cad]'}`}
      onClick={onClick}
    >
      <Avatar
        path={data.avatar}
        name={data.title}
      />
      <div className='info ml-2.5 flex flex-col justify-between'>
        <div className='flex space-x-1'>
          {data.type === 'CHANNEL' ? <MegaphoneIcon /> : data.type === 'CHAT' && <GroupIcon />}
          <Title title={data.title} />
        </div>
        {/* {TODO: надо доделать на беке последнее сообщение} */}
        <Text
          text={data.lastMessage ? data.lastMessage : ''}
          opacity={!selected}
        />
      </div>
    </div>
  )
}
