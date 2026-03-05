import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import dayjs from 'dayjs'
import 'dayjs/locale/tr'
import { store } from './store'
import { ThemeProvider } from './contexts/ThemeContext'
import { UIProvider } from './contexts/UIContext'
import App from './App.tsx'

dayjs.locale('tr') // haftanın baslangici pazrts

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <UIProvider>
          <App />
        </UIProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
