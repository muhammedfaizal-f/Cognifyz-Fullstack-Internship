import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { pushToast } from '../components/Toast'
import './RegisterPage.css'

export default function RegisterPage({ navigate }) {
  const { register } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [shake, setShake] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim() || form.name.trim().length < 3) e.name = 'Name must be at least 3 characters.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email.'
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters.'
    if (form.confirm !== form.password) e.confirm = 'Passwords do not match.'
    return e
  }

  const handleSubmit = async () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); setShake(true); setTimeout(() => setShake(false), 500); return }

    setLoading(true)
    try {
      await register(form.name, form.email, form.password)
      pushToast({ type: 'success', title: 'Account created!', message: `Welcome, ${form.name.split(' ')[0]}!` })
      navigate('/dashboard')
    } catch (err) {
      pushToast({ type: 'error', title: 'Registration failed', message: err.message })
    } finally {
      setLoading(false)
    }
  }

  const set = (f) => (e) => { setForm(p => ({ ...p, [f]: e.target.value })); setErrors(p => ({ ...p, [f]: '' })) }

  return (
    <div className="auth-page">
      <div className={`auth-card fade-up ${shake ? 'auth-shake' : ''}`}>
        <div className="auth-logo">🛡️</div>
        <h2 className="auth-title">Create account</h2>
        <p className="auth-sub">Level 3 · Task 6 — MongoDB + JWT Auth</p>

        <div className="mb-3">
          <label className="auth-label">Full Name</label>
          <input className={`form-control auth-input ${errors.name ? 'is-invalid' : ''}`}
            placeholder="Faizal F" value={form.name} onChange={set('name')} />
          {errors.name && <div className="auth-err">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label className="auth-label">Email</label>
          <input className={`form-control auth-input ${errors.email ? 'is-invalid' : ''}`}
            type="email" placeholder="faizal@cognifyz.com" value={form.email} onChange={set('email')} />
          {errors.email && <div className="auth-err">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label className="auth-label">Password</label>
          <input className={`form-control auth-input ${errors.password ? 'is-invalid' : ''}`}
            type="password" placeholder="Min 8 characters" value={form.password} onChange={set('password')} />
          {errors.password && <div className="auth-err">{errors.password}</div>}
        </div>

        <div className="mb-4">
          <label className="auth-label">Confirm Password</label>
          <input className={`form-control auth-input ${errors.confirm ? 'is-invalid' : ''}`}
            type="password" placeholder="Re-enter password" value={form.confirm} onChange={set('confirm')} />
          {errors.confirm && <div className="auth-err">{errors.confirm}</div>}
        </div>

        <button className="btn auth-btn w-100" onClick={handleSubmit} disabled={loading}>
          {loading ? <><span className="auth-spinner" /> Creating account…</> : '→ Create account'}
        </button>

        <p className="auth-switch">Already have an account? <span onClick={() => navigate('/login')}>Sign in</span></p>
      </div>
    </div>
  )
}