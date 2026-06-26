require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const taskRoutes = require('./routes/taskRoutes')
const errorHandler = require('./middleware/errorHandler')

connectDB()


const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())

app.get('/api/health', (req, res) =>
    res.json({ success: true, message: '🚀 Cognifyz Task 6 API running' })
)

app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)
app.use(errorHandler)

app.listen(PORT, () => console.log(`✅ Server → http://localhost:${PORT}`))
