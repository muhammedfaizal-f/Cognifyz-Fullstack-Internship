// In-memory store (no DB needed for the task)
let tasks = [
  { id: '1', title: 'Design REST API endpoints', description: 'Plan and document all CRUD routes for the task manager.', status: 'done',        priority: 'high',   createdAt: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: '2', title: 'Build Express server',       description: 'Set up Express with CORS, error handling middleware, and routing.', status: 'done', priority: 'high',   createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: '3', title: 'Connect React frontend',     description: 'Fetch and display tasks from the API using Axios/fetch.', status: 'in-progress', priority: 'high',   createdAt: new Date().toISOString() },
  { id: '4', title: 'Add form validation',        description: 'Validate task title and description before POST/PUT.', status: 'in-progress',   priority: 'medium', createdAt: new Date().toISOString() },
  { id: '5', title: 'Write API documentation',    description: 'Document all endpoints with request/response examples.', status: 'todo',        priority: 'low',    createdAt: new Date().toISOString() },
  { id: '6', title: 'Deploy to production',       description: 'Deploy backend to Render and frontend to Vercel.', status: 'todo',             priority: 'medium', createdAt: new Date().toISOString() },
]

let nextId = 7

module.exports = {
  getAll:   ()      => [...tasks],
  getById:  (id)    => tasks.find(t => t.id === id),
  create:   (data)  => {
    const task = { id: String(nextId++), ...data, createdAt: new Date().toISOString() }
    tasks.push(task)
    return task
  },
  update:   (id, data) => {
    const idx = tasks.findIndex(t => t.id === id)
    if (idx === -1) return null
    tasks[idx] = { ...tasks[idx], ...data, id }
    return tasks[idx]
  },
  remove:   (id) => {
    const idx = tasks.findIndex(t => t.id === id)
    if (idx === -1) return false
    tasks.splice(idx, 1)
    return true
  },
}