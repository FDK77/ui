import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'

import { selectSearch } from './slice'

export const Search = () => {
  const dispatch = useAppDispatch()
  const search = useAppSelector(state => state.search.search)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(selectSearch(e.target.value))
  }

  return (
    <div className=''>
      <input
        type='text'
        className='w-full rounded-md bg-[#161616] p-2.5 text-white outline-0'
        placeholder='Поиск...'
        value={search}
        onChange={handleChange}
      />
    </div>
  )
}

//TODO: ДОбавить очистку
