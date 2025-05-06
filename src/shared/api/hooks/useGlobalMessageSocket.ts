import { useEffect, useRef } from 'react'

import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client/dist/sockjs'

import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'
import { messageReceived } from '@/shared/redux/slices/wsMessageSlice'
import { Message } from '@/shared/types/message'

import { useAppDispatch } from '@lib/hooks/useAppDispatch'

export const useGlobalMessageSocket = () => {
  const dispatch = useAppDispatch()
  const selectedFilterId = useAppSelector(state => state.filter.selectedFilterId)

  /** храним клиент, чтобы можно было publish‑ить из любого коллбэка */
  const clientRef = useRef<Client | null>(null)

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws')
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: str => console.log('[WS]', str)
    })

    clientRef.current = client

    client.onConnect = () => {
      client.subscribe('/topic/messages', frame => {
        const parsed: Message = JSON.parse(frame.body)

        if (parsed.filterId === selectedFilterId) {
          client.publish({
            destination: '/app/read',
            body: JSON.stringify({ filterId: parsed.filterId })
          })
        }

        dispatch(messageReceived({ message: parsed, currentFilterId: selectedFilterId }))
      })
    }

    client.activate()
    return () => {
      client.deactivate()
      clientRef.current = null
    }
  }, [dispatch, selectedFilterId])
}
