import { IFilter } from '@/shared/const/IFilter'
import { Text } from '@/shared/ui/text'

interface FilterProps {
  data: IFilter
  selected: boolean
  onClick: () => void
}

export const Filter = ({ data, selected, onClick }: FilterProps) => {
  return (
    <div
      className={`flex min-w-24 cursor-default items-center justify-center gap-2 rounded-t-md px-2.5 py-1.5 text-white ${selected ? 'bg-[#161616]' : 'bg-[#161616c5]'}`}
      onClick={onClick}
    >
      <div
        className='h-3 w-3 rounded-full'
        style={{ backgroundColor: data.color }}
      />
      <Text
        text={data.name}
        opacity={!selected}
      />
    </div>
  )
}
