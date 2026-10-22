const Router = require('express');
const userController = require('../controllers/userControllers');
const router = new Router();

router.post('/login', userController.login)
router.post('/register', userController.register)

module.exports = router;