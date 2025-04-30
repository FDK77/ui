import { useEffect, useState } from 'react'

import { IChat } from '@/shared/const/IChat'

import { getChats } from './api'

export const useChats = () => {
  const [chats, setChats] = useState<IChat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchChats() {
      try {
        setLoading(true)
        const chatsResponse = await getChats()
        if (Array.isArray(chatsResponse)) {
          setChats(chatsResponse)
        } else {
          throw new Error('Chats data is not an array')
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('An unknown error occurred')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchChats()
  }, [])

  return {
    chats,
    loading,
    error
  }
}
