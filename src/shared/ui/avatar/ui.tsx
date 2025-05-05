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
        <div className='item-center flex min-h-8 min-w-8 justify-center rounded-full bg-blue-500 text-xl font-bold text-white'>
          {name.at(1)}
        </div>
      )}
    </>
  )
}
