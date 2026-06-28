require('dotenv').config()
const express = require('express')
const path    = require('path')
const routes  = require('./routes/formRoutes')

const app  = express()
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Globals for all views
app.use((req, res, next) => {
  res.locals.appName     = process.env.APP_NAME || 'Cognifyz'
  res.locals.currentPath = req.path
  next()
})

app.use('/', routes)

// 404
app.use((req, res) =>
  res.status(404).render('index', { title: '404', stats: {}, recent: [] })
)

// Error
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).render('index', { title: 'Error', stats: {}, recent: [] })
})

app.listen(PORT, () =>
  console.log(`✅ Cognifyz Task 2 → http://localhost:${PORT}`)
)