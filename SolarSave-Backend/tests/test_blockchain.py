import unittest
from unittest.mock import patch
from app.blockchain import submit_energy_data

class TestBlockchain(unittest.TestCase):

    @patch('app.blockchain.submit_energy_data')
    def test_submit_energy_data(self, mock_submit):
        mock_submit.return_value = {'status': 'success'}
        receipt = submit_energy_data(100)
        self.assertEqual(receipt['status'], 'success')

if __name__ == '__main__':
    unittest.main()
