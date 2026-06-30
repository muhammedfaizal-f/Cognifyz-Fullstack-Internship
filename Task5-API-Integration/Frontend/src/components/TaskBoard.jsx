import { useState, useEffect, useCallback } from 'react'
import { taskApi } from '../api/taskApi'
import { pushToast } from './Toast'
import TaskCard from './TaskCard'
import StatsBar from './StatsBar'
import TaskModal from './TaskModal'
import './TaskBoard.css'


export default function TaskBoard({ onApiStatus, triggerAdd }) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')
  const [filterStatus, setFS] = useState('all')
  const [filterPriority, setFP] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editTask, setEditTask] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  // Fetch all tasks
  const fetchTasks = useCallback(async () => {
    try {
      const res = await taskApi.getAll({ status: filterStatus, priority: filterPriority, search })
      setTasks(res.data)
    } catch (err) {
      pushToast({ type: 'error', title: 'Fetch failed', message: err.message })
    } finally {
      setLoading(false)
    }
  }, [filterStatus, filterPriority, search])

  // Check API health on mount
  useEffect(() => {
    onApiStatus('checking')
    taskApi.health()
      .then(() => onApiStatus('online'))
      .catch(() => onApiStatus('offline'))
  }, [])

  useEffect(() => { fetchTasks() }, [fetchTasks])

  useEffect(() => {
    if (triggerAdd > 0) {
      setEditTask(null)
      setModalOpen(true)
    }
  }, [triggerAdd])

  // Create / Update
  const handleSave = async (formData) => {
    setSaving(true)
    try {
      if (editTask) {
        const res = await taskApi.update(editTask.id, formData)
        setTasks(prev => prev.map(t => t.id === editTask.id ? res.data : t))
        pushToast({ type: 'success', title: 'Task updated', message: res.data.title })
      } else {
        const res = await taskApi.create(formData)
        setTasks(prev => [res.data, ...prev])
        pushToast({ type: 'success', title: 'Task created', message: res.data.title })
      }
      setModalOpen(false)
    } catch (err) {
      pushToast({ type: 'error', title: 'Save failed', message: err.message })
    } finally {
      setSaving(false)
    }
  }

  // Delete
  const handleDelete = async (id) => {
    setDeleteId(id)
    try {
      await taskApi.remove(id)
      setTasks(prev => prev.filter(t => t.id !== id))
      pushToast({ type: 'info', title: 'Task deleted' })
    } catch (err) {
      pushToast({ type: 'error', title: 'Delete failed', message: err.message })
    } finally {
      setDeleteId(null)
    }
  }

  // Inline status change — dynamic DOM update
  const handleStatusChange = async (id, status) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t)) // optimistic
    try {
      await taskApi.update(id, { status })
      pushToast({ type: 'success', title: 'Status updated', message: status })
    } catch (err) {
      fetchTasks() // revert on fail
      pushToast({ type: 'error', title: 'Update failed', message: err.message })
    }
  }

  const openCreate = () => { setEditTask(null); setModalOpen(true) }
  const openEdit = (task) => { setEditTask(task); setModalOpen(true) }

  return (
    <div className="task-board container-fluid px-4 py-4">

      {/* Stats */}
      {!loading && <StatsBar tasks={tasks} />}

      {/* Toolbar — Bootstrap grid + custom CSS */}
      <div className="row g-2 align-items-center mb-4 toolbar-row">
        <div className="col-12 col-md-4">
          <div className="search-wrap">
            <i className="bi bi-search search-icon" />
            <input
              className="form-control t5-search"
              placeholder="Search tasks…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="search-clear" onClick={() => setSearch('')}>
                <i className="bi bi-x" />
              </button>
            )}
          </div>
        </div>

        <div className="col-6 col-md-2">
          <select className="form-select t5-filter-select" value={filterStatus} onChange={e => setFS(e.target.value)}>
            <option value="all">All Status</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="col-6 col-md-2">
          <select className="form-select t5-filter-select" value={filterPriority} onChange={e => setFP(e.target.value)}>
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="col-12 col-md-auto ms-md-auto">
          <button className="btn t5-board-add-btn w-100" onClick={openCreate}>
            <i className="bi bi-plus-lg me-2" />New Task
          </button>
        </div>
      </div>

      {/* Task grid */}
      {loading ? (
        <div className="board-loading">
          <div className="board-spinner" />
          <span>Loading tasks from API…</span>
        </div>
      ) : tasks.length === 0 ? (
        <div className="board-empty fade-up">
          <i className="bi bi-inbox board-empty-icon" />
          <h5>No tasks found</h5>
          <p>Try adjusting your filters or add a new task.</p>
          <button className="btn t5-board-add-btn mt-3" onClick={openCreate}>
            <i className="bi bi-plus-lg me-2" />Create your first task
          </button>
        </div>
      ) : (
        <div className="row g-3">
          {tasks.map(task => (
            <div className="col-12 col-sm-6 col-lg-4 fade-up" key={task.id}>
              <TaskCard
                task={task}
                onEdit={openEdit}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
                deleting={deleteId === task.id}
              />
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <TaskModal
        show={modalOpen}
        task={editTask}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        saving={saving}
      />
    </div>
  )
}