import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { getSelectChatAvatar, getSelectChatTitle, getSelectFilterId } from '@shared/redux/selectors'
import { openSettingsModal, selectUser } from '@shared/redux/slices'
import { Message } from '@shared/type/message'
import { User } from '@shared/type/user'

import { useDeleteMessages } from '@api/hooks/deleteMessages'
import { useGetMessages } from '@api/hooks/useGetMessages'

import { useAppDispatch } from '@lib/hooks/useAppDispatch'
import { useAppSelector } from '@lib/hooks/useAppSelector'
import { useConfirm } from '@lib/hooks/useConfirm'

export const useMessages = () => {
  const [showFullText, setShowFullText] = useState(false)
  const [dataMessages, setDataMessages] = useState<Message[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const { open: openConfirm } = useConfirm()
  const { removeMessages } = useDeleteMessages()
  const selectedChatTitle = useAppSelector(getSelectChatTitle)
  const selectedChatImage = useAppSelector(getSelectChatAvatar)
  const selectedFilterId = useAppSelector(getSelectFilterId)
  const dispatch = useAppDispatch()

  const lastMessages = useAppSelector(state => state.ws.lastMessagesByFilterId)
  const { dataMessages: initialMessages } = useGetMessages(selectedFilterId ?? undefined)

  useLayoutEffect(() => {
    if (selectedFilterId == null) {
      setDataMessages([]) // очищаем, если нет фильтра
    } else {
      setDataMessages(initialMessages) // устанавливаем сообщения
    }
  }, [initialMessages, selectedFilterId])

  // Добавляем новое сообщение из WebSocket
  useEffect(() => {
    const incoming = lastMessages[selectedFilterId ?? -1]

    if (incoming && incoming.filterId === selectedFilterId) {
      setDataMessages(prev => {
        // предотвращаем дублирование по id
        if (prev.some(msg => msg.id === incoming.id)) return prev
        return [...prev, incoming]
      })
    }
  }, [lastMessages, selectedFilterId])

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
  const handelDelete = (filterId: number) => {
    openConfirm('Вы действительно хотите удалить все сообщения?', async () => {
      await removeMessages(filterId)
      setDataMessages([])
    })
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
