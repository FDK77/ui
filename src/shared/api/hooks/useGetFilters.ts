import { useEffect, useState } from 'react'

import { Filter } from '@shared/type/filter'

import { getFilters } from '@api/requests'

export const useGetFilters = (chatId: number) => {
  const [dataFilters, setDataFilters] = useState<Filter[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    getFilters(chatId)
      .then(res => setDataFilters(res.data))
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return { dataFilters, loading, error }
}
