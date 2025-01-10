const express = require('express');
const router = express.Router();

// Import controller

const teacherController = require('../controllers/teacherController');
router.get('/', async(req,res)=>{
    res.send('teacher routes')
})
router.get('/details',teacherController.Details)
router.post('/create',teacherController.createTeacher)
router.put('/update/:id', teacherController.updateTeacher);
router.delete('/delete/:id', teacherController.deleteTeacher);
module.exports = router;