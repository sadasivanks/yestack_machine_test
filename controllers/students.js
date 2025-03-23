//implemented by sadasivan
const bcrypt = require('bcrypt');
const M_students = require('../models/M_students');// Import the Student model

module.exports = {
    // Admin adds a new student
    add_student: async (req, res) => {
        try {
            const { name, email, department, password } = req.body;

            // Check if the student with this email already exists
            const existingStudent = await M_students.findOne({ email });
            if (existingStudent) {
                return res.status(400).json({ message: "Email already exists" });
            }

            // Hash the password before saving
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new student record
            const newStudent = new M_students({
                name,
                email,
                department,
                password: hashedPassword // Store the hashed password
            });

            // Save the new student to the database
            await newStudent.save();

            // Send response
            res.status(200).json({ message: "Success", student: { name, email, department } });
        } catch (error) {
            console.log(error);

        }
    },


    //student login use email and password
    student_login: async (req, res) => {
        try {
            // Get email and password from the request body
            const { email, password } = req.body;


            // Find the student by email
            const student = await M_students.findOne({ email: email });

            // If student is not found, return an error
            if (!student) {
                return res.status(400).json({ message: "Student not found" });
            }

            // Compare the provided password with the hashed password in the database
            const isPasswordValid = await bcrypt.compare(password, student.password);

            // If the password is invalid, return an error
            if (!isPasswordValid) {
                return res.status(400).json({ message: "Invalid password" });
            }

            // If login is successful, return the student details (excluding password)
            res.status(200).json({
                message: "Login successful",
                student: {
                    email: student.email,
                    name: student.name,
                    department: student.department
                }
            });

        } catch (error) {
            console.log(error);

        }
    },



    // Admin views all students
    view_all_students: async (req, res) => {
        try {
            // Fetch all students from the database
            const students = await M_students.find().select('-password -timestamp');

            // If no students are found, return an error
            if (students.length === 0) {
                return res.status(400).json({ message: "No students found" });
            }

            // If students are found, return the list of students
            res.status(200).json({
                message: "success",
                students: students
            });

        } catch (error) {
            console.log(error);

        }
    },



};
