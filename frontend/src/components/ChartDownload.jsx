import React, { useRef } from "react";
import { Bar, Line, Pie, Scatter } from "react-chartjs-2";
import jsPDF from "jspdf";

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


const ChartMap = {
  bar: Bar,
  line: Line,
  pie: Pie,
  scatter: Scatter,
};

const ChartDownload = ({
  chartType = "bar",
  chartData,
  chartOptions = {},
  fileName = "chart",
}) => {
  const chartRef = useRef();

  const getChartImage = (type = "png") => {
    if (chartRef.current) {
      const chartInstance = chartRef.current;
      const chart = chartInstance.chart || chartInstance;
      if (chart.toBase64Image) {
        return chart.toBase64Image(`image/${type}`);
      }
      return chart.canvas.toDataURL(`image/${type}`);
    }
    return null;
  };

  const handleDownloadPNG = () => {
    const url = getChartImage("png");
    if (url) {
      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName}.png`;
      link.click();
    }
  };

  const handleDownloadPDF = () => {
    const url = getChartImage("png");
    if (url) {
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: "a4",
      });
      // Calculate suitable width/height for image placement
      const padding = 32;
      const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * padding;
      const pdfHeight = pdf.internal.pageSize.getHeight() - 2 * padding;
      pdf.text(fileName, padding, 40);
      pdf.addImage(
        url,
        "PNG",
        padding,
        60,
        pdfWidth,
        pdfHeight - 60
      );
      pdf.save(`${fileName}.pdf`);
    }
  };

  const ChartComponent = ChartMap[chartType] || Bar;

  return (
    <div>
      <div style={{ position: "relative", width: "100%" }}>
        <ChartComponent ref={chartRef} data={chartData} options={chartOptions} />
      </div>
      <div className="flex gap-4 mt-4">
        <button
          className="px-6 py-2 bg-emerald-600 rounded font-bold text-white shadow hover:bg-emerald-700 transition"
          onClick={handleDownloadPNG}
        >
          Download PNG
        </button>
        <button
          className="px-6 py-2 bg-indigo-600 rounded font-bold text-white shadow hover:bg-indigo-700 transition"
          onClick={handleDownloadPDF}
        >
          Download PDF
        </button>

        
      </div>
    </div>
  );
};

export default ChartDownload;
