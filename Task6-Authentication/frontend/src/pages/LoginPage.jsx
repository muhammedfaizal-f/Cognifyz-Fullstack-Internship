import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { pushToast } from '../components/Toast'
import './LoginPage.css'

export default function LoginPage({ navigate }) {
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [shake, setShake] = useState(false)

  const validate = () => {
    const e = {}
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email.'
    if (!form.password) e.password = 'Password is required.'
    return e
  }

  const handleSubmit = async () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); setShake(true); setTimeout(() => setShake(false), 500); return }

    setLoading(true)
    try {
      const res = await login(form.email, form.password)
      pushToast({ type: 'success', title: 'Welcome back!', message: `Signed in as ${res.user.name}` })
      navigate('/dashboard')
    } catch (err) {
      pushToast({ type: 'error', title: 'Login failed', message: err.message })
    } finally {
      setLoading(false)
    }
  }

  const set = (f) => (e) => { setForm(p => ({ ...p, [f]: e.target.value })); setErrors(p => ({ ...p, [f]: '' })) }

  return (
    <div className="login-page">
      <div className={`login-card fade-up ${shake ? 'login-shake' : ''}`}>
        <div className="login-logo">🔑</div>
        <h2 className="login-title">Sign in</h2>
        <p className="login-sub">Your tasks are waiting — sign in to continue</p>

        <div className="mb-3">
          <label className="login-label">Email</label>
          <input className={`form-control login-input ${errors.email ? 'is-invalid' : ''}`}
            type="email" placeholder="you@example.com" value={form.email} onChange={set('email')}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
          {errors.email && <div className="login-err">{errors.email}</div>}
        </div>

        <div className="mb-4">
          <label className="login-label">Password</label>
          <input className={`form-control login-input ${errors.password ? 'is-invalid' : ''}`}
            type="password" placeholder="Enter your password" value={form.password} onChange={set('password')}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
          {errors.password && <div className="login-err">{errors.password}</div>}
        </div>

        <button className="btn login-btn w-100" onClick={handleSubmit} disabled={loading}>
          {loading ? <><span className="login-spinner" /> Signing in…</> : '→ Sign in'}
        </button>

        <p className="login-switch">No account? <span onClick={() => navigate('/register')}>Create one</span></p>
      </div>
    </div>
  )
}