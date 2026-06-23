// ── Password strength engine ──
export function getPasswordStrength(password) {
  let score = 0
  const checks = {
    length:    password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number:    /[0-9]/.test(password),
    special:   /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
    long:      password.length >= 12,
  }
  score = Object.values(checks).filter(Boolean).length

  if (score <= 2) return { level: 'Weak',   color: '#f85149', width: '25%',  checks }
  if (score <= 3) return { level: 'Fair',   color: '#d29922', width: '50%',  checks }
  if (score <= 4) return { level: 'Good',   color: '#58a6ff', width: '75%',  checks }
  return           { level: 'Strong', color: '#3fb950', width: '100%', checks }
}

// ── Field validators ──
export function validateName(v) {
  if (!v.trim()) return 'Full name is required.'
  if (v.trim().length < 3) return 'Name must be at least 3 characters.'
  if (!/^[a-zA-Z\s]+$/.test(v)) return 'Name can only contain letters.'
  return ''
}

export function validateEmail(v) {
  if (!v.trim()) return 'Email is required.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter a valid email address.'
  return ''
}

export function validatePassword(v) {
  if (!v) return 'Password is required.'
  if (v.length < 8) return 'Password must be at least 8 characters.'
  if (!/[A-Z]/.test(v)) return 'Add at least one uppercase letter.'
  if (!/[0-9]/.test(v)) return 'Add at least one number.'
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(v)) return 'Add at least one special character.'
  return ''
}

export function validateConfirm(v, password) {
  if (!v) return 'Please confirm your password.'
  if (v !== password) return 'Passwords do not match.'
  return ''
}

export function validatePhone(v) {
  if (!v.trim()) return 'Phone number is required.'
  if (!/^[6-9]\d{9}$/.test(v.replace(/\s/g, ''))) return 'Enter a valid 10-digit Indian mobile number.'
  return ''
}