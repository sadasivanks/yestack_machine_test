//implemented by sadasivan
const bcrypt = require('bcrypt');
var tb_admin = require('../models/M_admin');  // Import the tb_admin model
const M_tasks = require('../models/M_tasks');// Import the task model
module.exports = {
   
    //admin login use email and password
    admin_login: async (req, res) => {
        try {
            // Extract email and password from the request body
            const { email, password } = req.body;

            // Find the admin by email
            const admin_email = await tb_admin.findOne({ email: email });


            if (!admin_email) {
                // If no admin found, return an error
                return res.status(400).json({ message: "Admin not found" });
            }


            // Compare the provided password with the hashed password stored in the database
            const isPasswordValid = await bcrypt.compare(password, admin_email.password);


            if (!isPasswordValid) {
                // If the password is incorrect, return an error
                return res.status(400).json({ message: "Invalid password" });
            }

            // If login is successful, send a response with admin details
            res.status(200).json({
                message: "Login successful",
                admin: {
                    email: admin_email.email,
                    role: admin_email.role
                }
            });

        } catch (error) {
            console.log(error);

        }
    },

    //admin views tasks assigned to a student
    admin_view_tasks_by_student: async (req, res) => {
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







};
