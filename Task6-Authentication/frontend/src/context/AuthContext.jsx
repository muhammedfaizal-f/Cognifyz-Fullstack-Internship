import { createContext, useContext, useState, useEffect } from 'react'
import api from '../api/axios'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'))
  const [loading, setLoading] = useState(true)

  // Verify token on mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.get('/auth/me')
        .then(res => setUser(res.user))
        .catch(() => { localStorage.removeItem('token'); localStorage.removeItem('user') })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password })
    localStorage.setItem('token', res.token)
    localStorage.setItem('user', JSON.stringify(res.user))
    setUser(res.user)
    return res
  }

  const register = async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password })
    localStorage.setItem('token', res.token)
    localStorage.setItem('user', JSON.stringify(res.user))
    setUser(res.user)
    return res
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)