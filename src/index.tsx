import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './app/App'
import { AuthProvider } from 'app/hooks/useAuth'
import { store } from 'app/state/store'
import '@ovhcloud/ods-theme-blue-jeans'
import './index.scss'

const root = createRoot(document.getElementById('root')!)

function renderApp() {
  root.render(
    <BrowserRouter>
      <Provider store={ store }>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  )
}

renderApp()
