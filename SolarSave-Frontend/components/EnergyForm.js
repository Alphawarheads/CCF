import { useState } from 'react';
import { submitEnergy } from '../utils/contract';

export default function EnergyForm() {
  const [energy, setEnergy] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitEnergy(energy);
    alert('Energy submitted successfully!');
    setEnergy('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="energy">Energy Produced (kWh):</label>
      <input
        type="number"
        id="energy"
        value={energy}
        onChange={(e) => setEnergy(e.target.value)}
      />
      <button type="submit">Submit Energy</button>
    </form>
  );
}

