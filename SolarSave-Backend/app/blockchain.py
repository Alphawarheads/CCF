from web3 import Web3

class BlockchainInterface:
    def __init__(self, contract_address, abi, node_url):
        self.web3 = Web3(Web3.HTTPProvider(node_url))
        self.contract_address = Web3.toChecksumAddress(contract_address)
        self.contract = self.web3.eth.contract(address=self.contract_address, abi=abi)

    def authenticate_device(self, device_id, private_key):
        signed_msg = self.web3.eth.account.sign_message(Web3.soliditySha3(['string'], [device_id]), private_key)
        return signed_msg

    def submit_energy_data(self, device_id, energy_data, private_key):
        tx = self.contract.functions.submitEnergyData(device_id, energy_data).buildTransaction({
            'gas': 2000000,
            'gasPrice': self.web3.toWei('20', 'gwei'),
            'nonce': self.web3.eth.getTransactionCount(Web3.toChecksumAddress(device_id)),
        })
        signed_tx = self.web3.eth.account.signTransaction(tx, private_key)
        tx_hash = self.web3.eth.sendRawTransaction(signed_tx.rawTransaction)
        return tx_hash

    def get_device_rewards(self, device_id):
        return self.contract.functions.getRewards(device_id).call()

