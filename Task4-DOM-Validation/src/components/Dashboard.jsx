import { pushToast } from './Toast'

const activities = [
  { color: '#3fb950', text: 'Account registered successfully', time: 'just now' },
  { color: '#58a6ff', text: 'Email verified',                  time: '1m ago'  },
  { color: '#d29922', text: 'Profile setup completed',         time: '2m ago'  },
  { color: '#e07b39', text: 'Welcome email sent',              time: '3m ago'  },
]

export default function Dashboard({ user, navigate, onLogout }) {
  const initials = user.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase()

  return (
    <div className="container dashboard-wrap">
      {/* Header */}
      <div className="dash-header">
        <div className="dash-avatar">{initials}</div>
        <div className="flex-grow-1">
          <div className="dash-name">Welcome, {user.name.split(' ')[0]}! 👋</div>
          <div className="dash-email">{user.email}</div>
        </div>
        <button className="btn-logout d-none d-md-flex" onClick={onLogout}>
          <i className="bi bi-box-arrow-right"></i> Logout
        </button>
      </div>

      {/* Stats */}
      <div className="row g-3 mb-3">
        {[
          { icon:'bi-shield-check', bg:'rgba(63,185,80,0.12)',  color:'#3fb950', num:'3/3', label:'Steps Completed' },
          { icon:'bi-check2-circle',bg:'rgba(224,123,57,0.12)', color:'#e07b39', num:'5',   label:'Validations Live' },
          { icon:'bi-diagram-3',    bg:'rgba(88,166,255,0.12)', color:'#58a6ff', num:'3',   label:'Routes Active'   },
          { icon:'bi-lightning',    bg:'rgba(210,153,34,0.12)', color:'#d29922', num:'DOM', label:'Dynamic Updates' },
        ].map((s, i) => (
          <div className="col-6 col-lg-3" key={i}>
            <div className="dash-stat-card">
              <div className="dash-stat-icon" style={{ background: s.bg }}>
                <i className={`bi ${s.icon}`} style={{ color: s.color }}></i>
              </div>
              <div>
                <div className="dash-stat-num">{s.num}</div>
                <div className="dash-stat-label">{s.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity log */}
      <div className="dash-activity-card">
        <div className="dash-activity-title">
          <i className="bi bi-activity me-2" style={{ color:'var(--orange)' }}></i>
          Recent Activity
        </div>
        {activities.map((a, i) => (
          <div className="activity-item" key={i}>
            <span className="activity-dot" style={{ background: a.color }}></span>
            <span className="activity-text">{a.text}</span>
            <span className="activity-time">{a.time}</span>
          </div>
        ))}
      </div>

      {/* DOM demo */}
      <DomDemo />
    </div>
  )
}

// ── Dynamic DOM manipulation demo ──
function DomDemo() {
  const [items, setItems] = useState([])
  const [inputVal, setInputVal] = useState('')
  const [filter, setFilter] = useState('all')

  const add = () => {
    if (!inputVal.trim()) {
      pushToast({ type:'warning', title:'Empty input', message:'Type something first.' })
      return
    }
    setItems(prev => [{ id: Date.now(), text: inputVal.trim(), done: false }, ...prev])
    setInputVal('')
    pushToast({ type:'success', title:'Item added', message:`"${inputVal.trim()}" added to list.` })
  }

  const toggle = (id) => setItems(prev => prev.map(i => i.id === id ? { ...i, done: !i.done } : i))
  const remove  = (id) => setItems(prev => prev.filter(i => i.id !== id))

  const visible = items.filter(i =>
    filter === 'all'    ? true :
    filter === 'active' ? !i.done : i.done
  )

  return (
    <div className="dash-activity-card mt-3">
      <div className="dash-activity-title">
        <i className="bi bi-braces me-2" style={{ color:'var(--blue)' }}></i>
        Dynamic DOM Manipulation Demo
      </div>
      <div className="d-flex gap-2 mb-3">
        <input
          className="field-input flex-grow-1"
          style={{ marginBottom:0, padding:'0.6rem 0.85rem' }}
          placeholder="Add an item..."
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && add()}
        />
        <button className="btn-submit" style={{ width:'auto', padding:'0.6rem 1.25rem', marginTop:0 }} onClick={add}>
          <i className="bi bi-plus-lg"></i>
        </button>
      </div>
      <div className="d-flex gap-2 mb-3">
        {['all','active','done'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{
              background: filter === f ? 'var(--orange)' : 'transparent',
              border: `1px solid ${filter === f ? 'var(--orange)' : 'var(--border)'}`,
              color: filter === f ? '#fff' : 'var(--muted)',
              borderRadius: 8, padding:'0.3rem 0.85rem', fontSize:'0.8rem',
              cursor:'pointer', transition:'all 0.2s', fontWeight: 600,
            }}
          >{f.charAt(0).toUpperCase()+f.slice(1)} {f==='all'?items.length:f==='active'?items.filter(i=>!i.done).length:items.filter(i=>i.done).length}</button>
        ))}
        {items.length > 0 && (
          <button onClick={() => { setItems([]); pushToast({type:'info',title:'Cleared',message:'All items removed.'}) }}
            style={{ marginLeft:'auto', background:'transparent', border:'1px solid rgba(248,81,73,0.3)',
              color:'var(--red)', borderRadius:8, padding:'0.3rem 0.85rem', fontSize:'0.8rem', cursor:'pointer' }}>
            Clear all
          </button>
        )}
      </div>
      {visible.length === 0 && (
        <div style={{ textAlign:'center', color:'var(--muted)', fontSize:'0.85rem', padding:'1.5rem 0' }}>
          {filter === 'all' ? 'No items yet — add one above.' : `No ${filter} items.`}
        </div>
      )}
      {visible.map(item => (
        <div key={item.id} className="activity-item" style={{ padding:'0.6rem 0' }}>
          <input type="checkbox" checked={item.done} onChange={() => toggle(item.id)}
            style={{ accentColor:'var(--orange)', width:16, height:16, cursor:'pointer', flexShrink:0 }} />
          <span className="activity-text" style={{
            flex:1, textDecoration: item.done ? 'line-through' : 'none',
            color: item.done ? 'var(--muted)' : 'var(--text)', transition:'all 0.2s'
          }}>{item.text}</span>
          <button onClick={() => remove(item.id)}
            style={{ background:'none', border:'none', color:'var(--muted)', cursor:'pointer', fontSize:'0.9rem' }}>
            <i className="bi bi-trash"></i>
          </button>
        </div>
      ))}
    </div>
  )
}

import { useState } from 'react'