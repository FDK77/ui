import { useEffect, useRef, useState } from 'react'

interface ResizableInputProps {
  value: string
  onChange: (val: string) => void
}

export const ResizableInput = ({ value, onChange }: ResizableInputProps) => {
  const spanRef = useRef<HTMLSpanElement>(null)
  const [inputWidth, setInputWidth] = useState(8) // начальная ширина

  useEffect(() => {
    if (spanRef.current) {
      setInputWidth(spanRef.current.offsetWidth + 10) // +10px на запас
    }
  }, [value])

  return (
    <div className='relative inline-block'>
      <input
        className='min-w-24 rounded-md bg-[#161616] px-2.5 py-1 text-white outline-none'
        style={{ width: `${inputWidth}px` }}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder='Название'
      />
      <span
        ref={spanRef}
        className='invisible absolute whitespace-pre'
        style={{
          fontSize: '1rem', // тот же стиль, что и у input
          padding: '0 10px',
          whiteSpace: 'pre',
          fontFamily: 'inherit'
        }}
      >
        {value || ' '}
      </span>
    </div>
  )
}
