import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'
import { Avatar } from '@/shared/ui/avatar'
import { Title } from '@/shared/ui/title'

import { SettingsIcon } from './assets/settings-icon'
import { getSelectChatImage, getSelectChatTitle } from './selectors'
import { openModal } from './slice'

export const MessageHeader = () => {
  const dispatch = useAppDispatch()
  const selectedChatTitle = useAppSelector(getSelectChatTitle)
  const selectedChatImage = useAppSelector(getSelectChatImage)

  const handleSettingsClick = () => {
    dispatch(openModal())
  }
  return (
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
          <div
            className='absolute right-5 flex h-5 w-5 cursor-pointer items-center justify-center'
            onClick={handleSettingsClick}
          >
            <SettingsIcon />
          </div>
        </>
      )}
    </div>
  )
}
