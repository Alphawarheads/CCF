import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Sidebar from "./Sidebar";
import PanelWindows from "./PanelWindows";  // 引入 PanelWindows 组件
import kakilogo from "../../images/kakilogo.jpg";
import "../style/MapSection.css"; // 正确引入CSS

const MapSection = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedPanel, setSelectedPanel] = useState(null);  // 保存选中的太阳能图标数据
  const [showPanelDetails, setShowPanelDetails] = useState(false); // 控制 PanelWindows 显示

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const map = L.map("map").setView([31.2992, 120.7467], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    const solarPanels = [
      { id: 1, lat: 31.2992, lng: 120.7467, name: "Solar Panel 1", production: "5kW", status: "Active", batteryTemp: 25, dcPower: 120, acPower: 100 },
      { id: 2, lat: 31.3002, lng: 120.7467, name: "Solar Panel 2", production: "3kW", status: "Maintenance", batteryTemp: 30, dcPower: 100, acPower: 90 },
    ];

    const customIcon = L.icon({
      iconUrl: kakilogo,
      iconSize: [50, 50],
      iconAnchor: [25, 50],
      popupAnchor: [0, -50],
    });

    solarPanels.forEach((panel) => {
      const marker = L.marker([panel.lat, panel.lng], { icon: customIcon }).addTo(map)
        .bindPopup(
          `<div>
            <strong>${panel.name}</strong><br>
            Production: ${panel.production}<br>
            Status: ${panel.status}<br>
            <button class="details-button">详细资料</button>
          </div>`
        );

      // 监听图标点击事件
      marker.on('popupopen', () => {
        setSelectedPanel(panel);
        document.querySelector(".details-button").addEventListener("click", () => {
          setShowPanelDetails(true); // 显示 PanelWindows
        });
      });
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="map-section">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`map-container ${sidebarOpen ? "with-sidebar" : "no-sidebar"}`}>
        <h2 className="text-center text-white my-4 text-2xl">Solar Panel Locations</h2>
        <div id="map" className="map"></div>
      </div>

      {/* 当 showPanelDetails 为 true 时，显示 PanelWindows 弹窗 */}
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
