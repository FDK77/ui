interface TitleProps {
  title: string
  className?: string
}

export const Title = ({ title, className }: TitleProps) => {
  return <h3 className={`text-base leading-none font-bold text-white ${className}`}>{title}</h3>
}
