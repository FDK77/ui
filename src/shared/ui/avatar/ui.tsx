import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface ProcedureAvatarProps {
  path: string | null
  name: string
}

export const ProcedureAvatar = ({ path, name }: ProcedureAvatarProps) => {
  return (
    <>
      {path ? (
        <Avatar>
          <AvatarImage src={`http://localhost:8080/avatars/${path}`} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
      ) : (
        <div className='flex h-8 min-h-8 w-8 min-w-8 items-center justify-center rounded-full bg-blue-500 text-xl font-bold text-white'>
          {name.at(0)?.toLocaleUpperCase()}
        </div>
      )}
    </>
  )
}
