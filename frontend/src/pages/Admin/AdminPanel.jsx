import React, { useEffect, useState } from 'react';
import FileList from './FileList';

const AdminPanel = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalFiles: 0 });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    const [usersRes, filesRes] = await Promise.all([
      fetch('http://localhost:3000/api/admin/total-users'),
      fetch('http://localhost:3000/api/admin/total-files'),
    ]);
    const usersData = await usersRes.json();
    const filesData = await filesRes.json();
    setStats({ totalUsers: usersData.totalUsers, totalFiles: filesData.totalFiles });
  };

  const fetchFiles = async () => {
    const res = await fetch('http://localhost:3000/api/admin/files');
    const data = await res.json();
    setFiles(data);
  };

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      await fetchStats();
      await fetchFiles();
      setLoading(false);
    };
    loadAll();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this file?')) return;
    await fetch(`http://localhost:3000/api/admin/files/${id}`, { method: 'DELETE' });
    await fetchStats();
    await fetchFiles();
  };

  const handleUpdate = async (id, updates) => {
    await fetch(`http://localhost:3000/api/admin/files/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    await fetchFiles();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-8">
        <div className="p-6 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-3xl">{stats.totalUsers}</p>
        </div>
        <div className="p-6 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Total Files</h2>
          <p className="text-3xl">{stats.totalFiles}</p>
        </div>
      </div>

      <div className="bg-white rounded shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Files History</h2>
        <FileList files={files} onDelete={handleDelete} onUpdate={handleUpdate} />
      </div>
    </div>
  );
};

export default AdminPanel;
