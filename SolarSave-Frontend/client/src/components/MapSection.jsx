import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import kakilogo from "../../images/kakilogo.jpg"; // Assuming you have this image in the images folder

const MapSection = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const map = L.map("map").setView([51.505, -0.09], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Solar panel locations
    const solarPanels = [
      { lat: 51.505, lng: -0.09, name: "Solar Panel 1", production: "5kW", status: "Active" },
      { lat: 51.515, lng: -0.1, name: "Solar Panel 2", production: "3kW", status: "Maintenance" },
      { lat: 51.525, lng: -0.12, name: "Solar Panel 3", production: "4kW", status: "Active" },
      { lat: 51.495, lng: -0.08, name: "Solar Panel 4", production: "6kW", status: "Active" },
    ];

    // Add custom markers with larger icons
    const customIcon = L.icon({
      iconUrl: kakilogo, // Use the custom kakilogo image
      iconSize: [50, 50], // Adjust size to make it larger
      iconAnchor: [25, 50], // Position the icon's anchor at the bottom center
      popupAnchor: [0, -50], // Position the popup above the icon
    });

    solarPanels.forEach((panel) => {
      L.marker([panel.lat, panel.lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(`<strong>${panel.name}</strong><br>Production: ${panel.production}<br>Status: ${panel.status}`);
    });

    return () => {
      map.remove(); // Clean up map on unmount
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="map-section">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {sidebarOpen ? "<<" : ">>"}
        </button>
        <input type="search" placeholder="Search for panels..." className="panel-search" />
        <div className="panel-info">
          <strong>Solar Panel 1</strong><br />
          Production: 5kW<br />
          Status: Active
        </div>
        <div className="panel-info">
          <strong>Solar Panel 2</strong><br />
          Production: 3kW<br />
          Status: Maintenance
        </div>
        <div className="panel-info">
          <strong>Solar Panel 3</strong><br />
          Production: 4kW<br />
          Status: Active
        </div>
        <div className="panel-info">
          <strong>Solar Panel 4</strong><br />
          Production: 6kW<br />
          Status: Active
        </div>
      </div>

      {/* Map Section */}
      <div className={`map-container ${sidebarOpen ? "with-sidebar" : "no-sidebar"}`}>
        <h2 className="text-center text-white my-4 text-2xl">Solar Panel Locations</h2>
        <div id="map" className="map"></div>
      </div>
    </div>
  );
};

export default MapSection;
