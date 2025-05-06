import { useEffect, useState } from 'react'

import { Message } from '@shared/types/message'

import { getMessages } from '@api/requests'

export const useGetMessages = (filterId: number | undefined) => {
  const [dataMessages, setDataMessage] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    if (filterId == null) return

    getMessages(filterId)
      .then(res => setDataMessage(res.data))
      .catch(setError)
      .finally(() => setLoading(false))
  }, [filterId])

  return { dataMessages, loading, error }
}
