const router = require('express').Router()
const controller = require('../controllers/taskController')
const protect = require('../middleware/auth')

// All task routes are protected
router.use(protect)

router.get('/', controller.getAllTasks)
router.get('/:id', controller.getTask)
router.post('/', controller.createTask)
router.put('/:id', controller.updateTask)
router.delete('/:id', controller.deleteTask)

module.exports = router