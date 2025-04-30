import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'

import { getSelectUser } from './selectors'
import { unSelectUser } from './slice'

export const useModalUser = () => {
  const selectUser = useAppSelector(getSelectUser)
  const dispatch = useAppDispatch()

  const handelCloseModal = () => {
    dispatch(unSelectUser())
  }

  function formatPhoneNumber(phone: string): string {
    // Оставляем только цифры
    const digits = phone.replace(/\D/g, '')

    // Проверяем, что номер российский и из 11 цифр, начинается с 7
    if (digits.length === 11 && digits.startsWith('7')) {
      const country = '+7'
      const code = digits.slice(1, 4)
      const part1 = digits.slice(4, 7)
      const part2 = digits.slice(7, 9)
      const part3 = digits.slice(9, 11)
      return `${country} (${code}) ${part1}-${part2}-${part3}`
    }

    return 'Некорректный номер'
  }

  return {
    selectUser,
    formatPhoneNumber,
    handelCloseModal
  }
}
