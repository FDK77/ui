import { useEffect, useState } from 'react'

import { useSendFilters } from '@/shared/api/hooks/useSendFilters'
import { getFilters } from '@/shared/api/requests'
import { IFilter } from '@/shared/const/IFilter'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'
import { useConfirm } from '@/shared/lib/hooks/useConfirm'
import { getSelectFilters } from '@/shared/redux/selectors/filter'
import { closeSettingsModal } from '@/shared/redux/slices'
import { setFilters } from '@/shared/redux/slices/filtersSlice'
import { Filter } from '@/shared/types/filter'

export const useSendSettings = () => {
  const filters = useAppSelector(getSelectFilters)
  const chatId = useAppSelector(state => state.chatList.selectedChatId)
  const dispatch = useAppDispatch()

  const { sendFilters } = useSendFilters()
  const { open: openConfirm } = useConfirm()

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

    const hasInvalid = localFilters.some(
      filter => !filter.name.trim() || !filter.value.toString().trim()
    )

    if (hasInvalid) {
      alert('Пожалуйста, заполните все поля имени и значения для фильтров.')
      return
    }

    const normalizedFilters = localFilters.map(filter => ({
      ...filter,
      id: filter.id === 0 ? null : filter.id
    }))

    await sendFilters(chatId, normalizedFilters)
    const response = await getFilters(chatId)
    dispatch(setFilters(response.data))
    dispatch(closeSettingsModal())
  }

  const handleAddFilter = () => {
    setLocalFilters(prev => [
      ...prev,
      { id: 0, name: '', value: '', summary: false, color: '', unreadMessages: false }
    ])
  }

  const handleDeleteFilter = (index: number) => {
    const filterName = localFilters[index]?.name || `фильтр #${index + 1}`

    openConfirm(`Вы действительно хотите удалить "${filterName}"?`, () =>
      setLocalFilters(prev => prev.filter((_, i) => i !== index))
    )
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
