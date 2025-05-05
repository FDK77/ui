import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { closeConfirmModal, openConfirmModal } from '@/shared/redux/slices'

import { setOnConfirm } from './confirmCallbackStore'

export const useConfirm = () => {
  const dispatch = useAppDispatch()

  const open = (message: string, onConfirm: () => void) => {
    setOnConfirm(onConfirm)
    dispatch(openConfirmModal({ message }))
  }

  const cancel = () => {
    dispatch(closeConfirmModal())
  }

  return { open, cancel }
}
