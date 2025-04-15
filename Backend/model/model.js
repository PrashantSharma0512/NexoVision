const mongoose = require('mongoose');

module.exports = (nosql) => ({
    userSchema: nosql.model(
        'FaceSchema',
        new nosql.Schema({
            name: String,
            faceToken: String // Face++ face_token
        })
    ),
    teacher: nosql.model(
        'teacher',
        new nosql.Schema({
            name: { type: String, required: true },
            designation: { type: String, required: true },
            branch: { type: String, required: true },
            email: { type: String, unique: true, required: true },
            phone: { type: Number, unique: true },
            isDeleted: { type: Boolean, default: false }
        })
            .index({ name: 'text', designation: 'text', branch: 'text', email: 'text' })
    ),

    register: nosql.model(
        'register',
        new nosql.Schema({
            name: { type: String, required: true },
            email: { type: String, unique: true, required: true },
            password: { type: String },
            isDeleted: { type: Boolean, default: false },
            role: { type: String, default: 'student', enum: ['admin', 'teacher', 'student'] },
        })
    ),

    attendence: nosql.model(
        'attendence',
        new nosql.Schema({
            rollno: { type: mongoose.Schema.Types.ObjectId, ref: 'register' },  
            date: { type: Date, required: true },
            status: { type: String, enum: ['present', 'absent'], required: true },
            isDeleted: { type: Boolean, default: false }
        })
    ),

    Question: nosql.model(
        'Question',
        new nosql.Schema({
            course_year: { type: String, required: true },
            subject: { type: String, required: true },
            subject_code: { type: String, required: true },
            file_url: { type: String, required: true },
            file_name: { type: String, required: true },
            uploadAt: { type: Date, default: Date.now },
            isDeleted: { type: Boolean, default: false },
            updatedAt: { type: Date, default: Date.now },
        })
    ),
    Notes: nosql.model(
        'Notes',
        new nosql.Schema({
            course_year: { type: String, required: true },
            subject: { type: String, required: true },
            subject_code: { type: String, required: true },
            file_url: { type: String, required: true },
            file_name: { type: String, required: true },
            uploadAt: { type: Date, default: Date.now },
            isDeleted: { type: Boolean, default: false },
            updatedAt: { type: Date, default: Date.now },
        })
    ),


});
