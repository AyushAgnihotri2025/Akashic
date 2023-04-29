import jwt
import json
import bcrypt
import random
import datetime
from credentials import JWT_SECRET
from bson.objectid import ObjectId
from middleware.auth import auth
from models.encryption import backup_encrypt, backup_decrypt
from models.db import admin, notice, department, faculty, subject, student, keyIdentifier
from models.mailer import Mailer, mail
from models.smartLogin import getNumOfFaces

mailer = Mailer()

def adminLogin(data):
    errors = {"success": False}
    existingAdmin = admin.find_one({"username": data['username']})
    if not existingAdmin:
        errors['usernameError'] = "Admin doesn't exist."
        return errors
    if bcrypt.hashpw(data['password'].encode('utf-8'), existingAdmin['password']) != existingAdmin['password']:
        errors['passwordError'] = "Invalid Credentials"
        return errors
    token = jwt.encode({"exp": datetime.datetime.now(tz=datetime.timezone.utc) + datetime.timedelta(hours=1), "email": str(existingAdmin['email']), "id": str(existingAdmin['_id'])}, JWT_SECRET, algorithm='HS256')
    existingAdmin['_id'] = str(existingAdmin['_id'])
    return {"success": True, "result": existingAdmin, "token": token if isinstance(token, str) else token if isinstance(token, str) else token.decode("utf-8")}

def adminCreateNotice(data):
    errors = {"success": False}
    exisitingNotice = notice.find_one({"topic": data['topic'], "content": data["content"], "date": data["date"]})
    if exisitingNotice:
        errors["noticeError"] = "Notice already created"
        return errors
    newNotice = {
        "topic": data['topic'],
        "date": data['date'],
        "content": data['content'],
        "from": data['from'],
        "noticeFor": data['noticeFor']
    }
    newNotice = notice.insert_one(newNotice).inserted_id
    newNotice = notice.find_one({"_id": newNotice})
    newNotice['_id'] = str(newNotice['_id'])
    return {
        "success": True,
        "message": "Notice created successfully",
        "response": newNotice,
    }

def adminGetNotice(data):
    errors = {"success": False}
    notices = notice.find()
    allnotices = []
    for i in notices:
        i["_id"] = str(i["_id"])
        allnotices.append(i)
    if (len(allnotices) == 0):
        errors["nonoticeError"] = "No Notice Found"
        return errors
    return {"success": True, "result": allnotices}

def adminDeleteNotice(data):
    notice.delete_one({"_id": ObjectId(data["_id"])})
    return {"success": True, "message": "Notice Deleted successfully."}

def adminGetAllDepartment(data):
    departments = department.find()
    alldepartments = []
    for i in departments:
        i["_id"] = str(i["_id"])
        alldepartments.append(i)
    return {"success": True, "result": alldepartments}

def adminAddDepartment(data):
    errors = {"success": False}
    existingDepartment = department.find_one({"department": data["department"]})
    if existingDepartment:
        errors["departmentError"] = "Department already added"
        return errors
    departments = department.count_documents({})
    add = departments + 1
    if add < 9:
        departmentCode = "0" + str(add)
    else:
        departmentCode = str(add)
    newDepartment = {
        "department": data["department"],
        "departmentCode": departmentCode
    }
    newDepartment = department.insert_one(newDepartment).inserted_id
    newDepartment = department.find_one({"_id": newDepartment})
    newDepartment['_id'] = str(newDepartment['_id'])
    return {
      "success": True,
      "message": "Department added successfully",
      "response": newDepartment
    }

def adminDeleteDepartment(data):
    department.delete_one({"department": data["department"]})
    return {"message": "Department Deleted"}

def adminAddFaculty(data):
    errors = {"success": False}
    existingFaculty = faculty.find_one({"email": data["email"]})
    if existingFaculty:
        errors["emailError"] = "Email already exists"
        return errors
    if getNumOfFaces(data["avatar"]) != 1:
        errors["avatarError"] = "Invalid Profile Photo, try uploading a new one."
        return errors
    existingDepartment = department.find_one({"department": data["department"]})
    departmentHelper = existingDepartment["departmentCode"]
    faculties = faculty.count_documents({"department": data["department"]})
    if faculties < 10:
        helper = "00" + str(faculties)
    elif faculties < 100 and faculties > 9:
        helper = "0" + str(faculties)
    else:
        helper = str(faculties)
    date = datetime.datetime.today().year
    components = ["FAC", str(date), departmentHelper, helper]
    username = "".join(components)
    newDob = "-".join(reversed(data["dob"].split("-")))
    hashedPassword = bcrypt.hashpw(newDob.encode('utf-8'), bcrypt.gensalt())
    identifier = random.choice(keyIdentifier.find_one({})["faculty"])
    securityPIN = f'{identifier}{datetime.datetime.strptime(data["dob"], "%Y-%m-%d").strftime("%d%m%y")}'
    hashedSecurityPIN = backup_encrypt(securityPIN)
    newFaculty = {
        "name": data["name"],
        "email": data["email"],
        "password": hashedPassword,
        "securityPIN": hashedSecurityPIN,
        "position": "Faculty",
        "joiningYear": data["joiningYear"],
        "username": username,
        "department": data["department"],
        "avatar": data["avatar"],
        "contactNumber": data["contactNumber"],
        "dob": data["dob"],
        "gender": data["gender"],
        "designation": data["designation"],
        "passwordUpdated": False,
    }
    newFaculty = faculty.insert_one(newFaculty).inserted_id
    newFaculty = faculty.find_one({"_id": newFaculty})
    newFaculty['_id'] = str(newFaculty['_id'])

    mail(mailer, newDob, securityPIN, newFaculty)

    return {
        "success": True,
        "message": "Faculty registerd successfully",
        "response": newFaculty
    }

def adminGetFaculty(data):
    errors = {"success": False}
    faculties = faculty.find({"department": data["department"]})
    allfaculties = []
    for i in faculties:
        i["_id"] = str(i["_id"])
        allfaculties.append(i)
    if len(allfaculties) == 0:
        errors["noFacultyError"] = "No Faculty Found"
        return errors
    return {"success": True, "result": allfaculties}

def adminDeleteFaculty(data):
    faculties = []
    for i in data:
        faculties.append(ObjectId(i))
    faculty.delete_many({"_id": {"$in": faculties}})
    return {"success": True, "message": "Faculty Deleted"}

def adminGetAllFaculty(data):
    faculties = faculty.find()
    allfaculties = []
    for i in faculties:
        i["_id"] = str(i["_id"])
        allfaculties.append(i)
    return {"success": True, "result": allfaculties}

def adminGetAllAdmin(data):
    admins = admin.find()
    alladmins = []
    for i in admins:
        i["_id"] = str(i["_id"])
        alladmins.append(i)
    return {"success": True, "result": alladmins}

def adminAddSubject(data):
    errors = {"success": False}
    existingSubject = subject.find_one({"subjectCode": data["subjectCode"]})
    if existingSubject:
        errors["subjectError"] = "Given Subject is already added"
        return errors
    newSubject = {
        "subjectName": data["subjectName"],
        "subjectCode": data["subjectCode"],
        "year": data["year"],
        "department": data["department"],
        "totalLecturesByFaculty": 0,
        "totalLectures": data["totalLectures"]
    }
    newSubject = subject.insert_one(newSubject).inserted_id
    student.update_many({"department": data["department"], "year": data["year"]}, {'$push': {'subjects': newSubject}}, upsert = True)
    newSubject = subject.find_one({"_id": newSubject})
    newSubject['_id'] = str(newSubject['_id'])
    return {
        "success": True,
        "message": "Subject added successfully",
        "response": newSubject
    }

def adminGetSubject(data, getPure=False, onlyIDs=False):
    data = auth(data)
    if not data["userID"]:
        return {"success": False, "message": "Unauthenticated"}
    errors = {"success": False}
    subjects = subject.find({"department": data["department"], "year": data["year"]})
    allsubjects = []
    if onlyIDs:
        onlySubjectsIDs = []
    if not getPure:
        for i in subjects:
            i["_id"] = str(i["_id"])
            if onlyIDs:
                onlySubjectsIDs.append(ObjectId(i["_id"]))
            allsubjects.append(i)
    if not getPure:
        if len(allsubjects) == 0:
            errors["noSubjectError"] = "No Subject Found"
            return errors
    else:
        return []
    if onlyIDs:
        return onlySubjectsIDs
    return {"success": True, "result": allsubjects}

def adminDeleteSubject(data):
    subjects = []
    for i in data["subjects"]:
        subjects.append(ObjectId(i))
    subject.delete_many({"_id": {"$in": subjects}})
    for delsubject in subjects:
        student.update_many({"department": data["department"], "year": data["year"]}, {'$pull': {'subjects': delsubject}})
    return {"success": True, "message": "Subject Deleted"}

def adminAddAdmin(data):
    errors = {"success": False}
    existingAdmin = admin.find_one({"email": data["email"]})
    if existingAdmin:
        errors["emailError"] = "Email already exists"
        return errors
    if getNumOfFaces(data["avatar"]) != 1:
        errors["avatarError"] = "Invalid Profile Photo, try uploading a new one."
        return errors
    existingDepartment = department.find_one({"department": data["department"]})
    departmentHelper = existingDepartment["departmentCode"]
    admins = admin.count_documents({"department": data["department"]})
    if admins < 10:
        helper = "00" + str(admins)
    elif admins < 100 and admins > 9:
        helper = "0" + str(admins)
    else:
        helper = str(admins)
    date = datetime.datetime.today().year
    components = ["ADM", str(date), departmentHelper, helper]
    username = "".join(components)
    newDob = "-".join(reversed(data["dob"].split("-")))
    hashedPassword = bcrypt.hashpw(newDob.encode('utf-8'), bcrypt.gensalt())
    identifier = random.choice(keyIdentifier.find_one({})["admin"])
    securityPIN = f'{identifier}{datetime.datetime.strptime(data["dob"], "%Y-%m-%d").strftime("%d%m%y")}'
    hashedSecurityPIN = backup_encrypt(securityPIN)
    newAdmin = {
        "name": data["name"],
        "email": data["email"],
        "password": hashedPassword,
        "securityPIN": hashedSecurityPIN,
        "position": "Admin",
        "joiningYear": data["joiningYear"],
        "username": username,
        "department": data["department"],
        "avatar": data["avatar"],
        "contactNumber": data["contactNumber"],
        "dob": data["dob"],
        "passwordUpdated": False,
    }
    newAdmin = admin.insert_one(newAdmin).inserted_id
    newAdmin = admin.find_one({"_id": newAdmin})
    newAdmin['_id'] = str(newAdmin['_id'])

    mail(mailer, newDob, securityPIN, newAdmin)

    return {
        "success": True,
        "message": "Admin registerd successfully",
        "response": newAdmin
    }

def adminGetAdmin(data):
    errors = {"success": False}
    admins = admin.find({"department": data["department"]})
    alladmins = []
    for i in admins:
        i["_id"] = str(i["_id"])
        alladmins.append(i)
    if len(alladmins) == 0:
        errors["noAdminError"] = "No Admin Found"
        return errors
    return {"success": True, "result": alladmins}

def adminUpdatePassword(data):
    errors = {"success": False}
    if data["newPassword"] != data["confirmPassword"]:
        errors["mismatchError"] = "Your password and confirmation password do not match"
        return errors
    existingAdmin = admin.find_one({"email": data["email"]})
    toUpdate = {}
    hashedPassword = bcrypt.hashpw(data["newPassword"].encode('utf-8'), bcrypt.gensalt())
    toUpdate["password"] = hashedPassword
    if not existingAdmin["passwordUpdated"]:
        toUpdate["passwordUpdated"] = True
    admin.update_one({"_id": ObjectId(existingAdmin["_id"])}, {"$set": toUpdate})
    updatedAdmin = admin.find_one({"_id": ObjectId(existingAdmin["_id"])})
    updatedAdmin['_id'] = str(updatedAdmin['_id'])
    return {
        "success": True,
        "message": "Password updated successfully",
        "response": updatedAdmin
    }

def adminAddStudent(data):
    errors = {"success": False}
    existingStudent = student.find_one({"email": data["email"]})
    if existingStudent:
        errors["emailError"] = "Email already exists"
        return errors
    if getNumOfFaces(data["avatar"]) != 1:
        errors["avatarError"] = "Invalid Profile Photo, try uploading a new one."
        return errors
    existingDepartment = department.find_one({"department": data["department"]})
    departmentHelper = existingDepartment["departmentCode"]
    
    students = student.count_documents({"department": data["department"]})
    if students < 10:
        helper = "00" + str(students)
    elif students < 100 and students > 9:
        helper = "0" + str(students)
    else:
        helper = str(students)

    subjects = adminGetSubject(data, getPure=True, onlyIDs=True)

    date = datetime.datetime.today().year
    components = ["STU", str(date), departmentHelper, helper]
    username = "".join(components)
    newDob = "-".join(reversed(data["dob"].split("-")))
    hashedPassword = bcrypt.hashpw(newDob.encode('utf-8'), bcrypt.gensalt())
    identifier = random.choice(keyIdentifier.find_one({})["student"])
    securityPIN = f'{identifier}{datetime.datetime.strptime(data["dob"], "%Y-%m-%d").strftime("%d%m%y")}'
    hashedSecurityPIN = backup_encrypt(securityPIN)
    newStudent = {
        "name": data["name"],
        "email": data["email"],
        "avatar": data["avatar"],
        "dob": data["dob"],
        "password": hashedPassword,
        "securityPIN": hashedSecurityPIN,
        "position": "Student",
        "year": data["year"],
        "subjects": subjects,
        "username": username,
        "gender": data["gender"],
        "fatherName": data["fatherName"],
        "motherName": data["motherName"],
        "department": data["department"],
        "batch": data["batch"],
        "section": data["section"],
        "contactNumber": data["contactNumber"],
        "fatherContactNumber": data["fatherContactNumber"],
        "motherContactNumber": data["motherContactNumber"],
        "passwordUpdated": False
    }
    
    newStudent = student.insert_one(newStudent).inserted_id
    newStudent = student.find_one({"_id": newStudent})
    newStudent['_id'] = str(newStudent['_id'])

    mail(mailer, newDob, securityPIN, newStudent)

    return {
        "success": True,
        "message": "Student registerd successfully",
        "response": newStudent
    }

def adminGetAllStudents(data):
    students = student.find()
    allstudents = []
    for i in students:
        i["_id"] = str(i["_id"])
        i["subjects"] = list(map(str, i["subjects"]))
        allstudents.append(i)
    return {"success": True, "result": allstudents}

def adminGetStudents(data):
    errors = {"success": False}
    students = student.find({"department": data["department"], "year": data["year"]})
    allstudents = []
    for i in students:
        i["_id"] = str(i["_id"])
        i["subjects"] = list(map(str, i["subjects"]))
        allstudents.append(i)
    if len(allstudents) == 0:
        errors["noStudentError"] = "No Student Found"
        return errors
    return {"success": True, "result": allstudents}

def adminGetAllSubject(data):
    subjects = subject.find()
    allsubjects = []
    for i in subjects:
        i["_id"] = str(i["_id"])
        allsubjects.append(i)
    return {"success": True, "result": allsubjects}

def adminDeleteAdmin(data):
    admins = []
    for i in data:
        admins.append(ObjectId(i))
    admin.delete_many({"_id": {"$in": admins}})
    return {"success": True, "message": f"Admin{'s' if len(admins)>1 else ''} Deleted"}

def adminDeleteStudent(data):
    students = []
    for i in data:
        students.append(ObjectId(i))
    student.delete_many({"_id": {"$in": students}})
    return {"success": True, "message": f"Student{'s' if len(students)>1 else ''} Deleted"}

def adminUpdateProfile(data):
    data = auth(data)
    errors = {"success": False}
    if not data["userID"]:
        return {"success": False, "message": "Unauthenticated"}
    existingAdmin = admin.find_one({"email": data["email"]})
    updatedAdmin = {"success": True}
    if name := data["name"]:
        updatedAdmin["name"] = name
    if dob := data["dob"]:
        updatedAdmin["dob"] = dob
    if department := data["department"]:
        updatedAdmin["department"] = department
    if contactNumber := data["contactNumber"]:
        updatedAdmin["contactNumber"] = contactNumber
    if avatar := data["avatar"]:
        if getNumOfFaces(data["avatar"]) != 1:
            errors["message"] = "Invalid Profile Photo, try uploading a new one."
            return errors
        updatedAdmin["avatar"] = avatar
    admin.update_one({"_id": ObjectId(existingAdmin["_id"])}, {"$set": updatedAdmin})
    updatedAdmin = admin.find_one({"_id": ObjectId(existingAdmin["_id"])})
    updatedAdmin['_id'] = str(updatedAdmin['_id'])
    return {"success": True, "result": updatedAdmin}