const router = require('express').Router()
const { body } = require('express-validator')
const ctrl = require('../controllers/formController')

// ── Survey validation rules ───────────────────────
const surveyRules = [
  body('name').trim().notEmpty().withMessage('Full name is required.')
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters.')
    .matches(/^[A-Za-z\s]+$/).withMessage('Name can only contain letters.'),

  body('email').trim().isEmail().withMessage('Enter a valid email address.'),

  body('age').notEmpty().withMessage('Age is required.')
    .isInt({ min: 16, max: 80 }).withMessage('Age must be between 16 and 80.'),

  body('gender').notEmpty().withMessage('Please select your gender.'),

  body('occupation').trim().notEmpty().withMessage('Occupation is required.')
    .isLength({ min: 2 }).withMessage('Occupation must be at least 2 characters.'),

  body('experience').notEmpty().withMessage('Please select your experience level.'),

  body('skills').custom((val) => {
    const arr = Array.isArray(val) ? val : val ? [val] : []
    if (arr.length === 0) throw new Error('Select at least one skill.')
    return true
  }),
]

// ── Feedback validation rules ─────────────────────
const feedbackRules = [
  body('name').trim().notEmpty().withMessage('Name is required.')
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters.'),

  body('email').trim().isEmail().withMessage('Enter a valid email address.'),

  body('category').notEmpty().withMessage('Please select a category.'),

  body('rating').notEmpty().withMessage('Please provide a rating.')
    .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5.'),

  body('title').trim().notEmpty().withMessage('Feedback title is required.')
    .isLength({ min: 5 }).withMessage('Title must be at least 5 characters.'),

  body('feedback').trim().notEmpty().withMessage('Feedback message is required.')
    .isLength({ min: 30 }).withMessage('Feedback must be at least 30 characters.'),

  body('recommend').notEmpty().withMessage('Please answer the recommendation question.'),
]

// ── Routes ────────────────────────────────────────
router.get('/', ctrl.getHome)
router.get('/dashboard', ctrl.getDashboard)
router.get('/survey', ctrl.getSurvey)
router.post('/survey', surveyRules, ctrl.postSurvey)
router.get('/feedback', ctrl.getFeedback)
router.post('/feedback', feedbackRules, ctrl.postFeedback)

module.exports = router