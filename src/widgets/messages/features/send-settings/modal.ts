import { useEffect, useState } from 'react'

import axiosInit from '@/shared/api/axiosInit'
import { IFilter } from '@/shared/const/IFilter'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'

import { closeModal } from '../../entities/message-header'
import { openConfirmModal } from '../confirm-modal/slice'
import { getChatId, getSelectFilters } from './selectors'

export const useSendSettings = () => {
  const filters = useAppSelector(getSelectFilters)
  const chatId = useAppSelector(getChatId)
  const dispatch = useAppDispatch()

  const [localFilters, setLocalFilters] = useState<IFilter[]>(filters)
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

    // Валидация: ни одно имя или значение не должно быть пустым
    const hasInvalid = localFilters.some(
      filter => !filter.name.trim() || !filter.value.toString().trim()
    )

    if (hasInvalid) {
      alert('Пожалуйста, заполните все поля имени и значения для фильтров.')
      return
    }

    try {
      await axiosInit.post('/chats/settings', { chatId: chatId, filters: localFilters })
      dispatch(closeModal())
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddFilter = () => {
    setLocalFilters(prev => [...prev, { name: '', value: '', summary: false, color: '' }])
  }

  const handleDeleteFilter = (index: number) => {
    dispatch(
      openConfirmModal({
        message: `Вы действительно хотите удалить ${filters[index]?.name}?`,
        onConfirm: () => setLocalFilters(prev => prev.filter((_, i) => i !== index))
      })
    )
  }

  const handleClose = () => {
    dispatch(closeModal())
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
