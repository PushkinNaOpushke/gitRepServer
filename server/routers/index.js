const Router = require('express')
const router = new Router()

const OrdersRouter = require('./ordersRouter')
const PAS_Router = require('./pasRouter')
const UserRouter = require('./userRouter')
const UserInfoRouter = require('./userInfoRouter')

router.use('/user', UserRouter)
router.use('/user/info', UserInfoRouter)
router.use('/order', OrdersRouter)
router.use('/pas', PAS_Router)


module.exports = router