const express = require('express')
const cors = require('cors')
const taskRoutes = require('./routes/taskRoutes')
const errorHandler = require('./middleware/errorHandler')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

// Health check
app.get('/api/health', (req, res) =>
  res.json({ success: true, message: 'Cognifyz Task 5 API is running 🚀' })
)

app.use('/api/tasks', taskRoutes)
app.use(errorHandler)

app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
)