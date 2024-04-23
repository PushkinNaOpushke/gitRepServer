const Router = require('express')
const router = new Router()

const authMiddleware = require('../middleware/authMiddleware')

router.post('/write')
router.get('/read',authMiddleware)

module.exports = router