module.exports = (err, req, res, next) => {
  console.error(err)

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(e => e.message).join('. ')
    return res.status(400).json({ success: false, message })
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0]
    return res.status(400).json({ success: false, message: `${field} already in use.` })
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  })
}