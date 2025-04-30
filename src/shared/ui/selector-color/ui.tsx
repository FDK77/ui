import { useEffect, useRef, useState } from 'react'

import { colors } from '@/shared/data/colors'

interface ColorSelectProps {
  value: string
  onChange: (val: string) => void
}

export const ColorSelect = ({ value, onChange }: ColorSelectProps) => {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedColor = colors.find(c => c.color === value)

  useEffect(() => {
    if (open && dropdownRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect()
      if (dropdownRect.bottom > window.innerHeight) {
        dropdownRef.current.style.top = `-${dropdownRect.height + 8}px`
      } else {
        dropdownRef.current.style.top = '100%'
      }
    }
  }, [open])

  return (
    <div className='relative'>
      <div
        onClick={() => setOpen(prev => !prev)}
        className='flex cursor-pointer items-center justify-between rounded-md bg-[#161616] p-2 text-white'
      >
        <div className='flex items-center gap-2'>
          <div
            className='h-4 w-4 rounded-full'
            style={{ backgroundColor: selectedColor?.color }}
          />
          <span>{selectedColor ? selectedColor.name : 'Выберите цвет'}</span>
        </div>
        <span>▾</span>
      </div>

      {open && (
        <div
          ref={dropdownRef}
          className='absolute z-10 mt-1 w-full rounded-md bg-[#161616] p-2 shadow-lg'
          style={{ top: '100%' }}
        >
          {colors.map((color, index) => (
            <div
              key={index}
              onClick={() => {
                onChange(color.color)
                setOpen(false)
              }}
              className='flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-[#212121]'
            >
              <div
                className='h-4 w-4 rounded-full'
                style={{ backgroundColor: color.color }}
              />
              <span className='text-white'>{color.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
