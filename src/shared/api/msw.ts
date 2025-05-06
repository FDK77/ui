import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'

import { CHAT_LIST } from '@shared/data/chatList'

import { MESSAGE_LIST } from '../data/messageList'

const handlers = [
  http.get('http://localhost:8080/api/chats', () => {
    return HttpResponse.json(CHAT_LIST)
  }),
  http.get('http://localhost:8080/api/filters/:id', () => {
    return HttpResponse.json([
      {
        id: 1,
        name: 'Filter 1',
        color: '#00D9FF',
        value: 'Text for filter 1',
        summary: false,
        unreadMessages: true
      },
      {
        id: 2,
        name: 'Filter 2',
        color: '#0048FF',
        value: 'Text for filter 2',
        summary: true,
        unreadMessages: false
      },
      {
        id: 3,
        name: 'Filter 3',
        color: '#8800FF',
        value: 'Text for filter 3',
        summary: false,
        unreadMessages: true
      },
      {
        id: 4,
        name: 'Filter 4',
        color: '#FF00DD',
        value: 'Text for filter 4',
        summary: true,
        unreadMessages: true
      }
    ])
  }),
  http.get('http://localhost:8080/api/messages/filter/:id', () => {
    return HttpResponse.json(MESSAGE_LIST)
  }),
  http.post('http://localhost:8080/api/chats/settings', () => {
    console.log('ушло')
  })
]

export const worker = setupWorker(...handlers)
