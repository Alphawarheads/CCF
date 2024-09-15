module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,       // Default Ganache port
      network_id: "*",  // Match any network id
    },
  },
  compilers: {
    solc: {
      version: "0.8.20", // Specify the Solidity compiler version
    },
  },
};
