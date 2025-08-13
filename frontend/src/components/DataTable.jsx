import React, { useState } from "react";
import FileUpload from "./FileUpload";
import Navbar from "./Navbar";
const DataTable = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  // Handle successful data parsing
  const onDataParsed = (jsonData) => {
    setError("");
    setData(jsonData);
    setCurrentPage(1); // Reset to first page when new data loads
  };

  // Handle upload errors
  const onError = (message) => {
    setError(message);
    setData([]);
  };

  // Get table columns from the first row
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  // Pagination logic
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(startIndex, startIndex + rowsPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPrevious = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
   <>
   <Navbar/>
    <div className=" bg-gray-100 rounded-2xl md:w-2xl md:mx-20 lg:w-6xl lg:mx-70 mt-12 p-6  ">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Data Table</h1>
        <p className="text-gray-600">Upload your Excel file to view data in table format</p>
      </div>

      {/* File Upload Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <FileUpload onDataParsed={onDataParsed} onError={onError} />
        
        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
      </div>

      {/* Data Summary */}
      {data.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="font-semibold text-blue-800">
              Total Rows: <span className="text-blue-600">{data.length}</span>
            </span>
            <span className="font-semibold text-blue-800">
              Total Columns: <span className="text-blue-600">{columns.length}</span>
            </span>
            <span className="font-semibold text-blue-800">
              Current Page: <span className="text-blue-600">{currentPage} of {totalPages}</span>
            </span>
          </div>
        </div>
      )}

      {/* Data Table */}
      {data.length > 0 ? (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Table Header */}
              <thead className="bg-indigo-600">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    #
                  </th>
                  {columns.map((column) => (
                    <th
                      key={column}
                      className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-200">
                {currentData.map((row, index) => (
                  <tr
                    key={startIndex + index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    {/* Row Number */}
                    <td className="px-4 py-3 text-sm font-medium text-gray-600">
                      {startIndex + index + 1}
                    </td>
                    
                    {/* Data Cells */}
                    {columns.map((column) => (
                      <td
                        key={column}
                        className="px-4 py-3 text-sm text-gray-900 max-w-xs truncate"
                        title={String(row[column])} // Tooltip for full content
                      >
                        {row[column] !== null && row[column] !== undefined 
                          ? String(row[column]) 
                          : <span className="text-gray-400 italic">-</span>
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <p className="text-sm text-gray-700">
                    Showing {startIndex + 1} to {Math.min(startIndex + rowsPerPage, data.length)} of {data.length} results
                  </p>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={goToPrevious}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      currentPage === 1
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                  >
                    Previous
                  </button>

                  {/* Page Numbers */}
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-3 py-2 text-sm font-medium rounded-md ${
                          currentPage === page
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}

                  <button
                    onClick={goToNext}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      currentPage === totalPages
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        // Empty State
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-gray-400 text-6xl mb-4">📊</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Data Available</h3>
          <p className="text-gray-500">Upload an Excel file to see your data in table format</p>
        </div>
      )}
    </div>
    </>
  );
};

export default DataTable;

