import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import { store } from '@app/redux/store.ts'

import { App } from './App.tsx'
import './index.css'

async function deferRender() {
  const { worker } = await import('../shared/api/msw.ts')
  return worker.start()
}
deferRender().then(() => {
  createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <App />
    </Provider>
  )
})
