const store = require('../data/store')

// GET /api/tasks
exports.getAllTasks = (req, res) => {
  const { status, priority, search } = req.query
  let tasks = store.getAll()

  if (status && status !== 'all')
    tasks = tasks.filter(t => t.status === status)

  if (priority && priority !== 'all')
    tasks = tasks.filter(t => t.priority === priority)

  if (search)
    tasks = tasks.filter(t =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
    )

  res.json({ success: true, count: tasks.length, data: tasks })
}

// GET /api/tasks/:id
exports.getTask = (req, res, next) => {
  const task = store.getById(req.params.id)
  if (!task) return next({ status: 404, message: 'Task not found' })
  res.json({ success: true, data: task })
}

// POST /api/tasks
exports.createTask = (req, res, next) => {
  const { title, description, status = 'todo', priority = 'medium' } = req.body

  if (!title || !title.trim())
    return next({ status: 400, message: 'Title is required.' })
  if (title.trim().length < 3)
    return next({ status: 400, message: 'Title must be at least 3 characters.' })

  const task = store.create({ title: title.trim(), description: description?.trim() || '', status, priority })
  res.status(201).json({ success: true, data: task })
}

// PUT /api/tasks/:id
exports.updateTask = (req, res, next) => {
  const { title, description, status, priority } = req.body

  if (title !== undefined && title.trim().length < 3)
    return next({ status: 400, message: 'Title must be at least 3 characters.' })

  const task = store.update(req.params.id, {
    ...(title       !== undefined && { title: title.trim() }),
    ...(description !== undefined && { description: description.trim() }),
    ...(status      !== undefined && { status }),
    ...(priority    !== undefined && { priority }),
  })
  if (!task) return next({ status: 404, message: 'Task not found' })
  res.json({ success: true, data: task })
}

// DELETE /api/tasks/:id
exports.deleteTask = (req, res, next) => {
  const deleted = store.remove(req.params.id)
  if (!deleted) return next({ status: 404, message: 'Task not found' })
  res.json({ success: true, message: 'Task deleted' })
}