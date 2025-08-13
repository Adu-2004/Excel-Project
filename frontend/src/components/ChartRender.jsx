import React from 'react';
import { Bar, Line, Pie, Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  LineController,
  PieController,
  ScatterController,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  LineController,
  PieController,
  ScatterController,
);

const ChartRender = ({ chartData, chartType }) => {
  if (!chartData) return null;

  switch (chartType) {
    case 'bar':
      return <Bar data={chartData} />;
    case 'line':
      return <Line data={chartData} />;
    case 'pie':
      return <Pie data={chartData} />;
    case 'scatter':
      return <Scatter data={chartData} />;
    default:
      return null;
  }
};

export default ChartRender;
