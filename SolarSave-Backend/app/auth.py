from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from config.settings import DEVICE_ID
from config.logger import logger

def generate_keys():
    # Generate RSA key pair
    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048,
    )
    public_key = private_key.public_key()

    # Serialize keys
    private_pem = private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption(),
    )
    public_pem = public_key.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo,
    )

    return private_pem, public_pem

def authenticate_device():
    # This is a placeholder for actual authentication logic
    # For now, we'll assume the device is authenticated if it has a valid DEVICE_ID
    if DEVICE_ID:
        logger.info(f"Device {DEVICE_ID} authenticated successfully.")
        return True
    else:
        logger.error("No DEVICE_ID provided.")
        return False
