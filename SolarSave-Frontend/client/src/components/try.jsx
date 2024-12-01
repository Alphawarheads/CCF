import React, { useState, useEffect, useContext } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Sidebar from "./Sidebar";
import PanelWindows from "./PanelWindows"; // Import PanelWindows
import TradeScript from "./TradeScript"; // Import TradeScript
import kakilogo from "../../images/kali.png";
import { TransactionContext } from "../context/TransactionContext"; // Import context
import "../style/MapSection.css"; // Correctly import CSS

const MapSection = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedPanel, setSelectedPanel] = useState(null);
  const [showPanelDetails, setShowPanelDetails] = useState(false);
  const [showTradeScript, setShowTradeScript] = useState(false); // State for showing TradeScript
  const [tradeScriptData, setTradeScriptData] = useState(null); // Data passed to TradeScript
  const [isConfirmingPanel, setIsConfirmingPanel] = useState(false); // State for panel creation confirmation
  const { currentAccount, connectWallet } = useContext(TransactionContext); // Get wallet connection status

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCreatePanel = (lat, lng) => {
    if (!currentAccount) {
      alert("请先连接钱包！");
      connectWallet(); // Prompt to connect wallet
      return;
    }
    // Set the data to pass to TradeScript
    setTradeScriptData({
      lat,
      lng,
      sandia_module_name: "Canadian_Solar_CS5P_220M___2009_",
      cec_inverter_name: "ABB__MICRO_0_25_I_OUTD_US_208__208V_",
    });
    setIsConfirmingPanel(true); // Show confirmation dialog
  };

  const confirmCreatePanel = () => {
    setIsConfirmingPanel(false); // Hide confirmation dialog
    setShowTradeScript(true); // Show TradeScript modal
  };

  const cancelCreatePanel = () => {
    setIsConfirmingPanel(false); // Close confirmation dialog
  };

  useEffect(() => {
    const map = L.map("map").setView([31.2992, 120.7467], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    const solarPanels = [
      {
        id: 1,
        lat: 31.2992,
        lng: 120.7467,
        name: "Solar Panel 1",
        production: "5kW",
        status: "Active",
        batteryTemp: 25,
        dcPower: 120,
        acPower: 100,
      },
      {
        id: 2,
        lat: 31.3002,
        lng: 120.7467,
        name: "Solar Panel 2",
        production: "3kW",
        status: "Maintenance",
        batteryTemp: 30,
        dcPower: 100,
        acPower: 90,
      },
    ];

    const customIcon = L.icon({
      iconUrl: kakilogo,
      iconSize: [50, 50],
      iconAnchor: [25, 50],
      popupAnchor: [0, -50],
    });

    solarPanels.forEach((panel) => {
      const marker = L.marker([panel.lat, panel.lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(
          `<div>
            <strong>${panel.name}</strong><br>
            Production: ${panel.production}<br>
            Status: ${panel.status}<br>
            <button class="details-button">详细资料</button>
          </div>`
        );

      marker.on("popupopen", () => {
        setSelectedPanel(panel);
        document.querySelector(".details-button").addEventListener("click", () => {
          setShowPanelDetails(true);
        });
      });
    });

    // Right-click to create new solar panel
    map.on("contextmenu", (e) => {
      handleCreatePanel(e.latlng.lat, e.latlng.lng);
    });

    return () => {
      map.remove();
    };
  }, [currentAccount]);

  return (
    <div className="map-section">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`map-container ${sidebarOpen ? "with-sidebar" : "no-sidebar"}`}>
        <h2 className="text-center text-white my-4 text-2xl">Solar Panel Locations</h2>
        <div id="map" className="map"></div>
      </div>

      {/* Display the confirmation dialog if isConfirmingPanel is true */}
      {isConfirmingPanel && (
        <div className="confirmation-popup">
          <p>Do you want to create a new solar panel here?</p>
          <button onClick={confirmCreatePanel}>Yes</button>
          <button onClick={cancelCreatePanel}>No</button>
        </div>
      )}

      {/* Display TradeScript when confirmed */}
      {showTradeScript && tradeScriptData && (
        <TradeScript
          close={() => setShowTradeScript(false)}
          lat={tradeScriptData.lat}
          lng={tradeScriptData.lng}
          sandiaModuleName={tradeScriptData.sandia_module_name}
          cecInverterName={tradeScriptData.cec_inverter_name}
        />
      )}

      {/* When showPanelDetails is true, display PanelWindows */}
      {showPanelDetails && selectedPanel && (
        <PanelWindows
          panel={selectedPanel}
          closeWindow={() => setShowPanelDetails(false)}
        />
      )}
    </div>
  );
};

export default MapSection;
