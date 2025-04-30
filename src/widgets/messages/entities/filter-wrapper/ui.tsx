import { ReactNode } from 'react'

import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'

import { getColorFilter } from './selectors'

export const FilterWrapper = ({ children }: { children: ReactNode }) => {
  const color = useAppSelector(getColorFilter)

  return (
    <div
      className='h-[calc(100vh-3.75rem)] w-full rounded-tl-xl bg-black p-2.5'
      style={{ background: color === '#000000' ? '#000000' : `${color}1A` }}
    >
      {children}
    </div>
  )
}
