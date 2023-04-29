import jwt
import json
import bcrypt
import datetime
from credentials import JWT_SECRET
from bson.objectid import ObjectId
from middleware.auth import auth
from models.db import subject, student, attendance, test, marks

def studentLogin(data):
    errors = {"success": False}
    existingStudent = student.find_one({"username": data['username']})
    if not existingStudent:
        errors['usernameError'] = "Student doesn't exist."
        return errors
    print("Password is ", data['password'])
    if bcrypt.hashpw(data['password'].encode('utf-8'), existingStudent['password']) != existingStudent['password']:
        errors['passwordError'] = "Invalid Credentials"
        return errors
    token = jwt.encode({"exp": datetime.datetime.now(tz=datetime.timezone.utc) + datetime.timedelta(hours=1), "email": str(existingStudent['email']), "id": str(existingStudent['_id'])}, JWT_SECRET, algorithm='HS256')
    existingStudent['_id'] = str(existingStudent['_id'])
    existingStudent['subjects'] = list(map(str, existingStudent["subjects"]))
    return {"success": True, "result": existingStudent, "token": token if isinstance(token, str) else token if isinstance(token, str) else token.decode("utf-8")}

def studentUpdatePassword(data):
    errors = {"success": False}
    if data["newPassword"] != data["confirmPassword"]:
        errors["mismatchError"] = "Your password and confirmation password do not match"
        return errors
    existingStudent = student.find_one({"email": data["email"]})
    toUpdate = {}
    hashedPassword = bcrypt.hashpw(data["newPassword"].encode('utf-8'), bcrypt.gensalt())
    toUpdate["password"] = hashedPassword
    if not existingStudent["passwordUpdated"]:
        toUpdate["passwordUpdated"] = True
    student.update_one({"_id": ObjectId(existingStudent["_id"])}, {"$set": toUpdate})
    updatedStudent = student.find_one({"_id": ObjectId(existingStudent["_id"])})
    updatedStudent['_id'] = str(updatedStudent['_id'])
    updatedStudent['subjects'] = list(map(str, updatedStudent["subjects"]))
    return {
        "success": True,
        "message": "Password updated successfully",
        "response": updatedStudent
    }

def studentUpdateProfile(data):
    data = auth(data)
    if not data["userID"]:
        return {"message": "Unauthenticated"}
    existingStudent = student.find_one({"email": data["email"]})
    updatedStudent = {"success": False}
    if name := data["name"]:
        updatedStudent["name"] = name
    if dob := data["dob"]:
        updatedStudent["dob"] = dob
    if department := data["department"]:
        updatedStudent["department"] = department
    if contactNumber := data["contactNumber"]:
        updatedStudent["contactNumber"] = contactNumber
    if batch := data["batch"]:
        updatedStudent["batch"] = batch
    if section := data["section"]:
        updatedStudent["section"] = section
    if year := data["year"]:
        updatedStudent["year"] = year
    if motherName := data["motherName"]:
        updatedStudent["motherName"] = motherName
    if fatherName := data["fatherName"]:
        updatedStudent["fatherName"] = fatherName
    if fatherContactNumber := data["fatherContactNumber"]:
        updatedStudent["fatherContactNumber"] = fatherContactNumber
    if avatar := data["avatar"]:
        if getNumOfFaces(data["avatar"]) != 1:
            errors["message"] = "Invalid Profile Photo, try uploading a new one."
            return errors
        updatedStudent["avatar"] = avatar
    student.update_one({"_id": ObjectId(existingStudent["_id"])}, {"$set": updatedStudent})
    updatedStudent = student.find_one({"_id": ObjectId(existingStudent["_id"])})
    updatedStudent['_id'] = str(updatedStudent['_id'])
    updatedStudent['subjects'] = list(map(str, updatedStudent["subjects"]))
    return {"success": True, "result": updatedStudent}

def studentGetAttendance(data):
    existingStudent = student.find_one({
        "department": data["department"],
        "year": data["year"],
        "section": data["section"]
    })
    attendence = attendance.find({"student": ObjectId(existingStudent["_id"])})
    if not attendence:
        return {"message": "Attendence not found"}
    result = []
    for att in attendence:
        att["subject"] = subject.find_one({"_id": ObjectId(att["subject"])})
        result.append({
            "percentage": round((att["lectureAttended"] / att["totalLecturesByFaculty"])*100, 2),
            "subjectCode": att["subject"]["subjectCode"],
            "subjectName": att["subject"]["subjectName"],
            "attended": att["lectureAttended"],
            "total": att["totalLecturesByFaculty"]
        })
    return {"success": True, "result": result}

def studentGetTestResults(data):
    errors = {"success": False}
    existingStudent = student.find_one({"department": data["department"], "year": data["year"], "section": data["section"]})
    existingTest = test.find({"department": data["department"], "year": data["year"], "section": data["section"]})
    temp = list(existingTest)
    if len(temp) == 0:
        errors["notestError"] = "No Test Found"
        return errors
    result = []
    for i in temp:
        subjectCode = i["subjectCode"]
        existingSubject = subject.find_one({"subjectCode": subjectCode})
        existingMarks = marks.find_one({
            "student": ObjectId(existingStudent["_id"]),
            "exam": ObjectId(i["_id"]),
        })
        if existingMarks:
            result.append({
                "marks": existingMarks["marks"],
                "totalMarks": i["totalMarks"],
                "subjectName": existingSubject["subjectName"],
                "subjectCode": subjectCode,
                "test": i["test"]
            })
    return {"success": True, "result": result}