import React from 'react';

const Sidebar = () => (
  <div className="sidebar bg-gray-900 text-white p-4">
    <input
      type="search"
      className="w-full p-2 mb-4 bg-gray-800 border-none"
      placeholder="Search for panels..."
    />
    <div className="panel-info border-b pb-4 mb-4">
      <strong>Solar Panel 1</strong>
      <p>Production: 5kW</p>
      <p>Status: Active</p>
    </div>
    <div className="panel-info">
      <strong>Solar Panel 2</strong>
      <p>Production: 3kW</p>
      <p>Status: Maintenance</p>
    </div>
  </div>
);

export default Sidebar;
