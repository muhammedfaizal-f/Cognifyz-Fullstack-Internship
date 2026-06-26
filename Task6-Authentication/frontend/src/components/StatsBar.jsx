import './StatsBar.css'

export default function StatsBar({ tasks }) {
  const total = tasks.length
  const todo  = tasks.filter(t => t.status === 'todo').length
  const inProg= tasks.filter(t => t.status === 'in-progress').length
  const done  = tasks.filter(t => t.status === 'done').length
  const pct   = total ? Math.round((done / total) * 100) : 0

  return (
    <div className="t6-stats fade-up">
      <div className="row g-3 mb-3">
        {[
          { label:'Total', value:total, icon:'bi-stack',       color:'var(--blue)',   bg:'var(--blue-dim)'  },
          { label:'To Do', value:todo,  icon:'bi-circle',      color:'var(--muted)',  bg:'rgba(139,148,158,.12)' },
          { label:'In Progress', value:inProg, icon:'bi-arrow-repeat', color:'var(--yellow)', bg:'var(--yellow-dim)' },
          { label:'Done',  value:done,  icon:'bi-check-circle',color:'var(--green)',  bg:'var(--green-dim)' },
        ].map(s => (
          <div className="col-6 col-md-3" key={s.label}>
            <div className="t6-stat-card">
              <div className="t6-stat-icon" style={{ background:s.bg, color:s.color }}>
                <i className={`bi ${s.icon}`} />
              </div>
              <div>
                <div className="t6-stat-num" style={{ color:s.color }}>{s.value}</div>
                <div className="t6-stat-lbl">{s.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="t6-progress-card">
        <div className="d-flex justify-content-between mb-1">
          <span className="t6-prog-label">Overall Progress</span>
          <span className="t6-prog-pct">{pct}%</span>
        </div>
        <div className="progress t6-prog-bar-wrap">
          <div className="progress-bar t6-prog-bar" style={{ width:`${pct}%` }} />
        </div>
      </div>
    </div>
  )
}