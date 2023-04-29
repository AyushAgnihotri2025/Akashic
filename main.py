import os
import sys
from json import loads

from utils.logs import *

from flask import Flask, render_template, request
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO, emit

from routes.admin.adminRoutes import *
from routes.faculty.facultyRoutes import *
from routes.student.studentRoutes import *
from routes.login.smartLogin import verifyPIN, match

from credentials import ENCRYPTION_KEY

app = Flask(__name__, static_folder='client/build')
app.config['SECRET_KEY'] = 'sEcReT'
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on('connect')
def connect():
    print(f"{fg_blue}Socket Connected....{reset}")

@socketio.on('disconnect')
def dis_connect():
    print(f"{fg_red}Socket Disconnected....{reset}")

# Admin Routes

@socketio.on('admin/login')
def admin_login(json, methods=['GET', 'POST']):
    return adminLogin(loads(json))

@socketio.on('admin/updatepassword')
def admin_update_admin_password(json, methods=['GET', 'POST']):
    return adminUpdatePassword(loads(json))

@socketio.on('admin/createnotice')
def admin_create_notice(json, methods=['GET', 'POST']):
    return adminCreateNotice(loads(json))

@socketio.on('admin/getnotice')
def admin_get_notice(json, methods=['GET', 'POST']):
    return adminGetNotice(loads(json))

@socketio.on('admin/deletenotice')
def admin_delete_notice(json, methods=['GET', 'POST']):
    return adminDeleteNotice(loads(json))

@socketio.on('admin/getalldepartment')
def admin_get_all_department(json, methods=['GET', 'POST']):
    return adminGetAllDepartment(loads(json))

@socketio.on('admin/adddepartment')
def admin_add_department(json, methods=['GET', 'POST']):
    return adminAddDepartment(loads(json))

@socketio.on('admin/deletedepartment')
def admin_delete_department(json, methods=['GET', 'POST']):
    return adminDeleteDepartment(loads(json))

@socketio.on('admin/addfaculty')
def admin_add_faculty(json, methods=['GET', 'POST']):
    return adminAddFaculty(loads(json))

@socketio.on('admin/getfaculty')
def admin_get_faculty(json, methods=['GET', 'POST']):
    return adminGetFaculty(loads(json))

@socketio.on('admin/deletefaculty')
def admin_delete_faculty(json, methods=['GET', 'POST']):
    return adminDeleteFaculty(loads(json))

@socketio.on('admin/getallfaculty')
def admin_get_all_faculty(json, methods=['GET', 'POST']):
    return adminGetAllFaculty(loads(json))

@socketio.on('admin/getalladmin')
def admin_get_all_admin(json, methods=['GET', 'POST']):
    return adminGetAllAdmin(loads(json))

@socketio.on('admin/addsubject')
def admin_add_subject(json, methods=['GET', 'POST']):
    return adminAddSubject(loads(json))

@socketio.on('admin/getsubject')
def admin_get_subject(json, methods=['GET', 'POST']):
    return adminGetSubject(loads(json))

@socketio.on('admin/deletesubject')
def admin_delete_subject(json, methods=['GET', 'POST']):
    return adminDeleteSubject(loads(json))

@socketio.on('admin/addadmin')
def admin_add_admin(json, methods=['GET', 'POST']):
    return adminAddAdmin(loads(json))

@socketio.on('admin/getadmin')
def admin_getadmin(json, methods=['GET', 'POST']):
    return adminGetAdmin(loads(json))

@socketio.on('admin/addstudent')
def admin_add_student(json, methods=['GET', 'POST']):
    return adminAddStudent(loads(json))

@socketio.on('admin/getallstudent')
def admin_get_all_student(json, methods=['GET', 'POST']):
    return adminGetAllStudents(loads(json))

@socketio.on('admin/getstudent')
def admin_get_student(json, methods=['GET', 'POST']):
    return adminGetStudents(loads(json))

@socketio.on('admin/getallsubject')
def admin_get_all_subject(json, methods=['GET', 'POST']):
    return adminGetAllSubject(loads(json))

@socketio.on('admin/deleteadmin')
def admin_delete_admin(json, methods=['GET', 'POST']):
    return adminDeleteAdmin(loads(json))

@socketio.on('admin/deletestudent')
def admin_delete_student(json, methods=['GET', 'POST']):
    return adminDeleteStudent(loads(json))

@socketio.on('admin/updateprofile')
def admin_update_profile(json, methods=['GET', 'POST']):
    return adminUpdateProfile(loads(json))

# Faculty Routes

@socketio.on('faculty/login')
def faculty_login(json, methods=['GET', 'POST']):
    return facultyLogin(loads(json))

@socketio.on('faculty/updatepassword')
def faculty_update_password(json, methods=['GET', 'POST']):
    return facultyUpdatePassword(loads(json))

@socketio.on('faculty/updateprofile')
def faculty_update_profile(json, methods=['GET', 'POST']):
    return facultyUpdateProfile(loads(json))

@socketio.on('faculty/createtest')
def faculty_create_test(json, methods=['GET', 'POST']):
    return facultyCreateTest(loads(json))

@socketio.on('faculty/gettest')
def faculty_get_test(json, methods=['GET', 'POST']):
    return facultyGetTest(loads(json))

@socketio.on('faculty/getalltest')
def faculty_get_all_test(json, methods=['GET', 'POST']):
    return facultyGetAllTest(loads(json))

@socketio.on('faculty/getstudent')
def faculty_get_student(json, methods=['GET', 'POST']):
    return facultyGetStudents(loads(json))

@socketio.on('faculty/uploadmarks')
def faculty_upload_marks(json, methods=['GET', 'POST']):
    return facultyUploadMarks(loads(json))

@socketio.on('faculty/markattendance')
def faculty_mark_attendance(json, methods=['GET', 'POST']):
    return facultyMarkAttendance(loads(json))

# Student Routes

@socketio.on('student/login')
def student_login(json, methods=['GET', 'POST']):
    return studentLogin(loads(json))

@socketio.on('student/updatepassword')
def student_update_password(json, methods=['GET', 'POST']):
    return studentUpdatePassword(loads(json))

@socketio.on('student/updateprofile')
def student_update_profile(json, methods=['GET', 'POST']):
    return studentUpdateProfile(loads(json))

@socketio.on('student/attendance')
def student_get_attendance(json, methods=['GET', 'POST']):
    return studentGetAttendance(loads(json))

@socketio.on('student/testresult')
def student_get_test_results(json, methods=['GET', 'POST']):
    return studentGetTestResults(loads(json))

# Smart Login

@socketio.on('smartlogin/pin')
def smart_login_pin_verify(json, methods=['GET', 'POST']):
    pin = loads(json)["pin"].strip().replace(" - ", "")
    if pin.isdigit():
        return verifyPIN(loads(json)["pin"])
    else:
        return {"success": False, "pinError": "Invalid Security PIN"}

@socketio.on('smartlogin/login')
def smart_login(json, methods=['GET', 'POST']):
    return match(loads(json))


@app.route('/api', methods=['GET', 'POST'])
@cross_origin()
def index():
    return {
        "tutorial": "Flask React Heroku"
    }

# @app.route('/mrayush/akashic/logs', methods=['GET'])
# def logs():
#     if request.args.get('v', type=int) == 1:
#         return open("logs/MrAyush-Akashic.log").read().replace('\n', '<br>')
#     if os.path.exists('logs/MrAyush-Akashic.log'):
#         return """<head>
#             <title>Akashic Logs | Mr. Ayush</title>
#             <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1,minimum-scale=1">
#             <link rel="stylesheet" href="https://cdn.mrayush.me/prism/style.css">
#         </head>
#         <body>
#             <pre><code class="language-bash">%s</code></pre>
#             <script src="https://cdn.mrayush.me/prism/script.js"></script>
#         </body>""" % (open("logs/MrAyush-Akashic.log").read().replace('\n', '<br>'))
#         return 
#     else:
#         return "No Logs"

@app.route('/', defaults={'route': ''}, methods=['GET'])
@app.route('/<path:route>', methods=['GET'])
def serve(route):
    if os.path.exists(app.static_folder + '/' + 'index.html'):
        if route != "" and os.path.exists(app.static_folder + '/' + route):
            return send_from_directory(app.static_folder, route)
        else:
            return send_from_directory(app.static_folder, 'index.html')
    else:
        return send_from_directory("templates/", 'maintainance.html')

if __name__ == '__main__':
    socketio.run(
        app,
        host='0.0.0.0',
	    debug=True,
	    port=8080
    )
