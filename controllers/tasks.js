//implemented by sadasivan
const M_tasks = require('../models/M_tasks');  // Import the Task model
const M_students = require('../models/M_students');  // Import the Student model
const M_admin = require('../models/M_admin');  // Import the Admin model

module.exports = {

    // Admin assigns a task to a student
    assign_task_by_admin: async (req, res) => {
        try {
            const { task_name, description, due_time, student_id } = req.body;

            // Validate input fields
            if (!task_name || !description || !due_time || !student_id) {
                return res.status(400).json({ message: "Please provide all required fields" });
            }

            // Check if the student exists
            const student = await M_students.findById(student_id);

            if (!student) {
                return res.status(400).json({ message: "Student not found" });
            }

            // Check if the admin exists
            const admin = await M_admin.findOne({ role: 'admin' });

            if (!admin) {
                return res.status(400).json({ message: "Admin not found" });
            }

            // Create the task
            const newTask = new M_tasks({
                task_name,
                description,
                due_time,
                student_id,
                admin_id: admin._id,  // Set admin id
                status: 'pending'  // Set initial status as pending
            });

            // Save the task in the database
            await newTask.save();

            res.status(201).json({
                message: " success",
                task: newTask
            });

        } catch (error) {
            console.error(error);

        }
    },



    // views tasks assigned to a student
    view_tasks_by_student: async (req, res) => {
        try {
            var student_id = req.body.student_id // Get the student_id 

            // Find all tasks assigned to the student
            const tasks = await M_tasks.find({ student_id: student_id }).populate('student_id', 'name email department').populate('admin_id', 'email role');

            // If no tasks are found, return an error
            if (tasks.length === 0) {
                return res.status(400).json({ message: "No tasks found for this student" });
            }

            // If tasks are found, return the list of tasks
            res.status(200).json({
                message: "success",
                tasks: tasks
            });

        } catch (error) {
            console.log(error);

        }
    },

    // Student views a specific task details and status
    view_task_by_id: async (req, res) => {
        try {
            const task_id = req.body.task_id;
            const student_id = req.body.student_id;

            // Find the task by task_id and ensure it is assigned to the correct student
            const task = await M_tasks.findOne({ _id: task_id, student_id: student_id }).populate('student_id', 'name email department').populate('admin_id', 'email role');

            if (!task) {
                // If the task is not found or doesn't belong to the student, return an error
                return res.status(400).json({ message: "Task not found or you are not assigned to this task" });
            }

            // If task is found, return the task details and status
            res.status(200).json({
                message: "success",
                task: {
                    task_name: task.task_name,
                    description: task.description,
                    due_time: task.due_time,
                    status: task.status,

                }
            });

        } catch (error) {
            console.log(error);

        }
    },

    // Student updates the task status to "completed"
    update_task_status: async (req, res) => {
        try {
            const task_id = req.body.task_id;
            const student_id = req.body.student_id;

            // Find the task by task_id and ensure it is assigned to the correct student
            const task = await M_tasks.findOne({ _id: task_id, student_id: student_id });

            if (!task) {
                // If the task is not found or doesn't belong to the student, return an error
                return res.status(400).json({ message: "Task not found or you are not assigned to this task" });
            }

            // Check if the task is already completed
            if (task.status === 'completed') {
                return res.status(400).json({ message: "Task is already completed" });
            }

            // Update the task status to "completed"
            task.status = 'completed';
            await task.save();  // Save the updated task

            // Return the updated task details
            res.status(200).json({
                message: "Task status updated to completed",
                task: {
                    task_name: task.task_name,
                    description: task.description,
                    status: task.status,
                    due_time: task.due_time,
                    student_id: task.student_id,
                    admin_id: task.admin_id
                }
            });

        } catch (error) {
            console.log(error);

        }
    }


}
