import os

ADMIN_MONGODB_URI = os.environ.get("ADMIN_MONGODB_URI", "")

FACULTY_MONGODB_URI = os.environ.get("FACULTY_MONGODB_URI", "")

STUDENT_MONGODB_URI = os.environ.get("STUDENT_MONGODB_URI", "")

MISCELLANEOUS_MONGODB_URI = os.environ.get("MISCELLANEOUS_MONGODB_URI", "")

JWT_SECRET = os.environ.get("JWT_SECRET", "")

ENCRYPTION_KEY = os.environ.get("ENCRYPTION_KEY", "")

SENDER_MAIL = os.environ.get("SENDER_MAIL", "")

SENDER_MAIL_PASSWORD = os.environ.get("SENDER_MAIL_PASSWORD", "")
