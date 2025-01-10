const mongoose = require('mongoose');

module.exports = (nosql) => ({
    User: nosql.model(
        'User',
        new nosql.Schema({
            name: { type: String, required: true },
            email: { type: String, required: true, unique: true },
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
            isDeleted: {type : Boolean, default:false}
        })
        .index({ name: 'text', designation: 'text', branch: 'text',email:'text' })
    ),
});
