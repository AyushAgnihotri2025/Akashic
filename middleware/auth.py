import jwt
from credentials import JWT_SECRET

def auth(data):
    token = data["auth"].split(" ")[1]
    if token:
        decodedData = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
        data['userID'] = decodedData['id']
        return data
    data['userID'] = None
    return data