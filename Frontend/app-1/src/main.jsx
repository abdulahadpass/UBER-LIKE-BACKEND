import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages/Home.jsx'
import UserLogin from './pages/UserLogin.jsx'
import UserRegister from './pages/UserRegister.jsx'
import CaptainLogin from './pages/CaptainLogin.jsx'
import CaptainRegister from './pages/CaptainRegister.jsx'
import { UserProvider } from './context/UserContext.jsx'
import UserProtectedRoute from './pages/UserProtectedRoute.jsx'
import { CaptainProvider } from './context/CaptainContext.jsx'
import CaptainHome from './pages/CaptainHome.jsx'
import CaptainProtectedRoute from './pages/CaptainProtectedRoute.jsx'
import Riding from './pages/Riding.jsx'
import CaptainRiding from './pages/CaptainRiding.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/home',
        element: (
          <UserProtectedRoute>
            <Home />
          </UserProtectedRoute>
        ),
      },
      {
        path: '/riding',
        element: (
          <UserProtectedRoute>
            <Riding />
          </UserProtectedRoute>
        ),
      },
      {
        path: '/userLogin',
        element: <UserLogin />,
      },
      {
        path: '/userRegister',
        element: <UserRegister />,
      },
      {
        path: '/captainLogin',
        element: <CaptainLogin />,
      },
      {
        path: '/captainRegister',
        element: <CaptainRegister />,
      },
      {
        path: '/captainHome',
        element: (
          <CaptainProtectedRoute>
            <CaptainHome />
          </CaptainProtectedRoute>
        )
      },
      {
        path: '/captainRiding',
        element: (
          <CaptainProtectedRoute>
            <CaptainRiding />
          </CaptainProtectedRoute>
        )
      },

    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CaptainProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </CaptainProvider>
  </StrictMode>
)
