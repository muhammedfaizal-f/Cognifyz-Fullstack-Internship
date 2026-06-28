const router = require('express').Router()
const { body } = require('express-validator')
const ctrl = require('../controllers/formController')

// ── Validation rules ─────────────────────────────
const contactRules = [
    body('name').trim().notEmpty().withMessage('Name is required.')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters.'),
    body('email').trim().notEmpty().withMessage('Email is required.')
        .isEmail().withMessage('Enter a valid email address.'),
    body('subject').trim().notEmpty().withMessage('Subject is required.')
        .isLength({ min: 5 }).withMessage('Subject must be at least 5 characters.'),
    body('message').trim().notEmpty().withMessage('Message is required.')
        .isLength({ min: 20 }).withMessage('Message must be at least 20 characters.'),
]

const registerRules = [
    body('name').trim().notEmpty().withMessage('Full name is required.')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters.')
        .matches(/^[A-Za-z\s]+$/).withMessage('Name can only contain letters.'),
    body('email').trim().notEmpty().withMessage('Email is required.')
        .isEmail().withMessage('Enter a valid email address.'),
    body('phone').trim().notEmpty().withMessage('Phone number is required.')
        .matches(/^[6-9]\d{9}$/).withMessage('Enter a valid 10-digit Indian mobile number.'),
    body('password').notEmpty().withMessage('Password is required.')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters.')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter.')
        .matches(/[0-9]/).withMessage('Password must contain at least one number.'),
    body('role').notEmpty().withMessage('Please select a role.'),
]

// ── Routes ────────────────────────────────────────
router.get('/', ctrl.getHome)
router.get('/contact', ctrl.getContact)
router.post('/contact', contactRules, ctrl.postContact)
router.get('/register', ctrl.getRegister)
router.post('/register', registerRules, ctrl.postRegister)

module.exports = router