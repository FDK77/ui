import { useGlobalMessageSocket } from '@/shared/api/hooks/useGlobalMessageSocket'
import { AppLayout } from './app-layout'

export const App = () => {
  useGlobalMessageSocket()
  return <AppLayout />
}
