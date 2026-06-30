import { useState } from 'react'
import { validateEmail } from '../utils/validators'
import { pushToast } from './Toast'

export default function LoginForm({ navigate, setUser }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [showPw, setShowPw] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [shakeCard, setShakeCard] = useState(false)

  const validate = () => ({
    email: validateEmail(form.email),
    password: form.password.length < 1 ? 'Password is required.' : '',
  })

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
    if (touched[field]) setErrors(v => ({ ...v, [field]: '' }))
  }

  const handleBlur = (field) => () => {
    setTouched(prev => ({ ...prev, [field]: true }))
    const errs = validate()
    setErrors(prev => ({ ...prev, [field]: errs[field] }))
  }

  const handleSubmit = async () => {
    setTouched({ email: true, password: true })
    const errs = validate()
    setErrors(errs)

    if (Object.values(errs).some(Boolean)) {
      setShakeCard(true)
      setTimeout(() => setShakeCard(false), 500)
      pushToast({ type: 'error', title: 'Check your details', message: 'Fill in all required fields.' })
      return
    }

    setSubmitting(true)
    await new Promise(r => setTimeout(r, 1000))
    setSubmitting(false)

    // Simulate login — accept any valid email/pw combo
    const name = form.email.split('@')[0].replace(/[._]/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase())
    setUser({ name, email: form.email })
    pushToast({ type: 'success', title: 'Welcome back!', message: `Signed in as ${form.email}` })
    navigate('/dashboard')
  }

  const fs = (field) => {
    if (!touched[field]) return ''
    return errors[field] ? 'is-error' : 'is-valid'
  }

  return (
    <div className="auth-wrap">
      <div className={`auth-card ${shakeCard ? 'shake' : ''} page-enter`}>
        <div className="auth-logo">🔑</div>
        <div className="auth-title">Sign in</div>
        <div className="auth-sub">Welcome back — enter your credentials</div>

        <div className="field-wrap">
          <label className="field-label" htmlFor="lemail">Email address</label>
          <input id="lemail" className={`field-input ${fs('email')}`}
            type="email" placeholder="you@example.com"
            value={form.email} onChange={handleChange('email')} onBlur={handleBlur('email')} />
          <span className="field-icon" style={{ pointerEvents: 'none' }}>
            <i className={`bi ${fs('email') === 'is-valid' ? 'bi-check-lg text-success' : fs('email') === 'is-error' ? 'bi-x-lg text-danger' : 'bi-envelope'}`}></i>
          </span>
          {touched.email && errors.email && (
            <div className="field-error"><i className="bi bi-exclamation-circle"></i>{errors.email}</div>
          )}
        </div>

        <div className="field-wrap">
          <label className="field-label" htmlFor="lpw">Password</label>
          <input id="lpw" className={`field-input ${fs('password')}`}
            type={showPw ? 'text' : 'password'} placeholder="Enter your password"
            value={form.password} onChange={handleChange('password')} onBlur={handleBlur('password')} />
          <span className="field-icon" onClick={() => setShowPw(p => !p)}>
            <i className={`bi ${showPw ? 'bi-eye-slash' : 'bi-eye'}`}></i>
          </span>
          {touched.password && errors.password && (
            <div className="field-error"><i className="bi bi-exclamation-circle"></i>{errors.password}</div>
          )}
        </div>

        <div className="d-flex justify-content-end mb-2">
          <span style={{ fontSize: '0.8rem', color: 'var(--orange)', cursor: 'pointer' }}
            onClick={() => pushToast({ type: 'info', title: 'Reset link sent', message: 'Check your inbox (simulated).' })}>
            Forgot password?
          </span>
        </div>

        <button className="btn-submit" onClick={handleSubmit} disabled={submitting}>
          {submitting
            ? <><span className="spinner-border spinner-border-sm"></span> Signing in…</>
            : <><i className="bi bi-box-arrow-in-right"></i> Sign in</>}
        </button>

        <div className="auth-switch">
          Don't have an account?{' '}
          <span onClick={() => navigate('/')}>Create one</span>
        </div>
      </div>
    </div>
  )
}