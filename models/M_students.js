
//code and file implemented by sadasivan.
//model schema started here.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    password: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const M_students = mongoose.model('tb_students', StudentSchema);
module.exports = M_students;


//model schema end here.

