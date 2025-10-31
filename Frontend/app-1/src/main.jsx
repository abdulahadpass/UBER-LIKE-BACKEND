import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages/Home.jsx'
import UserLogin from './pages/UserLogin.jsx'
import UserRegister from './pages/UserRegister.jsx'
import CaptianLogin from './pages/CaptianLogin.jsx'
import CaptainRegister from './pages/CaptainRegister.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/userLogin',
        element: <UserLogin />
      },
      {
        path: '/userRegister',
        element: <UserRegister />
      },
      {
        path: '/capatainLogin',
        element: <CaptianLogin />
      },
      {
        path: '/captainRegister',
        element: <CaptainRegister />
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(

  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>,
)
