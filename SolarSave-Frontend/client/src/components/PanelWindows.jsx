import React, { useState } from 'react';
import Chart from 'react-google-charts';
import Draggable from 'react-draggable'; // 引入 Draggable
import '../style/PanelWindows.css';

const PanelWindows = ({ panel, closeWindow }) => {
  const [expanded, setExpanded] = useState(false);

  const renderChart = (title, dataKey) => (
    <Chart
      chartType="LineChart"
      data={[
        ['Time', title],
        ['10 AM', panel[dataKey]],
        ['11 AM', panel[dataKey] + 10],
        ['12 PM', panel[dataKey] + 20],
      ]}
      options={{ title }}
      width="100%"
      height="200px"
    />
  );

  return (
    <Draggable handle=".panel-header">
      <div className="panel-window">
        <div className="panel-header">
          <h3>更多信息</h3>
          <button className="close-button" onClick={closeWindow}>X</button>
        </div>

        {/* 显示数据文字值 */}
        <p>电池温度: {panel.batteryTemp}°C</p>
        <p>直流功率: {panel.dcPower} W</p>
        <p>交流功率: {panel.acPower} W</p>
        <p>占有状态: {panel.occupied ? '是' : '否'}</p>

        {/* 默认显示交流功率图表 */}
        {renderChart('交流功率', 'acPower')}

        {/* 展开/收回按钮，控制显示所有图表 */}
        {expanded && (
          <>
            {renderChart('直流功率', 'dcPower')}
            {renderChart('电池温度', 'batteryTemp')}
          </>
        )}
        <button className="expand-button" onClick={() => setExpanded(!expanded)}>
          {expanded ? '收回' : '展开'}
        </button>
      </div>
    </Draggable>
  );
};

export default PanelWindows;
