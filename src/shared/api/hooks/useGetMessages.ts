import { useEffect, useState } from 'react'

import { Message } from '@shared/type/message'

import { getMessages } from '@api/requests'

export const useGetMessages = (filterId: number) => {
  const [dataMessage, setDataMessage] = useState<Message[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    getMessages(filterId)
      .then(res => setDataMessage(res.data))
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return { dataMessage, loading, error }
}
