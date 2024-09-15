import web3 from './web3';
import SolarSaveABI from './SolarSaveABI.json'; // Import the ABI from a compiled contract

const contractAddress = '0xYourContractAddressHere';
const contract = new web3.eth.Contract(SolarSaveABI, contractAddress);

export const registerDevice = async (deviceId) => {
  const accounts = await web3.eth.getAccounts();
  await contract.methods.registerDevice(deviceId).send({ from: accounts[0] });
};

export const submitEnergy = async (energyAmount) => {
  const accounts = await web3.eth.getAccounts();
  await contract.methods.submitEnergy(energyAmount).send({ from: accounts[0] });
};

export const getDeviceDetails = async () => {
  const accounts = await web3.eth.getAccounts();
  return await contract.methods.getDeviceDetails().call({ from: accounts[0] });
};

