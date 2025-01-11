const { model } = require("mongoose")


const adminController = {}

const teacherDetails = async (req, res) => {
    const Teacher = model('teacher')
    const allTeacher = await Teacher.find({})
    if (allTeacher.length === 0) {
        res.status(404).json({ message: 'No Teacher Data Found' })
    }
    res.status(200).json(allTeacher)
}

adminController.teacherDetails = teacherDetails;

module.exports = adminController
