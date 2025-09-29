import React from 'react';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';

const allowedExtensions = ['xlsx', 'xls'];

const FileUpload = ({ onDataParsed, onError }) => {
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return 
        onError('No file selected.');

    const ext = file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(ext)) return onError('Please upload only .xlsx or .xls files.');

    // Parse locally (optional, if you want instant preview)
    const reader = new FileReader();
    reader.onload = evt => {
      try {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const jsonData = XLSX.utils.sheet_to_json(ws, { defval: '' });

        if (jsonData.length === 0) {
          toast.error('The Excel sheet is empty.');
          return;
        }
        onDataParsed(jsonData);
      } catch {
        toast.error('Error parsing Excel file.');
      }
    };
    reader.readAsBinaryString(file);

    // ----------- Upload file to backend ------------
    try {
      const formData = new FormData();
      formData.append("excelFile", file); // field name must match backend

      const response = await fetch("http://localhost:3000/api/upload-excel", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
     toast.success('File upload successfully!');
      if (!response.ok) {
        toast.error(data.message || "File upload failed!");
        return;
      }

      // Optionally—alert success, update parent, etc.
      // You may want to provide onUploadSuccess callback in parent

    } catch (err) {
      toast.error("Network error or upload failed: " + err.message);
    }
  };

  return (
    <label className="px-6 py-2 rounded-lg bg-emerald-700 text-white cursor-pointer hover:bg-emerald-800 transition">
      Upload .xlsx / .xls
      <input type="file" accept=".xlsx, .xls" onChange={handleFile} className="hidden" />
    </label>
  );
};


export default FileUpload;

