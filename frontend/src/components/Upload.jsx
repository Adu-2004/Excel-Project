/*import React, { useState } from "react";

const Upload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
    setError("");
  };

  const uploadFileToServer = async (fileToUpload) => {
    const formData = new FormData();
    formData.append("excelFile", fileToUpload);

    const response = await fetch("http://localhost:3000/api/upload-excel", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "File upload failed");
    }

    return data.cloudinaryUrl || "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    try {
      setUploading(true);

      const uploadedFileUrl = await uploadFileToServer(file);
      setMessage("File uploaded to Cloudinary successfully!");

      const saveResponse = await fetch("http://localhost:3000/api/uploads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalname: file.name,
          cloudinaryUrl: uploadedFileUrl,
        }),
      });

      const saveData = await saveResponse.json();

      if (!saveResponse.ok) {
        throw new Error(saveData.message || "Failed to save upload history");
      }

      setMessage((m) => m + " File info saved to database.");
      setFile(null);
      e.target.reset();

      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (err) {
      setError(err.message);
      setMessage("");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Upload Excel File</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          className="mb-4"
          required
        />
        <button
          type="submit"
          disabled={uploading}
          className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default Upload;

*/







