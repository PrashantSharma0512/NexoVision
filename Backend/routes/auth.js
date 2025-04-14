const router = require('express').Router()
const {register, login} = require('../utils/auth')



router.post('/login',login )
router.post('/register', register)

module.exports = router