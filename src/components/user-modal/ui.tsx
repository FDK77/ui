import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Text } from '@/shared/ui/text'
import { Title } from '@/shared/ui/title'

import { CloseIcon } from './assets/close-icon'
import { InfoIcon } from './assets/info-icon'
import { useModalUser } from './modal'

export const ModalUser = () => {
  const { selectUser, formatPhoneNumber, handelCloseModal } = useModalUser()

  if (!selectUser) return null

  return (
    <div
      className='backdrop-blur-0 absolute top-0 left-0 z-100 flex h-full w-full items-center justify-center bg-black/20 transition-all duration-300 hover:backdrop-blur-lg'
      onClick={() => handelCloseModal()}
    >
      <div
        className='w-[340px] rounded-md bg-[#212121]'
        onClick={e => e.stopPropagation()}
      >
        <div className='p-5'>
          <div className='flex items-center justify-between'>
            <Title title='User Info' />
            <button
              onClick={() => handelCloseModal()}
              className='cursor-pointer'
            >
              <CloseIcon />
            </button>
          </div>
          <div className='mt-5 flex items-center gap-2.5'>
            <Avatar>
              <AvatarImage src={`http://localhost:8080/avatars/${selectUser.avatarPath}`} />
              <AvatarFallback>{selectUser.displayName}</AvatarFallback>
            </Avatar>

            <Title title={selectUser.displayName} />
          </div>
        </div>

        <div className='h-1 w-full bg-[#161616]'></div>

        <div className='grid grid-cols-[20px_minmax(100px,_1fr)] gap-2.5 p-5'>
          <div className=''>
            <InfoIcon />
          </div>
          {selectUser.phoneNumber && (
            <>
              <div className=''>
                <Text text={formatPhoneNumber(String(selectUser.phoneNumber))} />
                <Text
                  text='Mobile'
                  opacity
                />
              </div>
              <div className=''></div>
            </>
          )}
          <div className='flex flex-col'>
            <button
              onClick={() => navigator.clipboard.writeText(`@${selectUser.username}`)}
              className='w-min cursor-pointer text-sm text-[#675CAD]'
            >
              @{selectUser.username}
            </button>
            <Text
              text='Username'
              opacity
            />
          </div>
        </div>

        <div className='h-1 w-full bg-[#161616]'></div>

        <a
          href={`https://t.me/${selectUser.username}`}
          target='_blank'
          className='m-5 flex justify-center rounded-md bg-[#161616] p-2.5 text-base font-bold text-white'
        >
          Send message
        </a>
      </div>
    </div>
  )
}
