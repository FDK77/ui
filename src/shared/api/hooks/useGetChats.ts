import { useEffect, useState } from 'react'

import { Chat } from '@shared/type/chat'

import { getChats } from '@api/requests'

export const useGetChats = () => {
  const [dataChats, setDataChats] = useState<Chat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    getChats()
      .then(res => setDataChats(res.data))
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return { dataChats, loading, error }
}
