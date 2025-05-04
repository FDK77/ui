import { useEffect, useState } from 'react'

import { useSendFilters } from '@/shared/api/hooks/useSendFilters'
import { IFilter } from '@/shared/const/IFilter'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'
import { getSelectFilters } from '@/shared/redux/selectors/filter'
import { closeSettingsModal } from '@/shared/redux/slices'
import { setFilters } from '@/shared/redux/slices/filterSlice'
import { Filter } from '@/shared/type/filter'

import { getSelectChatId } from '@shared/redux/selectors'

export const useSendSettings = () => {
  const filters = useAppSelector(getSelectFilters)
  const chatId = useAppSelector(getSelectChatId)
  const dispatch = useAppDispatch()

  const { sendFilters } = useSendFilters()

  const [localFilters, setLocalFilters] = useState<Filter[]>(filters)
  const [nameOverLong, setNameOverLong] = useState(false)

  useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  const handleChange = (index: number, key: keyof IFilter, value: string | boolean) => {
    if (key === 'name' && typeof value === 'string' && value.length > 20) {
      setNameOverLong(true)
      return
    } else {
      setNameOverLong(false)
    }

    setLocalFilters(prev =>
      prev.map((filter, i) => (i === index ? { ...filter, [key]: value } : filter))
    )
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!chatId) {
      alert('Чат не выбран')
      return
    }

    const hasInvalid = localFilters.some(
      filter => !filter.name.trim() || !filter.value.toString().trim()
    )

    if (hasInvalid) {
      alert('Пожалуйста, заполните все поля имени и значения для фильтров.')
      return
    }

    dispatch(setFilters(localFilters)) // обновляем Redux-состояние
    sendFilters(chatId, localFilters)
    dispatch(closeSettingsModal())
  }

  const handleAddFilter = () => {
    setLocalFilters(prev => [...prev, { id: null, name: '', value: '', summary: false, color: '' }])
  }

  const handleDeleteFilter = (index: number) => {
    const filterName = localFilters[index]?.name || `фильтр #${index + 1}`

    //   dispatch(
    //     openConfirmModal({
    //       message: `Вы действительно хотите удалить "${filterName}"?`,
    // onConfirm: () =>
    setLocalFilters(prev => prev.filter((_, i) => i !== index))
    // })
    //   )
  }

  const handleClose = () => {
    dispatch(closeSettingsModal())
  }

  return {
    localFilters,
    nameOverLong,
    handleChange,
    handleSubmit,
    handleAddFilter,
    handleDeleteFilter,
    handleClose
  }
}
