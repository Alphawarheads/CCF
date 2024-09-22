import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const ChartSection = () => {
  useEffect(() => {
    const ctx = document.getElementById('productionChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [{
          label: 'Energy Production (kWh)',
          data: [120, 190, 300, 500],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        }],
      },
    });

    const ctx2 = document.getElementById('efficiencyChart').getContext('2d');
    new Chart(ctx2, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [{
          label: 'Panel Efficiency (%)',
          data: [85, 80, 75, 90],
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
        }],
      },
    });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-center text-2xl mb-4">Energy Production Statistics</h2>
      <div className="chart-container">
        <canvas id="productionChart" className="mb-8"></canvas>
      </div>
      <div className="chart-container">
        <canvas id="efficiencyChart"></canvas>
      </div>
    </div>
  );
};

export default ChartSection;
