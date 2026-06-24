import { useState, useCallback } from 'react'
import './Toast.css'

let _push = null
export function pushToast(toast) { _push?.(toast) }

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

  const icons = { success:'bi-check-circle-fill', error:'bi-x-circle-fill',
                  info:'bi-info-circle-fill', warning:'bi-exclamation-triangle-fill' }
  const colors = { success:'var(--green)', error:'var(--red)', info:'var(--blue)', warning:'var(--yellow)' }

  return (
    <div className="toast-stack">
      {toasts.map(t => (
        <div className={`t5-toast ${t.hide ? 'hide' : ''}`} key={t.id}>
          <i className={`bi ${icons[t.type]} toast-icon`} style={{ color: colors[t.type] }} />
          <div className="toast-content">
            <div className="toast-title">{t.title}</div>
            {t.message && <div className="toast-msg">{t.message}</div>}
          </div>
          <button className="toast-close" onClick={() => {
            setToasts(p => p.map(x => x.id === t.id ? { ...x, hide: true } : x))
            setTimeout(() => setToasts(p => p.filter(x => x.id !== t.id)), 350)
          }}><i className="bi bi-x" /></button>
        </div>
      ))}
    </div>
  )
}