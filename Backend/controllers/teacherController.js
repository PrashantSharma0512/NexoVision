const { model } = require('mongoose');
const teacherController = {};

const Details = async (req, res) => {
    try {
        const Teacher = model('teacher'); 
        const result = await Teacher.find({isDeleted: false}).select('-isDeleted'); 

        if (result.length === 0) {
            return res.status(404).json({ message: 'No active teachers found' });
        }
        res.status(200).json(result); 
    } catch (error) {
        console.error('Error fetching teacher details:', error);
        res.status(500).json({ error: 'Failed to fetch teacher details' });
    }
};
const updateTeacher = async (req, res) => {
    try {
        const Teacher = model('teacher');
        const { id } = req.params;
        const { name, branch, designation, email, phone } = req.body;

        const updatedTeacher = await Teacher.findByIdAndUpdate(id,
            {name, branch, designation, email, phone }
        );

        if (!updatedTeacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }
        res.status(200).json(updatedTeacher);
    } catch (error) {
        console.error('Error updating teacher:', error);
        res.status(500).json({ error: 'Failed to update teacher details' });
    }
};
const createTeacher = async (req, res) => {
    try {
        const Teacher = model('teacher');
        const { name, branch, designation, email, phone } = req.body;

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }
        // Check if the email already exists
        const existingTeacher = await Teacher.findOne({ $or: [{ email }, { phone }] });
        
        if (existingTeacher) {
            // Check which field caused the conflict
            if (existingTeacher.email === email) {
                return res.status(400).json({ error: 'Email already in use' });
            }
            if (existingTeacher.phone === phone) {
                return res.status(400).json({ error: 'Phone number already in use' });
            }
        }
        const newTeacher = await Teacher.create({ name, branch, designation, email, phone });

        res.status(201).json(newTeacher);
    } catch (error) {
        console.error('Error creating teacher:', error);

        // Check for validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: 'Validation Error', details: error.errors });
        }

        // Handle other errors
        res.status(500).json({ error: 'Failed to create teacher' });
    }
};
const deleteTeacher = async (req, res) => {
    try {
        const Teacher = model('teacher'); 
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Teacher ID is required' });
        }
        const result = await Teacher.updateOne({ _id: id }, { $set: { isDeleted: true } });

        if (result.nModified === 0) {
            return res.status(404).json({ error: 'Teacher not found or already deleted' });
        }

        res.status(200).json({ message: 'Teacher marked as deleted successfully' });
    } catch (error) {
        console.error('Error deleting teacher:', error);
        res.status(500).json({ error: 'Failed to delete teacher' });
    }
};
const searchTeachers = async (req, res) => {
    try {
        const Teacher = model('teacher');
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ error: 'Search query is required' });
        }
        const result = await Teacher.find({
            $text: { $search: query },
            isDeleted: false // Exclude deleted teachers
        });

        if (result.length === 0) {
            return res.status(404).json({ message: 'No matching teachers found' });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error('Error searching for teachers:', error);
        res.status(500).json({ error: 'Failed to search teachers' });
    }
};


teacherController.Details = Details;
teacherController.updateTeacher = updateTeacher;
teacherController.createTeacher = createTeacher;
teacherController.deleteTeacher = deleteTeacher;
teacherController.searchTeachers = searchTeachers;

module.exports = teacherController;
