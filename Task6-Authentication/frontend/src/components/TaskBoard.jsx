import { useState, useEffect, useCallback } from 'react'
import api from '../api/axios'
import { pushToast } from './Toast'
import TaskCard from './TaskCard'
import StatsBar from './StatsBar'
import TaskModal from './TaskModal'
import './TaskBoard.css'

export default function TaskBoard({ triggerAdd }) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')
  const [filterStatus, setFS] = useState('all')
  const [filterPriority, setFP] = useState('all')
  const [modalOpen, setModal] = useState(false)
  const [editTask, setEditTask] = useState(null)

  const fetchTasks = useCallback(async () => {
    try {
      const params = {}
      if (filterStatus !== 'all') params.status = filterStatus
      if (filterPriority !== 'all') params.priority = filterPriority
      if (search) params.search = search
      const res = await api.get('/tasks', { params })
      setTasks(res.data)
    } catch (err) {
      pushToast({ type: 'error', title: 'Fetch failed', message: err.message })
    } finally {
      setLoading(false)
    }
  }, [filterStatus, filterPriority, search])

  useEffect(() => { fetchTasks() }, [fetchTasks])

  // Navbar "New Task" button
  useEffect(() => { if (triggerAdd > 0) { setEditTask(null); setModal(true) } }, [triggerAdd])

  const handleSave = async (data) => {
    setSaving(true)
    try {
      if (editTask) {
        const res = await api.put(`/tasks/${editTask._id}`, data)
        setTasks(p => p.map(t => t._id === editTask._id ? res.data : t))
        pushToast({ type: 'success', title: 'Task updated', message: res.data.title })
      } else {
        const res = await api.post('/tasks', data)
        setTasks(p => [res.data, ...p])
        pushToast({ type: 'success', title: 'Task created', message: res.data.title })
      }
      setModal(false)
    } catch (err) {
      pushToast({ type: 'error', title: 'Save failed', message: err.message })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`)
      setTasks(p => p.filter(t => t._id !== id))
      pushToast({ type: 'info', title: 'Task deleted' })
    } catch (err) {
      pushToast({ type: 'error', title: 'Delete failed', message: err.message })
    }
  }

  const handleStatusChange = async (id, status) => {
    setTasks(p => p.map(t => t._id === id ? { ...t, status } : t))
    try {
      await api.put(`/tasks/${id}`, { status })
      pushToast({ type: 'success', title: 'Status updated', message: status })
    } catch (err) {
      fetchTasks()
      pushToast({ type: 'error', title: 'Update failed', message: err.message })
    }
  }

  return (
    <div className="t6-board container-fluid px-4 py-4">
      {!loading && <StatsBar tasks={tasks} />}

      {/* Toolbar */}
      <div className="row g-2 align-items-center mb-4 t6-toolbar">
        <div className="col-12 col-md-4">
          <div className="t6-search-wrap">
            <i className="bi bi-search t6-search-ico" />
            <input className="form-control t6-search" placeholder="Search tasks…"
              value={search} onChange={e => setSearch(e.target.value)} />
            {search && <button className="t6-search-clear" onClick={() => setSearch('')}><i className="bi bi-x" /></button>}
          </div>
        </div>
        <div className="col-6 col-md-2">
          <select className="form-select t6-sel" value={filterStatus} onChange={e => setFS(e.target.value)}>
            <option value="all">All Status</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div className="col-6 col-md-2">
          <select className="form-select t6-sel" value={filterPriority} onChange={e => setFP(e.target.value)}>
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="col-12 col-md-auto ms-md-auto">
          <button className="btn t6-add-task-btn w-100" onClick={() => { setEditTask(null); setModal(true) }}>
            <i className="bi bi-plus-lg me-2" />New Task
          </button>
        </div>
      </div>

      {loading ? (
        <div className="t6-loading">
          <div className="t6-spinner" />
          <span>Loading your tasks from MongoDB…</span>
        </div>
      ) : tasks.length === 0 ? (
        <div className="t6-empty fade-up">
          <i className="bi bi-inbox t6-empty-icon" />
          <h5>No tasks yet</h5>
          <p>Create your first task to get started.</p>
          <button className="btn t6-add-task-btn mt-3" onClick={() => { setEditTask(null); setModal(true) }}>
            <i className="bi bi-plus-lg me-2" />Create Task
          </button>
        </div>
      ) : (
        <div className="row g-3">
          {tasks.map(task => (
            <div className="col-12 col-sm-6 col-lg-4 fade-up" key={task._id}>
              <TaskCard
                task={task}
                onEdit={(t) => { setEditTask(t); setModal(true) }}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            </div>
          ))}
        </div>
      )}

      <TaskModal
        show={modalOpen}
        task={editTask}
        onClose={() => setModal(false)}
        onSave={handleSave}
        saving={saving}
      />
    </div>
  )
}