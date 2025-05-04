import { useLayoutEffect, useRef, useState } from 'react'

import { useDeleteMessages } from '@/shared/api/hooks/deleteMessages'
import { User } from '@/shared/type/user'

import { useAppSelector } from '@shared/lib/hooks/useAppSelector'
import { getSelectChatAvatar, getSelectChatTitle, getSelectFilterId } from '@shared/redux/selectors'
import { openSettingsModal, selectUser } from '@shared/redux/slices'

import { useGetMessages } from '@api/hooks/useGetMessages'

import { useAppDispatch } from '@lib/hooks/useAppDispatch'

export const useMessages = () => {
  const [showFullText, setShowFullText] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null) //для проматывания скролла вниз
  const { removeMessages } = useDeleteMessages()

  const selectedChatTitle = useAppSelector(getSelectChatTitle)
  const selectedChatImage = useAppSelector(getSelectChatAvatar)
  const selectedFilterId = useAppSelector(getSelectFilterId)
  const dispatch = useAppDispatch()

  const { dataMessages } = useGetMessages(selectedFilterId ?? undefined) //TODO: Пересмотреть

  useLayoutEffect(() => {
    const container = containerRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, [dataMessages])

  const handleToggleText = () => setShowFullText(prev => !prev)

  const handleSettingsClick = () => {
    dispatch(openSettingsModal())
  }
  const handleUser = (user: User) => {
    dispatch(selectUser(user))
  }

  const deleteMessage = (filterId: number) => {
    removeMessages(filterId)
  }

  const handelDelete = (filterId: number) => {
    deleteMessage(filterId)
  }

  function formatDateToRussian(timestamp: string): string {
    const months = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря'
    ]

    // Преобразуем в ISO-совместимый формат и указываем что это UTC
    const utcString = timestamp.replace(' ', 'T') + 'Z'
    const date = new Date(utcString)

    const day = date.getDate()
    const month = months[date.getMonth()]

    return `${day} ${month}`
  }

  function extractTime(timestamp: string): string {
    // Преобразуем строку вида 'YYYY-MM-DD HH:mm' в ISO-совместимую строку
    const utcString = timestamp.replace(' ', 'T') + 'Z' // Добавляем 'Z' — указание на UTC

    const date = new Date(utcString)

    // Получаем локальное время (часы и минуты)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return {
    dataMessages,
    formatDateToRussian,
    extractTime,
    showFullText,
    handleToggleText,
    handleSettingsClick,
    selectedChatTitle,
    selectedChatImage,
    selectedFilterId,
    containerRef,
    handleUser,
    handelDelete
  }
}
