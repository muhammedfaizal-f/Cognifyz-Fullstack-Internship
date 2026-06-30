import './StatsBar.css'

export default function StatsBar({ tasks }) {
  const total = tasks.length
  const todo = tasks.filter(t => t.status === 'todo').length
  const inProgress = tasks.filter(t => t.status === 'in-progress').length
  const done = tasks.filter(t => t.status === 'done').length
  const pct = total ? Math.round((done / total) * 100) : 0

  const stats = [
    { label: 'Total', value: total, icon: 'bi-stack', color: 'var(--blue)', bg: 'var(--blue-dim)' },
    { label: 'To Do', value: todo, icon: 'bi-circle', color: 'var(--muted)', bg: 'rgba(139,148,158,0.12)' },
    { label: 'In Progress', value: inProgress, icon: 'bi-arrow-repeat', color: 'var(--yellow)', bg: 'var(--yellow-dim)' },
    { label: 'Done', value: done, icon: 'bi-check-circle', color: 'var(--green)', bg: 'var(--green-dim)' },
  ]

  return (
    <div className="stats-bar fade-up">
      <div className="row g-3 mb-3">
        {stats.map(s => (
          <div className="col-6 col-md-3" key={s.label}>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: s.bg, color: s.color }}>
                <i className={`bi ${s.icon}`} />
              </div>
              <div>
                <div className="stat-num" style={{ color: s.color }}>{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="progress-wrap">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <span className="progress-label">Overall Progress</span>
          <span className="progress-pct">{pct}%</span>
        </div>
        <div className="progress t5-progress">
          <div
            className="progress-bar t5-progress-bar"
            style={{ width: `${pct}%` }}
            role="progressbar"
          />
        </div>
      </div>
    </div>
  )
}