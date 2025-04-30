import { ReactNode } from 'react'

export const MessageContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className='relative h-[calc(100vh-6.50rem)] w-full rounded-tr-md rounded-b-md bg-[#161616] p-5'>
      {children}
    </div>
  )
}
