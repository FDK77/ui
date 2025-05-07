interface TextProps {
  text: string
  opacity?: boolean
  className?: string
}

export const Text = ({ text, opacity = false, className }: TextProps) => {
  const style = opacity ? 'opacity-50' : ''
  return (
    <p className={`text-sm leading-snug break-words text-white ${style} ${className}`}>{text}</p>
  )
}
