import unittest
from app.auth import authenticate_device

class TestAuth(unittest.TestCase):

    def test_authenticate_device(self):
        result = authenticate_device()
        self.assertTrue(result)

if __name__ == '__main__':
    unittest.main()
