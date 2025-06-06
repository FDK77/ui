import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { getSelectFilterId } from '@shared/redux/selectors'
import { openSettingsModal, selectUser } from '@shared/redux/slices'
import { Message } from '@shared/types/message'
import { User } from '@shared/types/user'

import { useDeleteMessages } from '@api/hooks/deleteMessages'
import { useGetMessages } from '@api/hooks/useGetMessages'

import { useAppDispatch } from '@lib/hooks/useAppDispatch'
import { useAppSelector } from '@lib/hooks/useAppSelector'
import { useConfirm } from '@lib/hooks/useConfirm'

export const useMessages = () => {
  const [dataMessages, setDataMessages] = useState<Message[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const { open: openConfirm } = useConfirm()
  const { removeMessages } = useDeleteMessages()
  const selectedFilterId = useAppSelector(getSelectFilterId)
  const dispatch = useAppDispatch()

  const lastMessages = useAppSelector(state => state.ws.lastMessagesByFilterId)
  const { dataMessages: initialMessages } = useGetMessages(selectedFilterId ?? undefined)

  useLayoutEffect(() => {
    if (selectedFilterId == null) {
      setDataMessages([]) // очищаем, если нет фильтра
    } else {
      setDataMessages([])
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

  const handleSettingsClick = () => dispatch(openSettingsModal())
  const handleUser = (user: User) => dispatch(selectUser(user))
  const handelDelete = (filterId: number) => {
    openConfirm('Вы действительно хотите удалить все сообщения?', async () => {
      setDataMessages([])
      await removeMessages(filterId)
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

    handleSettingsClick,
    selectedFilterId,
    containerRef,
    handleUser,
    handelDelete
  }
}
