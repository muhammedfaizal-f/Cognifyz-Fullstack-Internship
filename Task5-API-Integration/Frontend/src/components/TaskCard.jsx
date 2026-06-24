import './TaskCard.css'

const STATUS_CONFIG = {
  'todo':        { label:'To Do',       color:'var(--muted)',  bg:'rgba(139,148,158,0.12)', icon:'bi-circle' },
  'in-progress': { label:'In Progress', color:'var(--yellow)', bg:'var(--yellow-dim)',      icon:'bi-arrow-repeat' },
  'done':        { label:'Done',        color:'var(--green)',  bg:'var(--green-dim)',        icon:'bi-check-circle-fill' },
}
const PRIORITY_CONFIG = {
  'high':   { label:'High',   color:'var(--red)',    bg:'var(--red-dim)'    },
  'medium': { label:'Medium', color:'var(--yellow)', bg:'var(--yellow-dim)' },
  'low':    { label:'Low',    color:'var(--green)',  bg:'var(--green-dim)'  },
}

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const s = STATUS_CONFIG[task.status]  || STATUS_CONFIG['todo']
  const p = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG['medium']

  const date = new Date(task.createdAt).toLocaleDateString('en-IN', {
    day:'numeric', month:'short', year:'numeric'
  })

  return (
    <div className={`task-card fade-up ${task.status === 'done' ? 'is-done' : ''}`}>
      {/* Header row */}
      <div className="task-card-header">
        <span className="task-priority-badge" style={{ color: p.color, background: p.bg }}>
          {p.label}
        </span>
        <div className="task-actions ms-auto">
          <button className="task-action-btn edit-btn" onClick={() => onEdit(task)} title="Edit">
            <i className="bi bi-pencil" />
          </button>
          <button className="task-action-btn delete-btn" onClick={() => onDelete(task.id)} title="Delete">
            <i className="bi bi-trash" />
          </button>
        </div>
      </div>

      {/* Title */}
      <h5 className={`task-title ${task.status === 'done' ? 'striked' : ''}`}>{task.title}</h5>

      {/* Description */}
      {task.description && (
        <p className="task-desc">{task.description}</p>
      )}

      {/* Footer */}
      <div className="task-card-footer">
        {/* Status selector — dynamic DOM update */}
        <select
          className="form-select form-select-sm task-status-select"
          value={task.status}
          onChange={e => onStatusChange(task.id, e.target.value)}
          style={{ color: s.color, borderColor: s.color + '55' }}
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <span className="task-date">
          <i className="bi bi-calendar3 me-1" />{date}
        </span>
      </div>
    </div>
  )
}