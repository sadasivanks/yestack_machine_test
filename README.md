# API Endpoints

## Admin Endpoints
1. api for Admin adds a new student (Method : POST)

localhost:3000/admin/student_creation
{
  "name":"student_five", 
  "email":"student_five@gmail.com",
  "department":"english",
  "password":"student_five"
}

---------------------------------------------------------------------------
2.api for  Admin assigns a task to a student (Method : POST)
localhost:3000/admin/assign_task_by_admin
{

  "task_name":"maths_homework", 
  "description":"maths new homework",
  "due_time":"2024-04-01",
  "student_id":"67dfa04c0f545c521149f72a"
}



-----------------------------------------------


3.admin views tasks assigned to a student (Method : GET)

localhost:3000/admin/admin_view_tasks_by_student
{
  "student_id":"67dfa0290f545c521149f723"
}



---------------------------------------------------

4.api for student login use email and password  (Method : POST)

localhost:3000/student/student_login
{
  
  "email":"student_three@gmail.com",
  "password":"student_three"
}


------------------------------------------------

5.api for  views tasks assigned to a student (Method : GET)

localhost:3000/student/view_tasks_by_student
{
  
  "student_id":"67dfa04c0f545c521149f72a"
  
}


----------------------------------------------------


6.api for Student views a specific task details and status (Method : GET)

localhost:3000/student/view_task_by_id

{
  
  "student_id":"67dfa0640f545c521149f730",
  "task_id":"67dfa0ffa89415922e94010b"
  
}


------------------------------------------------------
7.api for student updates task status to "completed" (Method : PUT)

localhost:3000/student/update_task_status

{
  
  "student_id":"67dfa0640f545c521149f730",
  "task_id":"67dfa0ffa89415922e94010b"
  
}
---------------------------------------------------------


8.api for admin login use email and password (Method : POST)
localhost:3000/amin/admin_login
{
  
  "email":"admin@admin.com",
  "password":"admin"
}
-----------------------------------------------------------
9.Admin views all students (Method : GET)

localhost:3000/amin/view_all_students

{


}

---------------------------------------------------

