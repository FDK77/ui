import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'

import { CHAT_LIST } from '@shared/data/chatList'

import { MESSAGE_LIST } from '../data/messageList'

const handlers = [
  http.get('http://localhost:8080/api/chats', () => {
    return HttpResponse.json(CHAT_LIST)
  }),
  http.get('http://localhost:8080/api/messages/filter/:id', () => {
    return HttpResponse.json(MESSAGE_LIST)
  }),
  http.post('http://localhost:8080/api/chats/settings', () => {
    console.log('ушло')
  })
]

export const worker = setupWorker(...handlers)
