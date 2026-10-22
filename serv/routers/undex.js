const Router = require('express')
const router = new Router();
const userRoutes = require('./userRouters')

router.use('/users', userRoutes)

module.exports = router;