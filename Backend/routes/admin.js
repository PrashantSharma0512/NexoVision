const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
router.get('/', (req,res)=>{res.send('<center><h1>I Am The Admin</h1></center>')})
//for the teacher details 
router.get('/teacher-details',adminController.teacherDetails)
module.exports = router