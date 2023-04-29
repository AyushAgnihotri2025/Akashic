import os
import re
import cv2
import time
import mimetypes
import numpy as np
from PIL import Image
from io import BytesIO
from base64 import b64decode
from deepface import DeepFace
from .exception import InvalidDataURI
from deepface.detectors import FaceDetector

detector = FaceDetector.build_model("opencv")

# ===================================================================================
# Models can be Facenet or ArcFace but ArcFace fails on some circumtances.
# Detector Backend can be opencv or mediapipe but mediapipe fails with some cases.
# ===================================================================================

def Verify(img1_path, img2_path, model = "Facenet", backup_model = "ArcFace", detector_backend = "opencv"):
    result = DeepFace.verify(img1_path = img1_path, img2_path = img2_path, model_name = model, detector_backend = detector_backend)
    if result["verified"]:
        return result
    return DeepFace.verify(img1_path = img1_path, img2_path = img2_path, model_name = backup_model, detector_backend = detector_backend)

class dataURIToFile:
    def __init__(self, uri):
        self.uri = uri
        if self._getMimeType() == self.__getMimeType():
            self.extension = self._getFileExtension(self.__getMimeType())
            self.fileName = f"mrayush_temp-{str(time.time()).replace('.', '')}{self.extension}"
            cacheFolder = self.__generateCachedFolder()
            self.filePath = f"{cacheFolder}{self.fileName}"
        else:
            raise InvalidDataURI()

    def _getMimeType(self):
        MIMETYPE_REGEX = r"[\w]+\/[\w\-\+\.]+"
        _MIMETYPE_RE = re.compile("^{}$".format(MIMETYPE_REGEX))

        CHARSET_REGEX = r"[\w\-\+\.]+"
        _CHARSET_RE = re.compile("^{}$".format(CHARSET_REGEX))

        DATA_URI_REGEX = (
            r"data:"
            + r"(?P<mimetype>{})?".format(MIMETYPE_REGEX)
            + r"(?:\;name\=(?P<name>[\w\.\-%!*'~\(\)]+))?"
            + r"(?:\;charset\=(?P<charset>{}))?".format(CHARSET_REGEX)
            + r"(?P<base64>\;base64)?"
            + r",(?P<data>.*)"
        )
        _DATA_URI_RE = re.compile(r"^{}$".format(DATA_URI_REGEX), re.DOTALL)
        match = _DATA_URI_RE.match(self.uri)
        return match.group("mimetype") or None

    def __getMimeType(self):
        return mimetypes.guess_type(self.uri, strict=True)[0]
        
    def _getFileExtension(self, mimetype):
        return mimetypes.guess_extension(mimetype, strict=True)

    def __generateCachedFolder(self):
        if not os.path.isdir("./MrAyushCache/"):
            os.mkdir("./MrAyushCache")
        return "./MrAyushCache/"

    def open(self):
        img_data = self.uri
        img_data += '=='
        image = Image.open(BytesIO(b64decode(img_data.split(',')[1])))
        image.save(self.filePath)
        return self.filePath

    def close(self):
        try:
            os.remove(self.filePath)
        except FileNotFoundError:
            pass

def getNumOfFaces(uri):
    # Read image
    image = cv2.imdecode(np.fromstring(b64decode(uri.split(',')[1]), np.uint8), cv2.IMREAD_UNCHANGED)

    # Detect faces
    # faces = detect_faces(image) Sometimes inaccurate

    return len(FaceDetector.detect_faces(detector, "opencv", image)) #set opencv, ssd, dlib, mtcnn or retinaface
        
    # ===================================================================================
    # Do markings on faces
    # ===================================================================================  

    """
    if len(faces) == 0:
        faceDetected = False
        num_faces = 0
        to_send = ''
    else:
        faceDetected = True
        num_faces = len(faces)
        
        # Draw a rectangle
        for item in faces:
            draw_rectangle(image, item['rect'])
        
        # Save
        #cv2.imwrite(filename, image)
        
        # In memory
        image_content = cv2.imencode('.jpg', image)[1].tostring()
        encoded_image = base64.encodestring(image_content)
        to_send = 'data:image/jpg;base64, ' + str(encoded_image, 'utf-8')

    return render_template('index.html', faceDetected=faceDetected, num_faces=num_faces, image_to_show=to_send, init=True)
    """

# ----------------------------------------------------------------------------------
# Detect faces using OpenCV
# ----------------------------------------------------------------------------------  
def detect_faces(img):
    '''Detect face in an image'''
    
    faces_list = []

    # Convert the test image to gray scale (opencv face detector expects gray images)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Load OpenCV face detector (LBP is faster)
    face_cascade = cv2.CascadeClassifier('models/haarcascade_frontalface.xml')

    # Detect multiscale images (some images may be closer to camera than others)
    # result is a list of faces
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.2, minNeighbors=5);

    # If not face detected, return empty list  
    if  len(faces) == 0:
        return faces_list
    
    for i in range(0, len(faces)):
        (x, y, w, h) = faces[i]
        face_dict = {}
        face_dict['face'] = gray[y:y + w, x:x + h]
        face_dict['rect'] = faces[i]
        faces_list.append(face_dict)

    # Return the face image area and the face rectangle
    return faces_list

# ----------------------------------------------------------------------------------
# Draw rectangle on image
# according to given (x, y) coordinates and given width and heigh
# ----------------------------------------------------------------------------------
def draw_rectangle(img, rect):
    '''Draw a rectangle on the image'''
    (x, y, w, h) = rect
    cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 255), 2)
