import { ConfirmModal } from '@/components/confirm-modal/ui'
import { ModalUser } from '@/components/user-modal'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'

import { Chats } from '@components/chats'
import { ModalSettingsFilter } from '@components/filter-wrapper/settings-modal'
import { Messages } from '@components/messages'

export const AppLayout = () => {
  const isOpenModalSettingsFilter = useAppSelector(
    state => state.modalSettingsFilters.isSendSettingsOpen
  )
  const isOpenModalConfirm = useAppSelector(state => state.confirmModal.isOpen)
  const isUserOpen = useAppSelector(state => state.user.isOpen)

  return (
    <div className='flex h-screen w-full bg-[black]'>
      {isOpenModalSettingsFilter && <ModalSettingsFilter />}
      {isOpenModalConfirm && <ConfirmModal />}
      {isUserOpen && <ModalUser />}
      <Chats />
      <Messages />
    </div>
  )
}
