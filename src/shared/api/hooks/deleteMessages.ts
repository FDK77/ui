import { useState } from 'react'

import { deleteMesseges } from '@/shared/api/requests/messages/filter'

// укажи правильный путь, если отличается

export const useDeleteMessages = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)
  const [success, setSuccess] = useState(false)

  const removeMessages = async (filterId: number) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      await deleteMesseges(filterId)
      setSuccess(true)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return {
    removeMessages,
    loading,
    error,
    success
  }
}
