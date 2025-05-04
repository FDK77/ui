import { useEffect, useState } from 'react'

import { Filter } from '@shared/type/filter'

import { getFilters } from '@api/requests'

export const useGetFilters = (chatId?: number | null) => {
  const [dataFilters, setDataFilters] = useState<Filter[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    if (chatId == null) return

    setLoading(true)
    getFilters(chatId)
      .then(res => setDataFilters(res.data))
      .catch(setError)
      .finally(() => setLoading(false))
  }, [chatId])

  return { dataFilters, loading, error }
}
