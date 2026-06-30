import { useState, useCallback } from 'react'
import './Toast.css'

let _push = null
export const pushToast = (t) => _push?.(t)

export default function ToastStack() {
  const [toasts, setToasts] = useState([])

  _push = useCallback((toast) => {
    const id = Date.now()
    setToasts(p => [...p, { id, ...toast }])
    setTimeout(() => {
      setToasts(p => p.map(t => t.id === id ? { ...t, hide: true } : t))
      setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 350)
    }, toast.duration || 3500)
  }, [])

  const dismiss = (id) => {
    setToasts(p => p.map(t => t.id === id ? { ...t, hide: true } : t))
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 350)
  }

  const meta = {
    success: { icon: 'bi-check-circle-fill', color: 'var(--green)' },
    error: { icon: 'bi-x-circle-fill', color: 'var(--red)' },
    info: { icon: 'bi-info-circle-fill', color: 'var(--blue)' },
    warning: { icon: 'bi-exclamation-triangle-fill', color: 'var(--yellow)' },
  }

  return (
    <div className="toast-stack">
      {toasts.map(t => (
        <div key={t.id} className={`t6-toast ${t.hide ? 'hide' : ''}`}>
          <i className={`bi ${meta[t.type]?.icon} toast-ico`} style={{ color: meta[t.type]?.color }} />
          <div className="toast-body">
            <div className="toast-title">{t.title}</div>
            {t.message && <div className="toast-sub">{t.message}</div>}
          </div>
          <button className="toast-x" onClick={() => dismiss(t.id)}><i className="bi bi-x" /></button>
        </div>
      ))}
    </div>
  )
}