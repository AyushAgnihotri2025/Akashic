# define Python user-defined exceptions
class Error(Exception):
    """Base class for other exceptions"""
    pass


class InvalidDataURI(Error):
    """Raised when the provided Data URI is invalid"""
    def __init__(self):
        super().__init__("Data Uri Provided is Invalid, try again with new one.")