const express = require('express');
const router = express.Router();

// Import controller

const teacherController = require('../controllers/teacherController');
router.get('/', async(req,res)=>{
    res.send('teacher routes')
})
//get the details 
router.get('/details',teacherController.Details)
// Create a new teacher
router.post('/create',teacherController.createTeacher)
// Update a teacher
router.put('/update/:id', teacherController.updateTeacher);
// Delete a teacher
router.delete('/delete/:id', teacherController.deleteTeacher);
module.exports = router;