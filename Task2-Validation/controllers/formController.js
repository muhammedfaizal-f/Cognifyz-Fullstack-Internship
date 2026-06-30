const { validationResult } = require('express-validator')
const store = require('../storage/store')

// ── GET Home ──────────────────────────────────────
exports.getHome = (req, res) => {
  res.render('index', {
    title: 'Home',
    stats: store.getStats(),
    recent: store.surveys.slice(0, 3),
  })
}

// ── GET Dashboard ─────────────────────────────────
exports.getDashboard = (req, res) => {
  res.render('dashboard', {
    title: 'Dashboard',
    surveys: store.surveys,
    feedbacks: store.feedbacks,
    stats: store.getStats(),
  })
}

// ── GET Survey ────────────────────────────────────
exports.getSurvey = (req, res) => {
  res.render('survey', { title: 'Survey Form', errors: [], old: {} })
}

// ── POST Survey ───────────────────────────────────
exports.postSurvey = (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).render('survey', {
      title: 'Survey Form',
      errors: errors.array(),
      old: req.body,
    })
  }

  const { name, email, age, gender, occupation, skills, experience, salary, newsletter } = req.body
  const entry = store.addSurvey({
    name, email, age, gender, occupation,
    skills: Array.isArray(skills) ? skills.join(', ') : skills || 'None',
    experience, salary: salary || 'Not specified',
    newsletter: newsletter === 'on' ? 'Yes' : 'No',
  })

  res.render('success', {
    title: 'Survey Submitted!',
    type: 'survey',
    heading: 'Survey Received!',
    subtext: `Thanks ${name}! Your survey response has been stored on the server.`,
    entry,
    totalCount: store.surveys.length,
  })
}

// ── GET Feedback ──────────────────────────────────
exports.getFeedback = (req, res) => {
  res.render('feedback', { title: 'Feedback Form', errors: [], old: {} })
}

// ── POST Feedback ─────────────────────────────────
exports.postFeedback = (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).render('feedback', {
      title: 'Feedback Form',
      errors: errors.array(),
      old: req.body,
    })
  }

  const { name, email, category, rating, title: ftitle, feedback, recommend } = req.body
  const entry = store.addFeedback({
    name, email, category,
    rating, title: ftitle,
    feedback, recommend,
  })

  res.render('success', {
    title: 'Feedback Submitted!',
    type: 'feedback',
    heading: 'Feedback Received!',
    subtext: `Thanks ${name}! Your ${rating}-star feedback has been recorded.`,
    entry,
    totalCount: store.feedbacks.length,
  })
}