# **SolarSave：利用太阳能实现可持续的能源节约**

## **项目概述**

在能源消耗不断增长的时代，**SolarSave** 迈出了面向未来的开创性一步，提供了一个基于区块链的物联网（IoT）平台，专注于优化和激励 **太阳能的使用**。SolarSave 融合了 **区块链**、**物联网 (IoT)** 和 **人工智能 (AI)** 等尖端技术，来追踪太阳能的生产，优化能源效率，并通过奖励系统促进可持续发展。

我们的愿景是创建一个去中心化的网络，使每个太阳能生产者为更绿色的地球做出贡献，并通过节能行为获得 **SolarCoin (SQC)** 的奖励。SolarSave 针对希望降低能源成本、减少碳足迹并参与可再生能源革命的个人、社区和机构而设计。

### **为什么选择 SolarSave？**

随着气候变化和全球能源挑战的加剧，优化能源使用和利用可再生能源显得尤为关键。SolarSave 致力于通过数据驱动的方法使太阳能发电更加高效、可追踪且具有激励机制。

1. **数据驱动的优化**：SolarSave 利用物联网设备实时收集的数据监控太阳能板的性能和能耗，为用户提供切实可行的建议，帮助减少浪费、提高效率。

2. **基于区块链的激励**：通过集成 **区块链技术**，SolarSave 确保了数据的透明性、安全性，并基于实际的能源数据提供奖励机制。用户通过贡献太阳能数据和优化能源使用来赚取 **SolarCoin (SQC)**。

3. **可扩展性和灵活性**：SolarSave 具有可扩展性和灵活性。无论您是小型家庭用户还是大型机构，SolarSave 都提供了优化能源生产和追踪环境影响的工具。

---

## **项目详情**

### **主要特性**

- **物联网设备模拟**：SolarSave 模拟物联网设备（太阳能板），追踪太阳辐照度、温度和能源输出。设备生成的真实数据由平台进行分析和处理。

- **区块链集成**：SolarSave 将能源生产者（物联网设备）连接到去中心化的区块链网络上。能源数据提交到区块链后，生产者会因优化能源使用而获得 **SolarCoin (SQC)** 代币作为奖励。

- **实时监控与洞察**：SolarSave 为用户提供关于其能源生产和消耗的实时数据，使他们能够在能源优化、存储和消耗方面做出明智决策。

- **预测分析与AI优化**：SolarSave 使用机器学习算法预测太阳能板的效率，并提供改善能源使用的建议。系统可以根据天气条件推荐清洁太阳能板或优化储能等操作。

- **奖励系统**：SolarSave 使用 SolarCoin (SQC) 代币来激励节能行为。用户每节省一单位能源就能获得 SQC，并可以将奖励提取到区块链连接的钱包中。

### **使用的技术**

- **Python**：后端使用 Python 开发，用于模拟太阳能设备、处理能源数据、认证设备并连接区块链。

- **Solidity (以太坊区块链)**：智能合约使用 Solidity 编写，并部署在以太坊区块链上，处理设备注册、能源数据提交和 SQC 奖励分发。

- **Next.js/React**：前端使用 Next.js 和 React 构建，提供交互式仪表板供用户监控其太阳能性能、提交数据和查看奖励。

- **Web3.js**：使用 Web3.js 进行前端与以太坊区块链的通信，允许用户通过 MetaMask 或其他兼容以太坊的钱包与智能合约交互。

- **Docker**：该项目使用 Docker 进行容器化，以确保开发和部署环境的一致性。

---

## **文件结构**

```
SolarSave-Frontend/
├── client/
│   ├── images/
│   ├── node_modules/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── style/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── index.js

SolarSave-Backend/
├── api/
│   ├── __init__.py
│   ├── generatePanel.py
│   ├── GetElectric.py
│   ├── panels.json
│   ├── routes.py
│   └── RunSimulator.py
├── app/
│   ├── __init__.py
│   ├── crud.py
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   └── schemas.py
└── requirements.txt

```

---

## **安装与设置**

1. **克隆仓库**:
   ```bash
   git clone https://github.com/Alphawarheads/CCF.git
   cd SolarSave-Frontend/client
   npm install
   npm run dev
   ```

2. **安装依赖**:
   ```bash
   pip install -r docs/requirements.txt
   ```

3. **区块链设置**：
   - 确保您拥有一个以太坊钱包（如 MetaMask）。
   - 在 config/settings.py 文件中更新您的合约地址和节点 URL（例如，Infura 或 Alchemy）。

4. **运行设备模拟器**：
   模拟生成数据的太阳能板设备：
   ```bash
   python app/device_simulation.py
   ```

5. **提交数据到区块链**：
   使用区块链接口提交能源数据并赚取 SolarCoin 奖励：
   ```bash
   python app/blockchain.py
   ```

---

## **智能合约部署**

智能合约部署在以太坊区块链上，负责设备注册、能源数据提交和奖励分发。


### **智能合约功能**：

- **registerDevice**: 在区块链上注册新的太阳能设备。
- **submitEnergy**: 提交能源生产数据并计算 SolarCoin 奖励。
- **withdrawRewards**: 允许设备提取累积的 SolarCoin 奖励。

---

## **贡献指南**

我们欢迎您为 SolarSave 做出贡献！以下是您的参与方式：

1. **Fork 仓库** 并为您的新特性或漏洞修复创建一个新分支。
2. **为您的代码编写测试** 并确保所有测试通过。
3. **提交 pull request**，详细说明您的更改及其解决的问题。

---

## **未来路线图**

- **太阳能社区网络**： 允许用户之间的点对点能源交易。
- **太阳能市场**： 用户可以使用 SolarCoin 购买节能产品和服务。
- **多链集成**： 扩展 SolarSave 到其他区块链平台，以提升可扩展性。

---

## **鸣谢**

我们感谢开源社区和区块链爱好者在本项目构建过程中的持续支持和激励。SolarSave 是创建可持续和去中心化能源未来的重要一步，每一块太阳能板都可以为更加绿色的地球贡献力量。

---

## **许可**

本项目基于 MIT 许可协议 - 详情请参见 LICENSE 文件。

---

**加入 SolarSave，成为能源革命的一部分！**

<br><br><br>

# **SolarSave: Harnessing the Power of the Sun for Sustainable Energy Savings**

## **Project Overview**

In an age where energy consumption is growing exponentially, **SolarSave** takes a pioneering step towards the future by providing a blockchain-powered, IoT-based platform that focuses on optimizing and incentivizing **solar energy usage**. SolarSave brings together cutting-edge technologies like **blockchain**, **Internet of Things (IoT)**, and **Artificial Intelligence (AI)** to track solar energy production, optimize energy efficiency, and promote sustainability through a rewards system. 

Our vision is to create a decentralized network where each solar energy producer contributes to a greener world and is rewarded in **SolarCoin (SQC)** for energy-saving behavior. SolarSave is designed for individuals, communities, and institutions who want to reduce their energy costs, minimize their carbon footprint, and participate in the renewable energy revolution.

### **Why SolarSave?**

With the growing threat of climate change and global energy challenges, optimizing energy usage and harnessing renewable energy sources is critical. SolarSave aims to make solar energy generation more efficient, traceable, and incentivized through data-driven approaches. 

1. **Data-Driven Optimization**: SolarSave uses real-time data collected by IoT devices to monitor solar panel performance and energy consumption, providing actionable insights for users to reduce waste and maximize efficiency.

2. **Blockchain-Powered Incentives**: By integrating **blockchain technology**, SolarSave ensures transparency, security, and a reward mechanism based on actual energy data. Users earn **SolarCoin (SQC)** for contributing solar energy data and optimizing energy usage.

3. **Scalability and Flexibility**: SolarSave is scalable and flexible. Whether you're a small home user or a large institution, SolarSave offers the tools you need to optimize energy generation and track environmental impact.

---

## **Project Details**

### **Key Features**

- **IoT Device Simulation**: 
   SolarSave simulates IoT devices (solar panels) that track solar irradiance, temperature, and energy output. The device generates real-world-like data that is analyzed and processed by the platform.
   
- **Blockchain Integration**:
   SolarSave connects the energy producer (the IoT device) to a decentralized blockchain network. Energy data is submitted to the blockchain, and in return, the producer earns **SolarCoin (SQC)** tokens as a reward for optimizing energy usage.

- **Real-Time Monitoring & Insights**: 
   SolarSave provides users with real-time data on their energy generation and consumption, allowing them to make informed decisions about energy optimization, storage, and consumption.

- **Predictive Analytics & AI Optimization**:
   Using machine learning algorithms, SolarSave predicts solar panel efficiency and suggests ways to improve energy usage. The system can recommend actions like panel cleaning or energy storage optimization based on weather conditions.

- **Rewards System**:
   SolarCoin (SQC) tokens are used to incentivize energy-saving behavior. Users earn SQC for each unit of energy saved and can withdraw rewards to a connected wallet on the blockchain.

### **Technologies Used**

- **Python**: The backend is developed using Python to simulate solar energy devices, process energy data, authenticate devices, and connect with the blockchain.
  
- **Solidity (Ethereum Blockchain)**: The smart contract is written in Solidity and deployed on the Ethereum blockchain, handling device registration, energy data submission, and SQC rewards distribution.

- **Next.js/React**: The frontend is built with Next.js and React, providing an interactive dashboard for users to monitor their solar energy performance, submit data, and view rewards.

- **Web3.js**: Web3.js is used for communication between the frontend and the Ethereum blockchain, allowing users to interact with smart contracts through MetaMask or other Ethereum-compatible wallets.

- **Docker**: The project is containerized using Docker to ensure a consistent development and deployment environment.

---

## **File Structure**

```
SolarSave-Frontend/
├── client/
│   ├── images/
│   ├── node_modules/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── style/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── index.js

SolarSave-Backend/
├── api/
│   ├── __init__.py
│   ├── generatePanel.py
│   ├── GetElectric.py
│   ├── panels.json
│   ├── routes.py
│   └── RunSimulator.py
├── app/
│   ├── __init__.py
│   ├── crud.py
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   └── schemas.py
└── requirements.txt
```

---

## **Installation and Setup**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Alphawarheads/CCF.git
   cd SolarSave-Frontend/client
   npm install
   npm run dev
   ```

2. **Install Dependencies**:
   ```bash
   pip install -r docs/requirements.txt
   ```

3. **Blockchain Setup**:
   - Ensure you have an Ethereum wallet (MetaMask or similar).
   - Update the blockchain configuration (`config/settings.py`) with your contract address and node URL (e.g., Infura or Alchemy).

4. **Run the Device Simulator**:
   Simulate a solar panel device generating data:
   ```bash
   python app/device_simulation.py
   ```

5. **Submit Data to the Blockchain**:
   Use the blockchain interface to submit energy data and earn SolarCoin rewards:
   ```bash
   python app/blockchain.py
   ```

---

## **Smart Contract Deployment**

The smart contract is deployed on the Ethereum blockchain and manages device registration, energy data submission, and reward distribution.

### **Smart Contract Functions**:

- **registerDevice**: Registers a new solar device on the blockchain.
- **submitEnergy**: Submits energy production data and calculates the SolarCoin reward.
- **withdrawRewards**: Allows devices to withdraw accumulated SolarCoin rewards.

---

## **Contribution Guidelines**

We welcome contributions to make SolarSave better! Here's how you can contribute:

1. **Fork the repository** and create a new branch for your feature or bug fix.
2. **Write tests** for your code and ensure all tests pass.
3. **Submit a pull request** detailing your changes and the problem you're solving.

---

## **Future Roadmap**

- **Solar Community Network**: Allow peer-to-peer energy trading between users.
- **Solar Marketplace**: Users can use SolarCoin to purchase energy-efficient products and services.
- **Multi-Chain Integration**: Expand SolarSave to other blockchain platforms for better scalability.

---

## **Acknowledgments**

We thank the open-source community and blockchain enthusiasts for their continued support and inspiration in building this project. SolarSave is a step forward in creating a sustainable and decentralized energy future, where every solar panel can contribute to making the world a greener place.

---

## **License**

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Join SolarSave, and be a part of the energy revolution!**

