import secrets

class DeviceAuthenticator:
    def __init__(self, device_id):
        self.device_id = device_id

    def generate_private_key(self):
        return secrets.token_hex(32)

    def authenticate(self, private_key):
        blockchain = BlockchainInterface()
        return blockchain.authenticate_device(self.device_id, private_key)

