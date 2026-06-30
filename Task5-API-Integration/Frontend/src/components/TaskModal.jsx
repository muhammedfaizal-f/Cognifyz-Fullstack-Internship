import { useState, useEffect } from 'react'
import './TaskModal.css'

const EMPTY = { title: '', description: '', status: 'todo', priority: 'medium' }

export default function TaskModal({ show, task, onClose, onSave, saving }) {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (show) {
      setForm(task ? { title: task.title, description: task.description, status: task.status, priority: task.priority } : EMPTY)
      setErrors({})
    }
  }, [show, task])

  const validate = () => {
    const e = {}
    if (!form.title.trim()) e.title = 'Title is required.'
    else if (form.title.trim().length < 3) e.title = 'Title must be at least 3 characters.'
    return e
  }

  const handleSave = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    onSave(form)
  }

  if (!show) return null

  return (
    <div className="t5-modal-backdrop" onClick={onClose}>
      <div className="t5-modal fade-up" onClick={e => e.stopPropagation()}>
        <div className="t5-modal-header">
          <h5 className="t5-modal-title">
            <i className={`bi ${task ? 'bi-pencil-square' : 'bi-plus-square'} me-2`} />
            {task ? 'Edit Task' : 'New Task'}
          </h5>
          <button className="t5-modal-close" onClick={onClose}>
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <div className="t5-modal-body">
          {/* Title */}
          <div className="mb-3">
            <label className="t5-label">Title <span className="text-danger">*</span></label>
            <input
              className={`form-control t5-input ${errors.title ? 'is-invalid' : ''}`}
              placeholder="What needs to be done?"
              value={form.title}
              onChange={e => { setForm(p => ({ ...p, title: e.target.value })); setErrors(p => ({ ...p, title: '' })) }}
            />
            {errors.title && <div className="t5-field-error">{errors.title}</div>}
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="t5-label">Description</label>
            <textarea
              className="form-control t5-input"
              rows={3}
              placeholder="Add more details…"
              value={form.description}
              onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
            />
          </div>

          {/* Status + Priority row */}
          <div className="row g-3">
            <div className="col-6">
              <label className="t5-label">Status</label>
              <select className="form-select t5-input"
                value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div className="col-6">
              <label className="t5-label">Priority</label>
              <select className="form-select t5-input"
                value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value }))}>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="t5-modal-footer">
          <button className="btn t5-cancel-btn" onClick={onClose}>Cancel</button>
          <button className="btn t5-save-btn" onClick={handleSave} disabled={saving}>
            {saving
              ? <><span className="t5-spinner me-2" />Saving…</>
              : <><i className="bi bi-check-lg me-2" />{task ? 'Save Changes' : 'Create Task'}</>}
          </button>
        </div>
      </div>
    </div>
  )
}