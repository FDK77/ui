import { useState } from 'react'

import { Filter } from '@shared/types/filter'

import { postFilters } from '@api/requests'

export const useSendFilters = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)
  const [success, setSuccess] = useState(false)

  const sendFilters = async (chatId: number, filters: Filter[]) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      await postFilters(chatId, filters)
      setSuccess(true)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return {
    sendFilters,
    loading,
    error,
    success
  }
}
