import { useState, useEffect } from 'react';
import { getDeviceDetails } from '../utils/contract';

export default function Home() {
  const [deviceDetails, setDeviceDetails] = useState({});

  useEffect(() => {
    const fetchDeviceDetails = async () => {
      const details = await getDeviceDetails();
      setDeviceDetails(details);
    };
    fetchDeviceDetails();
  }, []);

  return (
    <div>
      <h1>SolarSave Dashboard</h1>
      <p>Device ID: {deviceDetails[0]}</p>
      <p>Energy Produced: {deviceDetails[1]} kWh</p>
      <p>SolarCoin Rewards: {deviceDetails[2]} SQC</p>
    </div>
  );
}

