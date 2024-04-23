const Router = require('express')
const router = new Router()
const OrderController = require('../controllers/ordersController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', /*authMiddleware*/ OrderController.create)
router.get('/', checkRole('ADMIN'))
router.get('/:id', authMiddleware)

module.exports = router


