import React, { useState } from 'react';
import FileUpload from './FileUpload';
import ChartSelectors from './ChartSelectors';
import ChartRender from './ChartRender';
import ChartDownload from './ChartDownload';

// Import and register Chart.js components
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
  ScatterController
);

const ExcelChartBuilder = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [chartType, setChartType] = useState('bar');
  const [showChart, setShowChart] = useState(false);
  const [error, setError] = useState('');

  const onDataParsed = (jsonData) => {
    setError('');
    setData(jsonData);
    setColumns(Object.keys(jsonData[0]));
    setXAxis('');
    setYAxis('');
    setShowChart(false);
  };

  const onError = (message) => {
    setError(message);
    setData([]);
    setColumns([]);
    setXAxis('');
    setYAxis('');
    setShowChart(false);
  };

  // Create chart data depending on type
  const getChartData = () => {
    if (!xAxis || (!yAxis && chartType !== 'pie') || data.length === 0) return null;

    const labels = data.map(row => String(row[xAxis]));

    if (chartType === 'pie') {
      const aggregate = labels.reduce((acc, label, i) => {
        const value = Number(data[i][yAxis]) || 0;
        acc[label] = (acc[label] || 0) + value;
        return acc;
      }, {});
      return {
        labels: Object.keys(aggregate),
        datasets: [{
          label: `${yAxis} distribution`,
          data: Object.values(aggregate),
          backgroundColor: Object.keys(aggregate).map(
            (_, i) => `hsl(${(i * 50) % 360}, 70%, 60%)`
          ),
        }]
      };
    }

    if (chartType === 'scatter') {
      const scatterData = data.map(row => {
        const xVal = Number(row[xAxis]);
        const yVal = Number(row[yAxis]);
        return { x: isNaN(xVal) ? 0 : xVal, y: isNaN(yVal) ? 0 : yVal };
      });
      return {
        datasets: [{
          label: `${yAxis} vs ${xAxis}`,
          data: scatterData,
          backgroundColor: 'rgba(75,192,192,0.6)',
        }]
      };
    }

    // Bar & Line charts
    const values = data.map(row => Number(row[yAxis]) || 0);
    return {
      labels,
      datasets: [{
        label: `${yAxis} by ${xAxis}`,
        data: values,
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      }]
    };
  };

  const handleGenerateChart = () => {
    setShowChart(true);
  };

  return (
    <div className="md:w-2xl md:mx-20 lg:w-6xl lg:mx-70 mt-12 p-6 bg-white rounded-lg shadow-lg font-sans">
      <h2 className="text-3xl font-bold text-center mb-6">Excel Chart Visualizer</h2>

      <div className="flex justify-center mb-6">
        <FileUpload onDataParsed={onDataParsed} onError={onError} />
      </div>

      {error && (
        <div className="text-center text-red-600 font-semibold mb-4">{error}</div>
      )}

      {columns.length > 0 && (
        <ChartSelectors
          columns={columns}
          data={data}
          xAxis={xAxis}
          yAxis={yAxis}
          chartType={chartType}
          onXAxisChange={setXAxis}
          onYAxisChange={setYAxis}
          onChartTypeChange={setChartType}
          onGenerateChart={handleGenerateChart}
        />
      )}

      {showChart && (
        <div className="p-4 bg-gray-100 rounded shadow mt-6 min-h-[350px]">
          <ChartRender chartData={getChartData()} chartType={chartType} />
          
          {/* Add download functionality */}
          <div className="mt-6 flex justify-center">
            <ChartDownload
              chartType={chartType}
              chartData={getChartData()}
              fileName={`${xAxis}_${yAxis}_${chartType}_chart`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExcelChartBuilder;


 



