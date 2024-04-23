const Router = require('express')
const router = new Router()

const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'))
router.get('/')
router.get('/:id')

module.exports = router