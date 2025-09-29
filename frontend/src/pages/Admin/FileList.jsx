/*import React, { useState } from 'react';

const FileList = ({ files, onDelete, onUpdate }) => {
  const [editId, setEditId] = useState(null);
  const [editFilename, setEditFilename] = useState('');

  const startEdit = (file) => {
    setEditId(file._id);
    setEditFilename(file.filename);
  };

  const saveEdit = (id) => {
    onUpdate(id, { filename: editFilename });
    setEditId(null);
    setEditFilename('');
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditFilename('');
  };

  return (
    <table className="w-full table-auto border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 p-2">Filename</th>
          <th className="border border-gray-300 p-2">User</th>
          <th className="border border-gray-300 p-2">Size (KB)</th>
          <th className="border border-gray-300 p-2">Uploaded At</th>
          <th className="border border-gray-300 p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {files.map((file) => (
          <tr key={file._id} className="hover:bg-gray-50">
            <td className="border border-gray-300 p-2">
              {editId === file._id ? (
                <input
                  type="text"
                  value={editFilename}
                  onChange={(e) => setEditFilename(e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                />
              ) : (
                file.originalname
              )}
            </td>
            <td className="border border-gray-300 p-2">{file.userId ? file.userId.name : 'Unknown'}</td>
            <td className="border border-gray-300 p-2">{(file.size / 1024).toFixed(2)}</td>
            <td className="border border-gray-300 p-2">{new Date(file.createdAt).toLocaleString()}</td>
            <td className="border border-gray-300 p-2 space-x-2">
              {editId === file._id ? (
                <>
                  <button
                    className="text-green-600 hover:underline"
                    onClick={() => saveEdit(file._id)}
                  >
                    Save
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => startEdit(file)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => onDelete(file._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
        {files.length === 0 && (
          <tr>
            <td colSpan="5" className="text-center p-4 text-gray-500">
              No files uploaded yet.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default FileList;
*/
import React, { useState } from 'react';
import { MdMessage } from 'react-icons/md';
import { toast } from 'react-toastify';


const FileList = ({ files, onDelete, onUpdate }) => {
  const [editId, setEditId] = useState(null);
  const [editFilename, setEditFilename] = useState('');

  const startEdit = (file) => {
    setEditId(file._id);
    setEditFilename(file.filename);
  };

  const saveEdit = async (id) => {
    try {
      await onUpdate(id, { filename: editFilename });
      toast.success('File updated successfully');
      setEditId(null);
      setEditFilename('');
    } catch (err) {
      toast.error('Failed to update file');
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditFilename('');
  };

  const handleDelete = async (id) => {
    try {
      await onDelete(id);
      toast.success('File deleted successfully');
    } catch (err) {
      toast.error('Failed to delete file');
    }
  };

  return (
    <table className="w-full table-auto border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 p-2">Filename</th>
          <th className="border border-gray-300 p-2">User</th>
          <th className="border border-gray-300 p-2">Size (KB)</th>
          <th className="border border-gray-300 p-2">Uploaded At</th>
          <th className="border border-gray-300 p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {files.map((file) => (
          <tr key={file._id} className="hover:bg-gray-50">
            <td className="border border-gray-300 p-2">
              {editId === file._id ? (
                <input
                  type="text"
                  value={editFilename}
                  onChange={(e) => setEditFilename(e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                />
              ) : (
                file.originalname
              )}
            </td>
            <td className="border border-gray-300 p-2">{file.userId ? file.userId.name : 'Unknown'}</td>
            <td className="border border-gray-300 p-2">{(file.size / 1024).toFixed(2)}</td>
            <td className="border border-gray-300 p-2">{new Date(file.createdAt).toLocaleString()}</td>
            <td className="border border-gray-300 p-2 space-x-2">
              {editId === file._id ? (
                <>
                  <button
                    className="text-green-600 hover:underline"
                    onClick={() => saveEdit(file._id)}
                  >
                    Save
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => startEdit(file)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(file._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
        {files.length === 0 && (
          <tr>
            <td colSpan="5" className="text-center p-4 text-gray-500">
              No files uploaded yet.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default FileList;
