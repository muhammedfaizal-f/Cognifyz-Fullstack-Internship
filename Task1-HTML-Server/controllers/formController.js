const { validationResult } = require('express-validator')
const { contactSubmissions, registerSubmissions } = require('../data/submissions')

// ── GET Home ──────────────────────────────────────
exports.getHome = (req, res) => {
  res.render('index', {
    title: 'Home',
    submissions: [...contactSubmissions].reverse().slice(0, 5),
    registerCount: registerSubmissions.length,
    contactCount:  contactSubmissions.length,
  })
}

// ── GET Contact ───────────────────────────────────
exports.getContact = (req, res) => {
  res.render('contact', {
    title: 'Contact Us',
    errors: [],
    old: {},
  })
}

// ── POST Contact ──────────────────────────────────
exports.postContact = (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).render('contact', {
      title: 'Contact Us',
      errors: errors.array(),
      old: req.body,
    })
  }

  const { name, email, subject, message } = req.body
  const submission = {
    id:        Date.now(),
    type:      'contact',
    name,
    email,
    subject,
    message,
    createdAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  }
  contactSubmissions.push(submission)

  res.render('success', {
    title:   'Message Sent!',
    type:    'contact',
    heading: 'Message Received!',
    subtext: `Thanks ${name}, we'll get back to you at ${email} shortly.`,
    data:    submission,
  })
}

// ── GET Register ──────────────────────────────────
exports.getRegister = (req, res) => {
  res.render('register', {
    title: 'Register',
    errors: [],
    old: {},
  })
}

// ── POST Register ─────────────────────────────────
exports.postRegister = (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).render('register', {
      title: 'Register',
      errors: errors.array(),
      old: req.body,
    })
  }

  const { name, email, phone, role } = req.body

  // Check duplicate email
  const exists = registerSubmissions.find(u => u.email === email)
  if (exists) {
    return res.status(400).render('register', {
      title: 'Register',
      errors: [{ msg: 'This email is already registered.' }],
      old: req.body,
    })
  }

  const submission = {
    id:        Date.now(),
    type:      'register',
    name,
    email,
    phone,
    role,
    createdAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  }
  registerSubmissions.push(submission)

  res.render('success', {
    title:   'Registration Complete!',
    type:    'register',
    heading: 'You\'re Registered!',
    subtext: `Welcome, ${name}! Your account has been created with ${email}.`,
    data:    submission,
  })
}