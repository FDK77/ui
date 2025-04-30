export const ResizableTextarea = ({
  value,
  onChange
}: {
  value: string
  onChange: (val: string) => void
}) => {
  return (
    <textarea
      ref={el => {
        if (el) {
          el.style.height = 'auto'
          el.style.height = `${el.scrollHeight}px`
        }
      }}
      value={value}
      onChange={e => {
        onChange(e.target.value)
        e.target.style.height = 'auto'
        e.target.style.height = `${e.target.scrollHeight}px`
      }}
      className='w-full resize-none rounded-md bg-[#161616] px-2.5 py-1 text-white outline-none'
    />
  )
}
