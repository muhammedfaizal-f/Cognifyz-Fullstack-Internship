import { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { useRouter } from './hooks/useRouter'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import TaskBoard from './components/TaskBoard'
import ToastStack from './components/Toast'
import './App.css'

function AppInner() {
  const { route, navigate } = useRouter()
  const { user } = useAuth()
  const [triggerAdd, setTriggerAdd] = useState(0)

  const renderPage = () => {
    if (route === '/login') return <LoginPage navigate={navigate} />
    if (route === '/register') return <RegisterPage navigate={navigate} />
    if (route === '/dashboard' || route === '/') {
      return (
        <ProtectedRoute navigate={navigate}>
          <TaskBoard triggerAdd={triggerAdd} />
        </ProtectedRoute>
      )
    }
    return <LoginPage navigate={navigate} />
  }

  return (
    <>
      <Navbar navigate={navigate} onAddTask={() => setTriggerAdd(n => n + 1)} />
      {renderPage()}
      <ToastStack />
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  )
}