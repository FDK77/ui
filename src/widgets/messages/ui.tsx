import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'

import { FilterWrapper } from './entities/filter-wrapper'
import { MessageContainer } from './entities/message-container'
import { MessageHeader } from './entities/message-header'
import { ModalUser } from './entities/modal-user'
import { ConfirmModal } from './features/confirm-modal'
import { DeleteMessages } from './features/delete-messages'
import { FilterList } from './features/filter-list'
import { MessageList } from './features/messages-list'
import { SendSettings } from './features/send-settings'
import {
  getSelectChatId,
  getSelectConfirmModalIsOpen,
  getSelectFilterId,
  getSelectSettingIsOpen,
  getSelectUserId
} from './selectors'

export const Messages = () => {
  const selectedChatId = useAppSelector(getSelectChatId)
  const selectedFilterId = useAppSelector(getSelectFilterId)
  const selectedUserId = useAppSelector(getSelectUserId)
  const selectedSettingIsOpen = useAppSelector(getSelectSettingIsOpen)
  const selectedConfirmModalIsOpen = useAppSelector(getSelectConfirmModalIsOpen)

  return (
    <div className='h-full w-full bg-[#212121]'>
      {selectedConfirmModalIsOpen && <ConfirmModal />}
      {selectedSettingIsOpen && <SendSettings />}
      {selectedUserId !== 0 && <ModalUser />}
      <MessageHeader />
      <FilterWrapper>
        {selectedChatId !== 0 && (
          <>
            <FilterList />
            <MessageContainer>
              {selectedFilterId && (
                <>
                  <DeleteMessages className='absolute top-5 right-10' />
                  <MessageList />
                </>
              )}
            </MessageContainer>
          </>
        )}
      </FilterWrapper>
    </div>
  )
}
