import { useLayoutEffect, useRef } from 'react'

import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'

import { Message } from '../../entities/message'
import { useMessages } from './model'
import { getSelectFilterId } from './selectors'

export const MessageList = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const id = useAppSelector(getSelectFilterId)

  const { messages, extractTime, formatDateToRussian } = useMessages(id)

  useLayoutEffect(() => {
    const container = containerRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, [messages])

  let lastDate: string | null = null

  return (
    <div
      ref={containerRef}
      className='h-full overflow-y-auto'
      style={{ scrollbarWidth: 'thin', scrollbarColor: '#3c3c3c transparent' }}
    >
      <div className='flex min-h-full flex-col justify-end space-y-5'>
        {messages.map(message => {
          const currentDate = formatDateToRussian(message.timestamp)
          const showDate = currentDate !== lastDate
          lastDate = currentDate

          return (
            <div key={message.id}>
              {showDate && (
                <div className='my-2 text-center text-sm text-white opacity-50'>{currentDate}</div>
              )}
              <Message
                data={message}
                time={extractTime(message.timestamp)}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
