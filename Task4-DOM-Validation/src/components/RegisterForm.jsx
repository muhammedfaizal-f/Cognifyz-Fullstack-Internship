import { useState } from 'react'
import {
  validateName, validateEmail, validatePassword,
  validateConfirm, validatePhone, getPasswordStrength
} from '../utils/validators'
import { pushToast } from './Toast'

const checkLabels = {
  length:    '8+ chars',
  uppercase: 'Uppercase',
  lowercase: 'Lowercase',
  number:    'Number',
  special:   'Symbol',
  long:      '12+ chars',
}

export default function RegisterForm({ navigate, setUser }) {
  const [form, setForm] = useState({ name:'', email:'', phone:'', password:'', confirm:'' })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [showPw, setShowPw] = useState(false)
  const [showCf, setShowCf] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [shakeCard, setShakeCard] = useState(false)

  const strength = form.password ? getPasswordStrength(form.password) : null

  const validate = (field, value) => {
    const all = { ...form, [field]: value }
    const e = {}
    e.name    = validateName(all.name)
    e.email   = validateEmail(all.email)
    e.phone   = validatePhone(all.phone)
    e.password = validatePassword(all.password)
    e.confirm = validateConfirm(all.confirm, all.password)
    return e
  }

  const handleChange = (field) => (e) => {
    const value = e.target.value
    setForm(prev => ({ ...prev, [field]: value }))
    if (touched[field]) {
      setErrors(validate(field, value))
    }
  }

  const handleBlur = (field) => () => {
    setTouched(prev => ({ ...prev, [field]: true }))
    setErrors(prev => ({ ...prev, ...validate(field, form[field]) }))
  }

  const fieldState = (field) => {
    if (!touched[field]) return ''
    return errors[field] ? 'is-error' : 'is-valid'
  }

  const handleSubmit = async () => {
    const allTouched = { name:true, email:true, phone:true, password:true, confirm:true }
    setTouched(allTouched)
    const errs = validate('', '')
    // re-run full validation
    const fullErrs = {
      name:    validateName(form.name),
      email:   validateEmail(form.email),
      phone:   validatePhone(form.phone),
      password: validatePassword(form.password),
      confirm: validateConfirm(form.confirm, form.password),
    }
    setErrors(fullErrs)

    if (Object.values(fullErrs).some(Boolean)) {
      setShakeCard(true)
      setTimeout(() => setShakeCard(false), 500)
      pushToast({ type:'error', title:'Fix the errors below', message:'Please check all fields before continuing.' })
      return
    }

    setSubmitting(true)
    await new Promise(r => setTimeout(r, 1200)) // simulate API
    setSubmitting(false)

    const userData = { name: form.name, email: form.email, phone: form.phone }
    setUser(userData)
    pushToast({ type:'success', title:'Account created!', message:`Welcome, ${form.name.split(' ')[0]}!` })
    navigate('/dashboard')
  }

  return (
    <div className="auth-wrap">
      <div className={`auth-card ${shakeCard ? 'shake' : ''} page-enter`}>
        <div className="auth-logo">🛡️</div>
        <div className="auth-title">Create your account</div>
        <div className="auth-sub">Level 2 · Task 4 — Complex Form Validation</div>

        {/* Name + Phone row */}
        <div className="field-row">
          <Field label="Full Name" id="name" icon="bi-person"
            value={form.name} onChange={handleChange('name')} onBlur={handleBlur('name')}
            state={fieldState('name')} error={errors.name} placeholder="Faizal F" />
          <Field label="Phone" id="phone" icon="bi-phone"
            value={form.phone} onChange={handleChange('phone')} onBlur={handleBlur('phone')}
            state={fieldState('phone')} error={errors.phone} placeholder="9876543210" type="tel" />
        </div>

        {/* Email */}
        <Field label="Email address" id="email" icon="bi-envelope"
          value={form.email} onChange={handleChange('email')} onBlur={handleBlur('email')}
          state={fieldState('email')} error={errors.email} placeholder="faizal@cognifyz.com" type="email" />

        {/* Password with strength */}
        <div className="field-wrap">
          <label className="field-label" htmlFor="password">Password</label>
          <input id="password" className={`field-input ${fieldState('password')}`}
            type={showPw ? 'text' : 'password'}
            value={form.password}
            onChange={handleChange('password')}
            onBlur={handleBlur('password')}
            placeholder="Min 8 chars, uppercase, number, symbol" />
          <span className="field-icon" onClick={() => setShowPw(p => !p)}>
            <i className={`bi ${showPw ? 'bi-eye-slash' : 'bi-eye'}`}></i>
          </span>
          {form.password && strength && (
            <>
              <div className="pw-strength-bar-wrap">
                <div className="pw-strength-bar" style={{ width: strength.width, background: strength.color }} />
              </div>
              <div className="pw-strength-label" style={{ color: strength.color }}>
                {strength.level} password
              </div>
              <div className="pw-checklist">
                {Object.entries(strength.checks).map(([key, pass]) => (
                  <div className={`pw-check-item ${pass ? 'pass' : ''}`} key={key}>
                    <span className="ci">{pass ? '✓' : ''}</span>
                    {checkLabels[key]}
                  </div>
                ))}
              </div>
            </>
          )}
          {touched.password && errors.password && (
            <div className="field-error"><i className="bi bi-exclamation-circle"></i>{errors.password}</div>
          )}
          {touched.password && !errors.password && (
            <div className="field-valid-msg"><i className="bi bi-check-circle"></i>Password looks good</div>
          )}
        </div>

        {/* Confirm password */}
        <div className="field-wrap">
          <label className="field-label" htmlFor="confirm">Confirm Password</label>
          <input id="confirm" className={`field-input ${fieldState('confirm')}`}
            type={showCf ? 'text' : 'password'}
            value={form.confirm}
            onChange={handleChange('confirm')}
            onBlur={handleBlur('confirm')}
            placeholder="Re-enter password" />
          <span className="field-icon" onClick={() => setShowCf(p => !p)}>
            <i className={`bi ${showCf ? 'bi-eye-slash' : 'bi-eye'}`}></i>
          </span>
          {touched.confirm && errors.confirm && (
            <div className="field-error"><i className="bi bi-exclamation-circle"></i>{errors.confirm}</div>
          )}
          {touched.confirm && !errors.confirm && form.confirm && (
            <div className="field-valid-msg"><i className="bi bi-check-circle"></i>Passwords match</div>
          )}
        </div>

        <button className="btn-submit" onClick={handleSubmit} disabled={submitting}>
          {submitting
            ? <><span className="spinner-border spinner-border-sm"></span> Creating account…</>
            : <><i className="bi bi-arrow-right-circle"></i> Create account</>}
        </button>

        <div className="auth-switch">
          Already have an account?{' '}
          <span onClick={() => navigate('/login')}>Sign in</span>
        </div>
      </div>
    </div>
  )
}

// Reusable field component
function Field({ label, id, icon, value, onChange, onBlur, state, error, placeholder, type = 'text' }) {
  return (
    <div className="field-wrap">
      <label className="field-label" htmlFor={id}>{label}</label>
      <input id={id} className={`field-input ${state}`}
        type={type} value={value} onChange={onChange} onBlur={onBlur} placeholder={placeholder} />
      <span className="field-icon" style={{ pointerEvents:'none' }}>
        <i className={`bi ${state === 'is-valid' ? 'bi-check-lg text-success' : state === 'is-error' ? 'bi-x-lg text-danger' : icon}`}></i>
      </span>
      {state === 'is-error' && error && (
        <div className="field-error"><i className="bi bi-exclamation-circle"></i>{error}</div>
      )}
      {state === 'is-valid' && (
        <div className="field-valid-msg"><i className="bi bi-check-circle"></i>Looks good</div>
      )}
    </div>
  )
}