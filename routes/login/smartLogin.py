import jwt
import datetime
from credentials import ENCRYPTION_KEY, JWT_SECRET
from models.db import admin, faculty, student, keyIdentifier
from models.smartLogin import getNumOfFaces, Verify, dataURIToFile
from models.encryption import backup_encrypt, backup_decrypt

def verifyPIN(pin):
    identifier = int(pin.split("-")[0].strip())
    identifierCheck = keyIdentifier.find_one({}, {"student": {"$elemMatch":{"$eq": identifier}}, "admin": {"$elemMatch":{"$eq": identifier}}, "faculty": {"$elemMatch":{"$eq": identifier}}})
    if len(identifierCheck.keys()) > 1:
        pin = pin.replace(" - ", "")
        if list(identifierCheck.keys())[1] == "admin":
            existingAdmin = admin.find_one({"securityPIN": backup_encrypt(pin)})
            if existingAdmin:
                return {"success": True, "result": existingAdmin["name"]}

        elif list(identifierCheck.keys())[1] == "faculty":
            existingFaculty = faculty.find_one({"securityPIN": backup_encrypt(pin)})
            if existingFaculty:
                return {"success": True, "result": existingFaculty["name"]}

        elif list(identifierCheck.keys())[1] == "student":
            existingStudent = student.find_one({"securityPIN": backup_encrypt(pin)})
            if existingStudent:
                return {"success": True, "result": existingStudent["name"]}
    return {"success": False, "pinError": "Invalid Security PIN"}

def match_faces(pic1, pic2):
    pic1 = dataURIToFile(pic1)
    pic2 = dataURIToFile(pic2)
    result = Verify(pic1.open(), pic2.open())
    pic1.close()
    pic2.close()
    return result["verified"]

def match(data):
    faces = getNumOfFaces(data["uri"])
    if faces == 1:
        pin = data["pin"].replace(" - ", "")
        identifier = int(data["pin"].split("-")[0].strip())
        identifierCheck = keyIdentifier.find_one({}, {"student": {"$elemMatch":{"$eq": identifier}}, "admin": {"$elemMatch":{"$eq": identifier}}, "faculty": {"$elemMatch":{"$eq": identifier}}})
        if len(identifierCheck.keys()) > 1:
            if list(identifierCheck.keys())[1] == "student":
                existingStudent = student.find_one({"securityPIN": backup_encrypt(pin)})
                if match_faces(existingStudent["avatar"], data["uri"]):
                    token = jwt.encode({"exp": datetime.datetime.now(tz=datetime.timezone.utc) + datetime.timedelta(hours=1), "email": str(existingStudent['email']), "id": str(existingStudent['_id'])}, JWT_SECRET, algorithm='HS256')
                    existingStudent['_id'] = str(existingStudent['_id'])
                    existingStudent['subjects'] = list(map(str, existingStudent["subjects"]))
                    return {"success": True, "result": existingStudent, "token": token if isinstance(token, str) else token if isinstance(token, str) else token.decode("utf-8")}
                else:
                    return {"success": False, "loginError": f"{list(identifierCheck.keys())[1].capitalize()} doesn't match."}
            elif list(identifierCheck.keys())[1] == "faculty":
                existingFaculty = faculty.find_one({"securityPIN": backup_encrypt(pin)})
                if match_faces(existingFaculty["avatar"], data["uri"]):
                    token = jwt.encode({"exp": datetime.datetime.now(tz=datetime.timezone.utc) + datetime.timedelta(hours=1), "email": str(existingFaculty['email']), "id": str(existingFaculty['_id'])}, JWT_SECRET, algorithm='HS256')
                    existingFaculty['_id'] = str(existingFaculty['_id'])
                    return {"success": True, "result": existingFaculty, "token": token if isinstance(token, str) else token if isinstance(token, str) else token.decode("utf-8")}
                else:
                    return {"success": False, "loginError": f"{list(identifierCheck.keys())[1].capitalize()} doesn't match."}
            elif list(identifierCheck.keys())[1] == "admin":
                existingAdmin = admin.find_one({"securityPIN": backup_encrypt(pin)})
                if match_faces(existingAdmin["avatar"], data["uri"]):
                    token = jwt.encode({"exp": datetime.datetime.now(tz=datetime.timezone.utc) + datetime.timedelta(hours=1), "email": str(existingAdmin['email']), "id": str(existingAdmin['_id'])}, JWT_SECRET, algorithm='HS256')
                    existingAdmin['_id'] = str(existingAdmin['_id'])
                    return {"success": True, "result": existingAdmin, "token": token if isinstance(token, str) else token if isinstance(token, str) else token.decode("utf-8")}
                else:
                    return {"success": False, "loginError": f"{list(identifierCheck.keys())[1].capitalize()} doesn't match."}
        else:
            return {"success": False, "pinError": "Invalid Security PIN"}
    elif faces > 1:
        return {"success": False, "loginError": "Ahh !! Too Many Faces."}
    else:
        return {"success": False, "loginError": "No faces found. Make sure your face is fully visible in the camera."}
