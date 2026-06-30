require('dotenv').config()
const express = require('express')
const path = require('path')
const routes = require('./routes/formRoutes')

const app = express()
const PORT = process.env.PORT || 3000

// View engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// Body parsers
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Pass app name to all views
app.use((req, res, next) => {
  res.locals.appName = process.env.APP_NAME || 'Cognifyz'
  res.locals.currentPath = req.path
  next()
})

// Routes
app.use('/', routes)

// 404 handler
app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

// Error handler
app.use((err, req, res, next) => {
  console.error("ORIGINAL ERROR:");
  console.error(err);
  res.status(500).send(err.stack);
});

app.listen(PORT, () =>
  console.log(`✅ Cognifyz Task 1 → http://localhost:${PORT}`)
)