import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { useDeleteMessages } from '@/shared/api/hooks/deleteMessages'
import { markChatAsRead } from '@/shared/redux/slices/wsMessageSlice'
import { Message } from '@/shared/type/message'
import { User } from '@/shared/type/user'

import { useAppSelector } from '@shared/lib/hooks/useAppSelector'
import { getSelectChatAvatar, getSelectChatTitle, getSelectFilterId } from '@shared/redux/selectors'
import { openSettingsModal, selectUser } from '@shared/redux/slices'

import { useGetMessages } from '@api/hooks/useGetMessages'

import { useAppDispatch } from '@lib/hooks/useAppDispatch'

export const useMessages = () => {
  const [showFullText, setShowFullText] = useState(false)
  const [dataMessages, setDataMessages] = useState<Message[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const { removeMessages } = useDeleteMessages()
  const selectedChatTitle = useAppSelector(getSelectChatTitle)
  const selectedChatImage = useAppSelector(getSelectChatAvatar)
  const selectedFilterId = useAppSelector(getSelectFilterId)
  const dispatch = useAppDispatch()

  const lastMessages = useAppSelector(state => state.ws.lastMessagesByFilterId)
  const { dataMessages: initialMessages } = useGetMessages(selectedFilterId ?? undefined)

  useEffect(() => {
    if (selectedFilterId == null) {
      setDataMessages([]) // очищаем, если нет фильтра
    } else {
      setDataMessages(initialMessages) // устанавливаем сообщения
    }
  }, [initialMessages, selectedFilterId])

  // Добавляем новое сообщение из WebSocket
  useEffect(() => {
    const incoming = lastMessages[selectedFilterId ?? -1]
    if (incoming) {
      setDataMessages(prev => [...prev, incoming])
      dispatch(markChatAsRead(incoming.chatId))
    }
  }, [lastMessages, selectedFilterId, dispatch])

  // Scroll to bottom при изменении сообщений
  useLayoutEffect(() => {
    const container = containerRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, [dataMessages])

  const handleToggleText = () => setShowFullText(prev => !prev)
  const handleSettingsClick = () => dispatch(openSettingsModal())
  const handleUser = (user: User) => dispatch(selectUser(user))
  const handelDelete = (filterId: number) => removeMessages(filterId)

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
    const utcString = timestamp.replace(' ', 'T') + 'Z'
    const date = new Date(utcString)
    return `${date.getDate()} ${months[date.getMonth()]}`
  }

  function extractTime(timestamp: string): string {
    const utcString = timestamp.replace(' ', 'T') + 'Z'
    const date = new Date(utcString)
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
