// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SolarSave {
    struct Device {
        string deviceId;
        uint256 energyProduced;  // Total energy produced
        uint256 rewardBalance;   // SolarCoin balance (SQC)
    }

    mapping(address => Device) public devices;
    address public owner;
    uint256 public rewardRate = 1;  // 1 SQC per unit of energy

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    modifier onlyRegisteredDevice() {
        require(bytes(devices[msg.sender].deviceId).length > 0, "Device not registered");
        _;
    }

    event DeviceRegistered(address indexed deviceAddress, string deviceId);
    event EnergySubmitted(address indexed deviceAddress, uint256 energy, uint256 reward);

    constructor() {
        owner = msg.sender;
    }

    // Register a new device with the smart contract
    function registerDevice(string memory _deviceId) public {
        require(bytes(devices[msg.sender].deviceId).length == 0, "Device already registered");
        devices[msg.sender] = Device(_deviceId, 0, 0);
        emit DeviceRegistered(msg.sender, _deviceId);
    }

    // Submit energy data and receive rewards
    function submitEnergy(uint256 _energy) public onlyRegisteredDevice {
        devices[msg.sender].energyProduced += _energy;
        uint256 reward = _energy * rewardRate;
        devices[msg.sender].rewardBalance += reward;
        emit EnergySubmitted(msg.sender, _energy, reward);
    }

    // Withdraw SolarCoin (SQC) rewards
    function withdrawRewards() public onlyRegisteredDevice {
        uint256 reward = devices[msg.sender].rewardBalance;
        require(reward > 0, "No rewards available");
        devices[msg.sender].rewardBalance = 0;
        // Transfer SQC tokens to the device's address (assuming SQC is ERC-20)
        // This will require integration with an ERC-20 SQC contract
        // SQC.transfer(msg.sender, reward);
    }

    // Adjust the reward rate (owner only)
    function setRewardRate(uint256 _rate) public onlyOwner {
        rewardRate = _rate;
    }

    // View the device's energy and reward status
    function getDeviceDetails() public view returns (string memory, uint256, uint256) {
        Device memory device = devices[msg.sender];
        return (device.deviceId, device.energyProduced, device.rewardBalance);
    }
}

