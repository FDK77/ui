import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'

import { Chats } from '@components/chats'
import { ModalSettingsFilter } from '@components/filter-wrapper/settings-modal'
import { Messages } from '@components/messages'

export const AppLayout = () => {
  const isOpenModalSettingsFilter = useAppSelector(
    state => state.modalSettingsFilters.isSendSettingsOpen
  )

  return (
    <div className='flex h-screen w-full bg-[black]'>
      {isOpenModalSettingsFilter && <ModalSettingsFilter />}
      <Chats />
      <Messages />
    </div>
  )
}
