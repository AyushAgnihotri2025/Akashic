import jwt
import json
import bcrypt
import datetime
from credentials import JWT_SECRET
from bson.objectid import ObjectId
from middleware.auth import auth
from models.db import faculty, subject, student, test, marks, attendance

def facultyLogin(data):
    errors = {"success": False}
    existingFaculty = faculty.find_one({"username": data['username']})
    if not existingFaculty:
        errors['usernameError'] = "Faculty doesn't exist."
        return errors
    if bcrypt.hashpw(data['password'].encode('utf-8'), existingFaculty['password']) != existingFaculty['password']:
        errors['passwordError'] = "Invalid Credentials"
        return errors
    token = jwt.encode({"exp": datetime.datetime.now(tz=datetime.timezone.utc) + datetime.timedelta(hours=1), "email": str(existingFaculty['email']), "id": str(existingFaculty['_id'])}, JWT_SECRET, algorithm='HS256')
    existingFaculty['_id'] = str(existingFaculty['_id'])
    return {"success": True, "result": existingFaculty, "token": token if isinstance(token, str) else token if isinstance(token, str) else token.decode("utf-8")}

def facultyUpdatePassword(data):
    errors = {"success": False}
    if data["newPassword"] != data["confirmPassword"]:
        errors["mismatchError"] = "Your password and confirmation password do not match"
        return errors
    existingfaculty = faculty.find_one({"email": data["email"]})
    toUpdate = {}
    hashedPassword = bcrypt.hashpw(data["newPassword"].encode('utf-8'), bcrypt.gensalt())
    toUpdate["password"] = hashedPassword
    if not existingfaculty["passwordUpdated"]:
        toUpdate["passwordUpdated"] = True
    faculty.update_one({"_id": ObjectId(existingfaculty["_id"])}, {"$set": toUpdate})
    updatedfaculty = faculty.find_one({"_id": ObjectId(existingfaculty["_id"])})
    updatedfaculty['_id'] = str(updatedfaculty['_id'])
    return {
        "success": True,
        "message": "Password updated successfully",
        "response": updatedfaculty
    }

def facultyUpdateProfile(data):
    data = auth(data)
    if not data["userID"]:
        return {"success": False, "message": "Unauthenticated"}
    existingFaculty = faculty.find_one({"email": data["email"]})
    updatedFaculty = {"success": True}
    if name := data["name"]:
        updatedFaculty["name"] = name
    if dob := data["dob"]:
        updatedFaculty["dob"] = dob
    if department := data["department"]:
        updatedFaculty["department"] = department
    if contactNumber := data["contactNumber"]:
        updatedFaculty["contactNumber"] = contactNumber
    if designation := data["designation"]:
        updatedFaculty["designation"] = designation
    if avatar := data["avatar"]:
        if getNumOfFaces(data["avatar"]) != 1:
            errors["message"] = "Invalid Profile Photo, try uploading a new one."
            return errors
        updatedFaculty["avatar"] = avatar
    faculty.update_one({"_id": ObjectId(existingFaculty["_id"])}, {"$set": updatedFaculty})
    updatedFaculty = faculty.find_one({"_id": ObjectId(existingFaculty["_id"])})
    updatedFaculty['_id'] = str(updatedFaculty['_id'])
    return {"success": True, "result": updatedFaculty}

def facultyCreateTest(data):
    errors = {"success": False}
    existingTest = test.find_one({"subjectCode": data['subjectCode'], "department": data["department"], "year": data["year"], "section": data['section'], "test": data["test"]})
    if existingTest:
        errors["testError"] = "Given Test is already created"
        return errors
    newTest = {
        "totalMarks": data['totalMarks'],
        "section": data['section'],
        "test": data['test'],
        "date": data['date'],
        "department": data['department'],
        "subjectCode": data['subjectCode'],
        "year": data['year'],
    }
    newTest = test.insert_one(newTest).inserted_id
    newTest = test.find_one({"_id": newTest})
    newTest['_id'] = str(newTest['_id'])
    return {
        "success": True,
        "message": "Test added successfully",
        "response": newTest,
    }

def facultyGetTest(data):
    errors = {"success": False}
    Tests = test.find({"department": data["department"], "year": data["year"], "section": data["section"]})
    allTests = []
    for i in Tests:
        i["_id"] = str(i["_id"])
        allTests.append(i)
    if len(allTests) == 0:
        errors["noTestError"] = "No Test Found"
        return errors
    return {"success": True, "result": allTests}

def facultyGetAllTest(data):
    Tests = test.find({"department": data["department"]})
    allTests = []
    for i in Tests:
        i["_id"] = str(i["_id"])
        allTests.append(i)
    return {"success": True, "result": allTests}

def facultyGetStudents(data):
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

def facultyUploadMarks(data):
    errors = {"success": False}
    existingTest = test.find_one({"department": data["department"], "year": data["year"], "section": data['section'], "test": data["test"]})
    existingTestMarks = marks.find({"exam": ObjectId(existingTest["_id"])})
    if len(list(existingTestMarks)) != 0:
        errors["TestMarksError"] = "You have already uploaded marks of given exam"
        return errors
    for i in data['marks']:
        newMarks = {
            "student": ObjectId(i['_id']),
            "exam": ObjectId(existingTest['_id']),
            "marks": i['value'],
        }
        newMarks = marks.insert_one(newMarks)
    return {
        "success": True,
        "message": "Marks uploaded successfully",
    }

def facultyMarkAttendance(data):
    errors = {"success": False}
    sub = subject.find_one({"subjectName": data["subjectName"]})
    allStudents = student.find({"department": data["department"], "year": data["year"], "section": data['section']})

    sub["totalLecturesByFaculty"] = sub["totalLecturesByFaculty"] + 1
    subject.update_one({"_id": ObjectId(sub["_id"])},{"$set": sub})

    for i in allStudents:
        pre = attendance.find_one({"student": ObjectId(i['_id']), "subject": ObjectId(sub["_id"])})
        if (not pre):
            attendence = {
                "student": ObjectId(i['_id']),
                "subject": ObjectId(sub["_id"]),
                "totalLecturesByFaculty": sub["totalLecturesByFaculty"],
            }
            attendence["totalLecturesByFaculty"] += 1
            attendence = attendance.insert_one(attendence)
        else:
            pre["totalLecturesByFaculty"]+=1
            pre = attendance.update_one({"_id": ObjectId(pre["_id"])},{"$set": pre})

    for i in data['selectedStudents']:
        pre = attendance.find_one({"student": ObjectId(i), "subject": ObjectId(sub["_id"])})
        if (not pre):
            attendence = {
                "student": ObjectId(i),
                "subject": ObjectId(sub["_id"]),
                "lectureAttended": 0,
            }
            attendence["lectureAttended"] += 1
            attendence = attendance.insert_one(attendence)
        else:
            pre["lectureAttended"] += 1
            pre = attendance.update_one({"_id": ObjectId(pre["_id"])}, {"$set": pre})
    return {
        "success": True,
        "message": "Attendance Marked successfully",
    }