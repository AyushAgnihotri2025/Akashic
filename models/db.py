from credentials import ADMIN_MONGODB_URI, STUDENT_MONGODB_URI, FACULTY_MONGODB_URI, MISCELLANEOUS_MONGODB_URI
from pymongo import MongoClient

ADMIN_DB = MongoClient(ADMIN_MONGODB_URI)

admin = ADMIN_DB["adminDB"]["admin"]
notice = ADMIN_DB["noticesDB"]["notice"]
department = ADMIN_DB["departmentDB"]["department"]
subject = ADMIN_DB["subjectDB"]["subject"]

FACULTY_DB = MongoClient(FACULTY_MONGODB_URI)

faculty = FACULTY_DB["facultyDB"]["faculty"]
test = FACULTY_DB["testDB"]["test"]
marks = FACULTY_DB["marksDB"]["marks"]

STUDENT_DB = MongoClient(STUDENT_MONGODB_URI)

student = STUDENT_DB["studentDB"]["student"]
attendance = STUDENT_DB["attendanceDB"]["attendance"]

MISCELLANEOUS_DB = MongoClient(MISCELLANEOUS_MONGODB_URI)

keyIdentifier = MISCELLANEOUS_DB["keyIdentifiers"]["identifiers"]