//code and file implemented by sadasivan.
//implemented by sadasivan
// router creation  started here
var express = require('express')
var router = express.Router();
//requiring controller.
var admin_controller = require('../controllers/admin');
var student_controller = require('../controllers/students');
var task_controller = require('../controllers/tasks')

//admin section
// Admin login
router.post('/admin/admin_login', admin_controller.admin_login);
//Admin adds a new student
router.post('/admin/student_creation', student_controller.add_student);
// /Admin assigns a task to a student
router.post('/admin/assign_task_by_admin', task_controller.assign_task_by_admin);
// Admin views all students
router.get('/admin/view_all_students', student_controller.view_all_students);
//admin views tasks assigned to a student
router.get('/admin/admin_view_tasks_by_student', admin_controller.admin_view_tasks_by_student)




//student section
//Student login
router.post('/student/student_login', student_controller.student_login);
//  views tasks assigned to a student
router.get('/student/view_tasks_by_student', task_controller.view_tasks_by_student);
// Student views details of a specific task
router.get('/student/view_task_by_id', task_controller.view_task_by_id);
//Student updates task status to "completed"
router.put('/student/update_task_status', task_controller.update_task_status)


module.exports = router;

// router creation end here