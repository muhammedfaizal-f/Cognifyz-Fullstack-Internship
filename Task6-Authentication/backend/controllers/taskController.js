const Task = require('../models/Task')

// GET /api/tasks
exports.getAllTasks = async (req, res, next) => {
  try {
    const { status, priority, search } = req.query
    const filter = { user: req.user._id }

    if (status && status !== 'all') filter.status = status
    if (priority && priority !== 'all') filter.priority = priority
    if (search)
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ]

    const tasks = await Task.find(filter).sort({ createdAt: -1 })
    res.json({ success: true, count: tasks.length, data: tasks })
  } catch (err) { next(err) }
}

// GET /api/tasks/:id
exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id })
    if (!task) return res.status(404).json({ success: false, message: 'Task not found.' })
    res.json({ success: true, data: task })
  } catch (err) { next(err) }
}

// POST /api/tasks
exports.createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority } = req.body
    const task = await Task.create({ user: req.user._id, title, description, status, priority })
    res.status(201).json({ success: true, data: task })
  } catch (err) { next(err) }
}

// PUT /api/tasks/:id
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    )
    if (!task) return res.status(404).json({ success: false, message: 'Task not found.' })
    res.json({ success: true, data: task })
  } catch (err) { next(err) }
}

// DELETE /api/tasks/:id
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id })
    if (!task) return res.status(404).json({ success: false, message: 'Task not found.' })
    res.json({ success: true, message: 'Task deleted.' })
  } catch (err) { next(err) }
}