import React from 'react';

const ChartSelectors = ({
  columns,
  data,
  xAxis,
  yAxis,
  chartType,
  onXAxisChange,
  onYAxisChange,
  onChartTypeChange,
  onGenerateChart
}) => {
  // Filter numeric columns for Y-axis selection
  const numericColumns = columns.filter(col =>
    data.some(row => row[col] !== '' && !isNaN(Number(row[col])))
  );

  return (
    <div className="my-6 p-4 bg-gray-50 rounded-lg shadow space-y-4 md:flex md:space-y-0 md:space-x-6">
      <label className="flex flex-col">
        <span className="font-semibold mb-1">X-Axis</span>
        <select value={xAxis} onChange={e => onXAxisChange(e.target.value)} className="rounded border border-emerald-500 p-2">
          <option value="">Select</option>
          {columns.map(col => <option key={col} value={col}>{col}</option>)}
        </select>
      </label>

      {(chartType !== 'pie') && (
        <label className="flex flex-col">
          <span className="font-semibold mb-1">Y-Axis (Numeric)</span>
          <select value={yAxis} onChange={e => onYAxisChange(e.target.value)} className="rounded border border-emerald-500 p-2">
            <option value="">Select</option>
            {numericColumns.map(col => <option key={col} value={col}>{col}</option>)}
          </select>
        </label>
      )}

      {(chartType === 'pie') && (
        <label className="flex flex-col">
          <span className="font-semibold mb-1">Y-Axis (Numeric)</span>
          <select value={yAxis} onChange={e => onYAxisChange(e.target.value)} className="rounded border border-emerald-500 p-2">
            <option value="">Select</option>
            {numericColumns.map(col => <option key={col} value={col}>{col}</option>)}
          </select>
        </label>
      )}

      <label className="flex flex-col">
        <span className="font-semibold mb-1">Chart Type</span>
        <select value={chartType} onChange={e => onChartTypeChange(e.target.value)} className="rounded border border-emerald-500 p-2">
          <option value="bar">Bar</option>
          <option value="line">Line</option>
          <option value="pie">Pie</option>
          <option value="scatter">Scatter</option>
        </select>
      </label>

      <button
        onClick={onGenerateChart}
        className="self-end bg-amber-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-amber-600 transition"
        disabled={!xAxis || (!yAxis && chartType !== 'pie')}
      >
        Generate Chart
      </button>
    

    </div>
  );
};

export default ChartSelectors;
