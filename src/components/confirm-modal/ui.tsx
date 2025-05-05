import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'
import { resetOnConfirm, runOnConfirm } from '@/shared/lib/hooks/useConfirm/confirmCallbackStore'
import { closeConfirmModal } from '@/shared/redux/slices'
import { Text } from '@/shared/ui/text'

export const ConfirmModal = () => {
  const dispatch = useAppDispatch()
  const { message } = useAppSelector(state => state.confirmModal)

  const handleYes = () => {
    runOnConfirm()
    dispatch(closeConfirmModal())
  }

  const handleNo = () => {
    resetOnConfirm()
    dispatch(closeConfirmModal())
  }

  return (
    <div
      className='backdrop-blur-0 absolute top-0 left-0 z-120 flex h-full w-full items-center justify-center bg-black/20 transition-all duration-300 hover:backdrop-blur-lg'
      onClick={handleNo}
    >
      <div
        className='rounded-md bg-[#212121] p-5'
        onClick={e => e.stopPropagation()}
      >
        <Text text={message} />
        <div className='mt-10 grid grid-cols-2 gap-2.5'>
          <button
            className='rounded-md bg-[#161616] py-2.5 text-base font-bold text-white'
            onClick={handleNo}
          >
            Нет
          </button>
          <button
            className='rounded-md bg-[#161616] py-2.5 text-base font-bold text-white'
            onClick={handleYes}
          >
            Да
          </button>
        </div>
      </div>
    </div>
  )
}
