import axiosInit from '@/shared/api/axiosInit'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'

import { openConfirmModal } from '../confirm-modal/slice'
import { DeleteIcon } from './assets/delete-icon'
import { getSelectFilters } from './selectors'

interface DeleteMessagesProps {
  className?: string
}

export const DeleteMessages = ({ className }: DeleteMessagesProps) => {
  const selectFilterId = useAppSelector(getSelectFilters)
  const dispatch = useAppDispatch()

  const deleteMessage = async () => {
    try {
      await axiosInit.delete(`/messages/filter/${selectFilterId}`)
    } catch (error) {
      console.log(error)
    }
  }

  const handelDelete = () => {
    dispatch(
      openConfirmModal({
        message: 'Вы действительно хотите удалить все сообщения?',
        onConfirm: () => deleteMessage()
      })
    )
  }
  return (
    <button
      className={`cursor-pointer ${className}`}
      onClick={() => handelDelete()}
    >
      <DeleteIcon />
    </button>
  )
}
