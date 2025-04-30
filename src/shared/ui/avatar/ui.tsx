import { useEffect, useState } from 'react'

interface AvatarProps {
  path: string | null
  name: string
  size?: number
}

export const Avatar = ({ path, name, size = 40 }: AvatarProps) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    // Сброс состояния при изменении пути к изображению
    setImageError(false)
    setImageLoaded(false)
  }, [path])

  // Получаем инициалы из имени (первые буквы первого и последнего слова)
  const getInitials = (name: string) => {
    if (name === '') name = 'name'
    return name.charAt(0).toUpperCase()
  }

  const initials = getInitials(name)

  // Стили для круглой аватарки с возможностью изменения размера
  const avatarStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  }

  // Стили для текста внутри аватарки
  const textStyle = {
    fontSize: `${size * 0.4}px`,
    fontWeight: 'bold' as const,
    color: '#ffffff'
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const DefaultAvatar = (
    <div
      style={avatarStyle}
      className='bg-blue-500'
    >
      <span style={textStyle}>{initials}</span>
    </div>
  )

  const UserAvatar = (
    <div style={avatarStyle}>
      {!imageError && path ? (
        <img
          src={`http://localhost:5000/avatars/${path}`}
          alt={name}
          onError={handleImageError}
          onLoad={handleImageLoad}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: imageLoaded ? 'block' : 'none'
          }}
        />
      ) : null}
      {(!imageLoaded || imageError) && <span style={textStyle}>{initials}</span>}
    </div>
  )

  return path && !imageError ? UserAvatar : DefaultAvatar
}
