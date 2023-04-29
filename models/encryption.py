import base64
import secrets
from base64 import urlsafe_b64encode as b64e, urlsafe_b64decode as b64d

from cryptography.fernet import Fernet
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC

from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
from Crypto.Util.Padding import unpad

backend = default_backend()
iterations = 100_000

def _derive_key(password: bytes, salt: bytes, iterations: int = iterations) -> bytes:
    """Derive a secret key from a given password and salt"""
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(), length=32, salt=salt,
        iterations=iterations, backend=backend)
    return b64e(kdf.derive(password))

def encrypt(message: bytes, password: str, iterations: int = iterations) -> bytes:
    salt = secrets.token_bytes(16)
    key = _derive_key(password.encode(), salt, iterations)
    return b64e(
        b'%b%b%b' % (
            salt,
            iterations.to_bytes(4, 'big'),
            b64d(Fernet(key).encrypt(message)),
        )
    )

def decrypt(token: bytes, password: str) -> bytes:
    decoded = b64d(token)
    salt, iter, token = decoded[:16], decoded[16:20], b64e(decoded[20:])
    iterations = int.from_bytes(iter, 'big')
    key = _derive_key(password.encode(), salt, iterations)
    return Fernet(key).decrypt(token)

# Method 2

def base64Encoding(input):
    dataBase64 = base64.b64encode(input)
    dataBase64P = dataBase64.decode("UTF-8")
    return dataBase64P

def base64Decoding(input="UFmBQEE4MpP4m9btYFlUmEqRE3g5wa2Yfa2T28uB+OU="):
    return base64.decodebytes(input.encode("ascii"))

def aesEcbEncryptToBase64(encryptionKey, plaintext):
    cipher = AES.new(encryptionKey, AES.MODE_ECB)
    ciphertext = cipher.encrypt(pad(plaintext.encode("ascii"), AES.block_size))
    return base64Encoding(ciphertext)

def aesEcbDecryptFromBase64(decryptionKey, ciphertextDecryptionBase64):
    ciphertext = base64Decoding(ciphertextDecryptionBase64)
    cipher = AES.new(decryptionKey, AES.MODE_ECB)
    decryptedtext = unpad(cipher.decrypt(ciphertext), AES.block_size)
    decryptedtextP = decryptedtext.decode("UTF-8")
    return decryptedtextP

def backup_decrypt(data):
    return aesEcbDecryptFromBase64(base64Decoding(), data)

def backup_encrypt(data):
    return aesEcbEncryptToBase64(base64Decoding(), data)
