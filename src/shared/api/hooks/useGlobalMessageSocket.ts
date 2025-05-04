import { useEffect } from 'react'
import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client/dist/sockjs'
import { useAppDispatch } from '@lib/hooks/useAppDispatch'
import { messageReceived } from '@/shared/redux/slices/wsMessageSlice'
import { Message } from '@/shared/type/message'

export const useGlobalMessageSocket = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws')
    const client = new Client({
      webSocketFactory: () => socket,
      debug: str => console.log('[WS]', str),
      reconnectDelay: 5000
    })

    client.onConnect = () => {
      client.subscribe('/topic/messages', message => {
        const parsed: Message = JSON.parse(message.body)
        dispatch(messageReceived(parsed))
      })
    }

    client.activate()
    return () => void client.deactivate()
  }, [dispatch])
}