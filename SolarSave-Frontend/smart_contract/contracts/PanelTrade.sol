// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PanelTrade {
    // 太阳能板结构体
    struct SolarPanel {
        uint256 id; // 太阳能板唯一标识符
        address owner; // 太阳能板所有者地址
        string location; // 太阳能板的具体位置
        uint256 transactions; // 完成的交易数量
        string startPoint; // 起始位置（如交易发起方地址或其他标识）
        string endPoint; // 终止位置（如交易接收方地址或其他标识）
        uint256 timestamp; // 创建时间戳
        string status; // 当前状态（如 "Active"、"Inactive"）
    }

    // 太阳能板存储映射
    mapping(uint256 => SolarPanel) public panels;

    // 下一个太阳能板的唯一ID
    uint256 public nextPanelId;

    // 事件定义
    event PanelCreated(
        uint256 id,
        address indexed owner,
        string location,
        uint256 transactions,
        string startPoint,
        string endPoint,
        uint256 timestamp,
        string status
    );

    event PanelUpdated(
        uint256 id,
        uint256 transactions,
        string status
    );

    // 创建太阳能板
    function createPanel(
        string memory _location,
        string memory _startPoint,
        string memory _endPoint,
        string memory _status
    ) external {
        // 创建新的太阳能板并存储到区块链
        panels[nextPanelId] = SolarPanel({
            id: nextPanelId,
            owner: msg.sender,
            location: _location,
            transactions: 0, // 初始交易数量为0
            startPoint: _startPoint,
            endPoint: _endPoint,
            timestamp: block.timestamp,
            status: _status
        });

        // 触发事件
        emit PanelCreated(
            nextPanelId,
            msg.sender,
            _location,
            0,
            _startPoint,
            _endPoint,
            block.timestamp,
            _status
        );

        // 更新下一个太阳能板的ID
        nextPanelId++;
    }

    // 更新太阳能板交易信息
    function updatePanel(
        uint256 _id,
        uint256 _transactions,
        string memory _status
    ) external {
        // 确保调用者是所有者
        require(
            panels[_id].owner == msg.sender,
            "只有所有者可以更新太阳能板信息"
        );

        // 更新交易数量和状态
        panels[_id].transactions = _transactions;
        panels[_id].status = _status;

        // 触发事件
        emit PanelUpdated(_id, _transactions, _status);
    }

    // 查询太阳能板信息
    function getPanel(uint256 _id)
        external
        view
        returns (
            uint256 id,
            address owner,
            string memory location,
            uint256 transactions,
            string memory startPoint,
            string memory endPoint,
            uint256 timestamp,
            string memory status
        )
    {
        SolarPanel memory panel = panels[_id];
        return (
            panel.id,
            panel.owner,
            panel.location,
            panel.transactions,
            panel.startPoint,
            panel.endPoint,
            panel.timestamp,
            panel.status
        );
    }
}
