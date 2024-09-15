const MockERC20 = artifacts.require("MockERC20");
const SolarSave = artifacts.require("SolarSave");

module.exports = async function (deployer) {
  // Deploy Mock ERC20 Token
  await deployer.deploy(MockERC20, web3.utils.toWei('1000000', 'ether')); // 1 million tokens
  const mockToken = await MockERC20.deployed();

  // Deploy SolarSave with the address of the deployed MockERC20
  await deployer.deploy(SolarSave, mockToken.address);
};
