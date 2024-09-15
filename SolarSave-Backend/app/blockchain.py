from web3 import Web3
import json
from config.settings import BLOCKCHAIN_URL, CONTRACT_ADDRESS, CONTRACT_ABI_PATH, PRIVATE_KEY
from config.logger import logger

def load_contract():
    with open(CONTRACT_ABI_PATH, 'r') as abi_file:
        contract_json = json.load(abi_file)
        contract_abi = contract_json['abi']  # Adjusted to match Truffle's JSON structure
    web3 = Web3(Web3.HTTPProvider(BLOCKCHAIN_URL))
    if not web3.isConnected():
        logger.error("Failed to connect to the blockchain.")
        return None, None
    contract = web3.eth.contract(address=CONTRACT_ADDRESS, abi=contract_abi)
    return web3, contract


def submit_energy_data(energy_output):
    try:
        web3, contract = load_contract()
        if not web3 or not contract:
            return

        account = web3.eth.account.privateKeyToAccount(PRIVATE_KEY)
        nonce = web3.eth.get_transaction_count(account.address)

        # Build transaction
        tx = contract.functions.submitEnergy(int(energy_output)).build_transaction({
            'from': account.address,
            'nonce': nonce,
            'gas': 6721975,
            'gasPrice': web3.toWei('1', 'gwei')
        })

        # Sign transaction
        signed_tx = web3.eth.account.sign_transaction(tx, private_key=PRIVATE_KEY)

        # Send transaction
        tx_hash = web3.eth.send_raw_transaction(signed_tx.rawTransaction)
        logger.info(f"Transaction sent: {tx_hash.hex()}")

        # Wait for transaction receipt
        receipt = web3.eth.wait_for_transaction_receipt(tx_hash)
        logger.info(f"Transaction receipt: {receipt}")

        return receipt
    except Exception as e:
        logger.error(f"Error submitting energy data: {e}")

