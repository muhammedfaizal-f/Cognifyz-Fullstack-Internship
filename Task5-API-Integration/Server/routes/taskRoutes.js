const router = require('express').Router()
const controller = require('../controllers/taskController')

router.get('/', controller.getAllTasks)
router.get('/:id', controller.getTask)
router.post('/', controller.createTask)
router.put('/:id', controller.updateTask)
router.delete('/:id', controller.deleteTask)

module.exports = router