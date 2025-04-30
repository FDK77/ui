import { useState } from 'react'

import { IMessage } from '@/shared/const/IMessage'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { Avatar } from '@/shared/ui/avatar'

import { selectUser } from '../modal-user/slice'
import { TailIcon } from './assets/tail-icon'

interface MessageProps {
  data: IMessage
  time: string
}

export const Message = ({ data, time }: MessageProps) => {
  const dispatch = useAppDispatch()
  const [showFullText, setShowFullText] = useState(false)

  const hasSummary = data.summary && data.summary.trim().length > 0

  const handleToggleText = () => setShowFullText(prev => !prev)

  return (
    <div className='flex items-end'>
      <div
        className='cursor-pointer'
        onClick={() => dispatch(selectUser(data.sender))}
      >
        <Avatar
          path={data.sender.avatarPath}
          name={data.sender.displayName}
        />
      </div>
      <div className='relative ml-1 max-w-xl rounded-t-md rounded-br-md bg-[#212121] p-2.5'>
        <TailIcon className='absolute bottom-0 -left-1.5' />
        <div className='flex flex-col gap-1 text-white'>
          {/* Summary и время */}
          <div className='flex items-end justify-between gap-2'>
            <p className='flex-1 text-sm leading-snug break-words'>
              {hasSummary ? data.summary : data.text}
            </p>
            <span className='text-xs whitespace-nowrap opacity-50'>{time}</span>
          </div>

          {/* Кнопка */}
          {hasSummary && (
            <button
              onClick={handleToggleText}
              className='cursor-pointer self-start text-xs text-[#766ac8] hover:underline focus:outline-none'
            >
              {showFullText ? 'Скрыть оригинал' : 'Показать оригинал'}
            </button>
          )}

          {/* Анимированный оригинальный текст */}
          {hasSummary && (
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                showFullText ? 'mt-1 max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className='text-sm leading-snug break-words text-gray-300'>{data.text}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
