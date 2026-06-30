const jwt = require('jsonwebtoken')
const User = require('../models/User')

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })

// POST /api/auth/register
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password)
      return res.status(400).json({ success: false, message: 'All fields are required.' })

    if (password.length < 8)
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters.' })

    const user = await User.create({ name, email, password })
    const token = signToken(user._id)

    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email },
    })
  } catch (err) {
    console.error("===== REGISTER ERROR =====");
    console.error("Name:", err.name);
    console.error("Message:", err.message);
    console.error("Errors:", err.errors);
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
      name: err.name
    });
  }
}

// POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Email and password are required.' })

    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ success: false, message: 'Invalid email or password.' })

    const token = signToken(user._id)

    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email },
    })
  } catch (err) {
    console.error("===== LOGIN ERROR =====");
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// GET /api/auth/me
exports.getMe = async (req, res) => {
  res.json({ success: true, user: { id: req.user._id, name: req.user.name, email: req.user.email } })
}