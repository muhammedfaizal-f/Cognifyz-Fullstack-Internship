import { useState, useEffect, useCallback } from 'react'

let _push = null
export function pushToast(toast) { _push && _push(toast) }

export default function ToastStack() {
  const [toasts, setToasts] = useState([])

  _push = useCallback((toast) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, ...toast }])
    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, hide: true } : t))
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 320)
    }, toast.duration || 3500)
  }, [])

  const dismiss = (id) => {
    setToasts(prev => prev.map(t => t.id === id ? { ...t, hide: true } : t))
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 320)
  }

  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' }

  return (
    <div className="toast-stack">
      {toasts.map(t => (
        <div className={`t4-toast ${t.hide ? 'hide' : ''}`} key={t.id}>
          <span className="t4-toast-icon">{icons[t.type] || 'ℹ️'}</span>
          <div>
            <div className="t4-toast-title">{t.title}</div>
            {t.message && <div className="t4-toast-msg">{t.message}</div>}
          </div>
          <button className="t4-toast-close" onClick={() => dismiss(t.id)}>
            <i className="bi bi-x"></i>
          </button>
        </div>
      ))}
    </div>
  )
}