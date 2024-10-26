import React, { useState } from "react";
import TradeScript from "./TradeScript";
import PanelWindows from "./PanelWindows";
import "../style/SolarTrade.css";
import Chart from "react-google-charts";
import { AiOutlineClose } from "react-icons/ai";

const panelsData = [
  { id: 1, name: "Panel A", production: "5kW", batteryTemp: 25, dcPower: 120, acPower: 100 },
  { id: 2, name: "Panel B", production: "3kW", batteryTemp: 30, dcPower: 90, acPower: 80 },
  { id: 3, name: "Panel C", production: "4kW", batteryTemp: 28, dcPower: 110, acPower: 95 },
];

const SolarTrade = ({ goBack }) => {
  const [selectedPanel, setSelectedPanel] = useState(null);
  const [panels, setPanels] = useState([]);
  const [showTradeScript, setShowTradeScript] = useState(false);
  const [showPanelWindows, setShowPanelWindows] = useState(null);

  const handleAddPanel = () => {
    if (selectedPanel) {
      setPanels([...panels, selectedPanel]);
      setSelectedPanel(null);
      setShowTradeScript(true);
    }
  };

  const handleOpenPanelWindows = (panel) => {
    setShowPanelWindows(panel);
  };

  return (
    <div className="solar-trade-container">
      <div className="left-panel">
        <button onClick={goBack} className="back-button">Back to Services</button>
        <h2>Solar Panel Selection</h2>
        <div className="panel-selection">
          <select
            value={selectedPanel?.id || ""}
            onChange={(e) =>
              setSelectedPanel(
                panelsData.find((panel) => panel.id === parseInt(e.target.value))
              )
            }
          >
            <option value="">Select a Panel</option>
            {panelsData.map((panel) => (
              <option key={panel.id} value={panel.id}>
                {panel.name} - {panel.production}
              </option>
            ))}
          </select>
          <button onClick={handleAddPanel}>Add Panel</button>
        </div>

        <div className="panel-summary">
          {panels.map((panel) => (
            <div key={panel.id} className="panel-summary-card" onClick={() => handleOpenPanelWindows(panel)}>
              <p><strong>{panel.name}</strong></p>
              <p>Battery Temp: {panel.batteryTemp}°C</p>
              <p>DC Power: {panel.dcPower} W</p>
              <p>AC Power: {panel.acPower} W</p>
              <AiOutlineClose className="close-icon" onClick={() => setPanels(panels.filter(p => p.id !== panel.id))} />
            </div>
          ))}
        </div>
      </div>

      <div className="right-panel">
        <div className="chart-statistics">
          <h3>Overall Statistics</h3>
          <p>Battery Temp: 30°C</p>
          <p>DC Power: 90 W</p>
          <p>AC Power: 80 W</p>
        </div>

        <div className="line-charts">
          <Chart
            chartType="LineChart"
            data={[["Time", "Battery Temp"], ["10 AM", 25], ["11 AM", 30], ["12 PM", 28]]}
            options={{
              title: "Battery Temperature",
              hAxis: { title: "Time" },
              vAxis: { title: "Temperature (°C)" },
              colors: ["#ff6b6b"],
              backgroundColor: "#1a1a2e",
              legend: { position: "bottom", textStyle: { color: "#ffffff" } }
            }}
            width="100%"
            height="150px"
          />
          <Chart
            chartType="LineChart"
            data={[["Time", "DC Power"], ["10 AM", 120], ["11 AM", 130], ["12 PM", 125]]}
            options={{
              title: "DC Power",
              hAxis: { title: "Time" },
              vAxis: { title: "Power (W)" },
              colors: ["#4CAF50"],
              backgroundColor: "#1a1a2e",
              legend: { position: "bottom" },
            }}
            width="100%"
            height="150px"
          />
          <Chart
            chartType="LineChart"
            data={[["Time", "AC Power"], ["10 AM", 100], ["11 AM", 105], ["12 PM", 110]]}
            options={{
              title: "AC Power",
              hAxis: { title: "Time" },
              vAxis: { title: "Power (W)" },
              colors: ["#2952E3"],
              backgroundColor: "#1a1a2e",
              legend: { position: "bottom" },
            }}
            width="100%"
            height="150px"
          />
        </div>

        <div className="comparison-chart">
          <Chart
            chartType="BarChart"
            data={[
              ["Panel", "Battery Temp", "DC Power", "AC Power"],
              ["Panel A", 25, 120, 100],
              ["Panel B", 30, 90, 80],
              ["Panel C", 28, 110, 95],
            ]}
            options={{
              title: "Comparison of Panel Metrics",
              backgroundColor: "#1a1a2e",
              colors: ["#ff6b6b", "#4CAF50", "#2952E3"],
              hAxis: { title: "Metrics" },
              vAxis: { title: "Values" },
              legend: { position: "right" },
            }}
            width="100%"
            height="300px"
          />
        </div>
      </div>

      {showTradeScript && <TradeScript close={() => setShowTradeScript(false)} />}
      {showPanelWindows && <PanelWindows panel={showPanelWindows} closeWindow={() => setShowPanelWindows(null)} />}
    </div>
  );
};

export default SolarTrade;
