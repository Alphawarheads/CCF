// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import OpenZeppelin contracts for security and best practices
import "@openzeppelin/contracts/access/Ownable.sol";             // Access control
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";         // ERC20 interface
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol"; // Safe ERC20 operations
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";   // Prevents re-entrancy attacks

/**
 * @title SolarSave
 * @dev A contract to manage solar energy devices, track energy production, and distribute SolarCoin (SQC) rewards.
 */
contract SolarSave is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // ERC20 token for SolarCoin (SQC)
    IERC20 public solarCoinToken;

    struct Device {
        string deviceId;
        uint256 energyProduced;  // Total energy produced by the device
        uint256 rewardBalance;   // Accumulated rewards in SQC
        bool isActive;           // Device activation status
    }

    // Mapping from device address to Device struct
    mapping(address => Device) private devices;

    uint256 public rewardRate = 1;  // Reward rate: 1 SQC per unit of energy

    // Events for logging significant actions
    event DeviceRegistered(address indexed deviceAddress, string deviceId);
    event EnergySubmitted(address indexed deviceAddress, uint256 energy, uint256 reward);
    event RewardsWithdrawn(address indexed deviceAddress, uint256 rewardAmount);
    event DeviceDeactivated(address indexed deviceAddress);
    event RewardRateUpdated(uint256 newRewardRate);
    event SolarCoinTokenUpdated(address newTokenAddress);

    /**
     * @dev Modifier to restrict actions to registered devices only.
     */
    modifier onlyRegisteredDevice() {
        require(bytes(devices[msg.sender].deviceId).length > 0, "Device not registered");
        _;
    }

    /**
     * @dev Modifier to restrict actions to active devices only.
     */
    modifier onlyActiveDevice() {
        require(devices[msg.sender].isActive, "Device is not active");
        _;
    }

    /**
     * @dev Constructor to initialize the contract with the SolarCoin token address.
     * @param _solarCoinToken Address of the deployed SolarCoin ERC20 token.
     */
    constructor(address _solarCoinToken) {
        require(_solarCoinToken != address(0), "Invalid token address");
        solarCoinToken = IERC20(_solarCoinToken);
    }

    /**
     * @dev Allows the owner to update the SolarCoin token address.
     * @param _solarCoinToken New address of the SolarCoin ERC20 token.
     */
    function setSolarCoinToken(address _solarCoinToken) external onlyOwner {
        require(_solarCoinToken != address(0), "Invalid token address");
        solarCoinToken = IERC20(_solarCoinToken);
        emit SolarCoinTokenUpdated(_solarCoinToken);
    }

    /**
     * @dev Register a new device to participate in the SolarSave program.
     * @param _deviceId Unique identifier for the device.
     */
    function registerDevice(string memory _deviceId) external {
        require(bytes(devices[msg.sender].deviceId).length == 0, "Device already registered");
        devices[msg.sender] = Device({
            deviceId: _deviceId,
            energyProduced: 0,
            rewardBalance: 0,
            isActive: true
        });
        emit DeviceRegistered(msg.sender, _deviceId);
    }

    /**
     * @dev Submit energy production data and accumulate rewards.
     * @param _energy Amount of energy produced to submit.
     */
    function submitEnergy(uint256 _energy) external onlyRegisteredDevice onlyActiveDevice {
        require(_energy > 0, "Energy must be greater than zero");
        Device storage device = devices[msg.sender];
        device.energyProduced += _energy;
        uint256 reward = _energy * rewardRate;
        device.rewardBalance += reward;
        emit EnergySubmitted(msg.sender, _energy, reward);
    }

    /**
     * @dev Withdraw accumulated SolarCoin rewards.
     */
    function withdrawRewards() external onlyRegisteredDevice nonReentrant {
        Device storage device = devices[msg.sender];
        uint256 reward = device.rewardBalance;
        require(reward > 0, "No rewards available");
        device.rewardBalance = 0;
        solarCoinToken.safeTransfer(msg.sender, reward);
        emit RewardsWithdrawn(msg.sender, reward);
    }

    /**
     * @dev Allows the owner to adjust the reward rate.
     * @param _rate New reward rate (SQC per unit of energy).
     */
    function setRewardRate(uint256 _rate) external onlyOwner {
        require(_rate > 0, "Reward rate must be greater than zero");
        rewardRate = _rate;
        emit RewardRateUpdated(_rate);
    }

    /**
     * @dev Allows the owner to deactivate a device.
     * @param _deviceAddress Address of the device to deactivate.
     */
    function deactivateDevice(address _deviceAddress) external onlyOwner {
        require(bytes(devices[_deviceAddress].deviceId).length > 0, "Device not registered");
        devices[_deviceAddress].isActive = false;
        emit DeviceDeactivated(_deviceAddress);
    }

    /**
     * @dev Retrieve details of a specific device.
     * @param _deviceAddress Address of the device.
     * @return deviceId Device identifier.
     * @return energyProduced Total energy produced by the device.
     * @return rewardBalance Accumulated reward balance.
     * @return isActive Activation status of the device.
     */
    function getDeviceDetails(address _deviceAddress)
        external
        view
        returns (
            string memory deviceId,
            uint256 energyProduced,
            uint256 rewardBalance,
            bool isActive
        )
    {
        Device memory device = devices[_deviceAddress];
        return (
            device.deviceId,
            device.energyProduced,
            device.rewardBalance,
            device.isActive
        );
    }

    /**
     * @dev Retrieve the reward balance of the calling device.
     * @return rewardBalance Accumulated reward balance.
     */
    function getMyRewardBalance() external view onlyRegisteredDevice returns (uint256 rewardBalance) {
        return devices[msg.sender].rewardBalance;
    }

    /**
     * @dev Retrieve the total energy produced by the calling device.
     * @return energyProduced Total energy produced.
     */
    function getMyTotalEnergyProduced() external view onlyRegisteredDevice returns (uint256 energyProduced) {
        return devices[msg.sender].energyProduced;
    }
}
