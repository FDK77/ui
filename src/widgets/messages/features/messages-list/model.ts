import { useEffect, useState } from 'react'

import { IMessage } from '@/shared/const/IMessage'

import { getMessages } from './api'

export const useMessages = (id: number | undefined) => {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof id !== 'number') {
      setMessages([])
      setLoading(false)
      return
    }

    const fetchMessages = async () => {
      try {
        setLoading(true)
        const messages = await getMessages(id)
        setMessages(messages)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [id])

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
    messages,
    loading,
    formatDateToRussian,
    extractTime
  }
}
