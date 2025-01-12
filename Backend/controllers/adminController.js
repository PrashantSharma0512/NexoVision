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
const deleteTeacher = async (req, res) => {
    try {
        const Teacher = model('teacher'); 
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Teacher ID is required' });
        }
        const result = await Teacher.deleteOne({ _id: id });

        if (result.nModified === 0) {
            return res.status(404).json({ error: 'Teacher not found or already deleted' });
        }

        res.status(200).json({ message: 'Teacher marked as deleted successfully' });
    } catch (error) {
        console.error('Error deleting teacher:', error);
        res.status(500).json({ error: 'Failed to delete teacher' });
    }
};
adminController.teacherDetails = teacherDetails;
adminController.deleteTeacher = deleteTeacher;
module.exports = adminController
