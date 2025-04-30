interface TextProps {
  text: string
  opacity?: boolean
}

export const Text = ({ text, opacity = false }: TextProps) => {
  const style = opacity ? 'opacity-50' : ''
  return <p className={`text-sm leading-snug break-words text-white ${style} `}>{text}</p>
}
