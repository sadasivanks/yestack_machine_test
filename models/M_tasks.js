// code and file implemented by sadasivan.

// model schema started here
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    task_name: { type: String, required: true },             
    description: { type: String },                            
    due_time: { type: Date },                                 
    status: {
        type: String,
        enum: ['pending', 'overdue', 'completed'],             
        default: 'pending'                                      
    },
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tb_students',                                     
        required: true                                           
    },
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tb_admins',                                       
        required: true                                           
    },
    timestamp: {
        type: Date,
        default: Date.now                                      
    }
});

const M_tasks = mongoose.model('tb_tasks', TaskSchema);
module.exports = M_tasks;

// model schema end here.
