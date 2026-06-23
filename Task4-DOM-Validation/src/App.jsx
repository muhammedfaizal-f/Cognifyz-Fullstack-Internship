import { useState } from 'react'
import { useRouter } from './hooks/useRouter'
import Navbar from './components/Navbar'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import Dashboard from './components/Dashboard'
import ToastStack from './components/Toast'
import { pushToast } from './components/Toast'

export default function App() {
  const { route, navigate } = useRouter()
  const [user, setUser] = useState(null)

  const handleLogout = () => {
    setUser(null)
    navigate('/login')
    pushToast({ type: 'info', title: 'Signed out', message: 'You have been logged out.' })
  }

  const renderPage = () => {
    if (user && route === '/dashboard') {
      return <Dashboard user={user} navigate={navigate} onLogout={handleLogout} />
    }
    if (route === '/login') {
      return <LoginForm navigate={navigate} setUser={setUser} />
    }
    // default: register
    return <RegisterForm navigate={navigate} setUser={setUser} />
  }

  return (
    <>
      <Navbar route={route} navigate={navigate} user={user} onLogout={handleLogout} />
      {renderPage()}
      <ToastStack />
    </>
  )
}