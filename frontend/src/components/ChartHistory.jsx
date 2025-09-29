import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Bar, Pie, Line, Scatter } from "react-chartjs-2";
import jsPDF from "jspdf";
import Navbar from "./Navbar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PieController,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  LineController,
  ScatterController,
} from "chart.js";
import { toast } from "react-toastify";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PieController,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  LineController,
  ScatterController
);

const chartTypes = [
  { key: "bar", label: "Bar Chart", component: Bar },
  { key: "pie", label: "Pie Chart", component: Pie },
  { key: "line", label: "Line Chart", component: Line },
  { key: "scatter", label: "Scatter Plot", component: Scatter },
];

const ChartHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedChartType, setSelectedChartType] = useState(null);

  const chartRef = useRef();

  useEffect(() => {
    fetch("http://localhost:3000/api/history/allfile")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch chart history");
        return res.json();
      })
      .then((data) => {
        setHistory(Array.isArray(data) ? data : []);
        setErr("");
      })
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, []);

  const generateChartData = (file, chartTypeKey) => {
    const baseValue = file.originalname.length;
    const labels = ["A", "B", "C", "D", "E"];
    const colors = ["#4ade80", "#60a5fa", "#f87171", "#fbbf24", "#a78bfa"];

    switch (chartTypeKey) {
      case "pie":
        return {
          labels,
          datasets: [
            {
              label: "Pie Dataset",
              data: labels.map((_, i) => baseValue + i * 3),
              backgroundColor: colors,
            },
          ],
        };
      case "scatter":
        const scatterData = labels.map((_, i) => ({
          x: i + 1,
          y: baseValue + i * 2,
        }));
        return {
          datasets: [
            {
              label: "Scatter Dataset",
              data: scatterData,
              backgroundColor: "rgba(75,192,192,0.6)",
            },
          ],
        };
      case "line":
        return {
          labels,
          datasets: [
            {
              label: "Line Dataset",
              data: labels.map((_, i) => baseValue + i * 4),
              fill: false,
              borderColor: "rgba(75,192,192,1)",
              tension: 0.1,
            },
          ],
        };
      case "bar":
      default:
        return {
          labels,
          datasets: [
            {
              label: "Bar Dataset",
              data: labels.map((_, i) => baseValue + i * 5),
              backgroundColor: "rgba(75,192,192,0.6)",
            },
          ],
        };
    }
  };

  const handleViewClick = (file) => {
    setSelectedFile(file);
    setSelectedChartType(null);
    setShowModal(true);
  };
 const handleDelete = async (fileId) => {
 
    try {
      const response = await fetch(`http://localhost:3000/api/history/delete/${fileId}`, {
        method: "DELETE",
       });  
      const data = await res.json();
     toast.success('File deleted successfully');  
    
  } catch (error) {
    toast.error('Error deleting file');
  }
  };


  const handleDownloadPNG = () => {
    if (!chartRef.current) return;
    const chart = chartRef.current.chart || chartRef.current;
    const url = chart.toBase64Image();
    const link = document.createElement("a");
    link.href = url;
    const filename = selectedFile?.originalname || "chart";
    link.download = `${filename}_${selectedChartType}_chart.png`;
    link.click();
  };

  const handleDownloadPDF = () => {
    if (!chartRef.current) return;
    const chart = chartRef.current.chart || chartRef.current;
    const url = chart.toBase64Image();
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
    });
    const margin = 40;
    const pdfWidth = pdf.internal.pageSize.getWidth() - margin * 2;
    const pdfHeight = pdf.internal.pageSize.getHeight() - margin * 2;
    const filename = selectedFile?.originalname || "chart";
    pdf.text(`${filename} - ${selectedChartType} Chart`, margin, 30);
    pdf.addImage(url, "PNG", margin, 50, pdfWidth, pdfHeight - 50);
    pdf.save(`${filename}_${selectedChartType}_chart.pdf`);
  };

  const SelectedChartComponent =
    chartTypes.find((c) => c.key === selectedChartType)?.component || null;

  return (
    <>
      <Navbar />
      <div className="md:w-2xl md:mx-20 lg:w-6xl lg:mx-70 mt-12 p-6 bg-gray-100 rounded-2xl">
        <h2 className="text-3xl font-bold mb-4">Chart & Upload History</h2>
        {loading ? (
          <div className="text-gray-600 py-16 text-center">
            Loading history...
          </div>
        ) : err ? (
          <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded">
            {err}
          </div>
        ) : history.length === 0 ? (
          <div className="bg-gray-100 p-10 rounded text-center text-gray-500">
            No uploads or saved charts found yet.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl">
            <table className="min-w-full bg-white shadow rounded-lg">
              <thead className="bg-emerald-600">
                <tr>
                  <th className="py-3 px-4 text-white">#</th>
                  <th className="py-3 px-4 text-white">File Name</th>
                  <th className="py-3 px-4 text-white">Uploaded</th>
                  <th className="py-3 px-4 text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {history.map((file, idx) => (
                  <tr
                    key={file._id || file.id || idx}
                    className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="py-2 px-4 text-gray-700">{idx + 1}</td>
                    <td className="py-2 px-4">{file.originalname || "Untitled"}</td>
                    <td className="py-2 px-4 text-gray-600">
                      {file.createdAt
                        ? new Date(file.createdAt).toLocaleString()
                        : "-"}
                    </td>
                    <td className="py-2 px-4 flex gap-2">
                      <button
                        onClick={() => handleViewClick(file)}
                        className="px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700 text-sm"
                      >
                        View Chart
                      </button>
                      <button
                        onClick={() => handleDelete(file._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {showModal && (
          <div
            className="fixed inset-0 backdrop-blur bg-opacity-50 flex items-center justify-center z-40"
            onClick={() => setShowModal(false)}
          >
            <div
              className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-3xl max-h-[80vh] overflow-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-xl"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>

              {!selectedChartType ? (
                <>
                  <h3 className="text-xl font-semibold mb-4 text-center">
                    Select Chart Type to View
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {chartTypes.map((chart) => (
                      <button
                        key={chart.key}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none"
                        onClick={() => setSelectedChartType(chart.key)}
                      >
                        {chart.label}
                      </button>
                    ))}
                  </div>
                </>
              ) : SelectedChartComponent ? (
                <>
                  <h3 className="text-xl font-semibold mb-4 text-center">
                    {chartTypes.find((c) => c.key === selectedChartType)
                      ?.label}{" "}
                    for "{selectedFile?.originalname}"
                  </h3>
                  <div className="h-72">
                    <SelectedChartComponent
                      ref={chartRef}
                      data={generateChartData(selectedFile, selectedChartType)}
                      options={{ responsive: true, maintainAspectRatio: false }}
                    />
                  </div>

                  <div className="flex justify-center gap-4 mt-6 flex-wrap">
                    <button
                      onClick={handleDownloadPNG}
                      className="px-6 py-2 bg-emerald-600 rounded font-bold text-white shadow hover:bg-emerald-700 transition"
                    >
                      Download PNG
                    </button>
                    <button
                      onClick={handleDownloadPDF}
                      className="px-6 py-2 bg-indigo-600 rounded font-bold text-white shadow hover:bg-indigo-700 transition"
                    >
                      Download PDF
                    </button>
                    <button
                      onClick={() => setSelectedChartType(null)}
                      className="px-6 py-2 bg-gray-400 rounded font-bold text-white shadow hover:bg-gray-500 transition"
                    >
                      Change Chart Type
                    </button>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChartHistory;


