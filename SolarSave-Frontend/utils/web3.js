import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  // We are in the browser and MetaMask is running
  web3 = new Web3(window.ethereum);
  window.ethereum.request({ method: 'eth_requestAccounts' }); // Request wallet connection
} else {
  // We are on the server OR the user is not running MetaMask
  const provider = new Web3.providers.HttpProvider(
    'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID' // Replace with your Infura endpoint or local node
  );
  web3 = new Web3(provider);
}

export default web3;

