import React from 'react';
import AdminPanel from './AdminPanel';
import UserList from './UserList';
import Navbar from '../../components/Navbar';

function AdminDashboard() {
  return ( 
  <>
  <Navbar/>
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Admin Dashboard</h1>
     
      <AdminPanel/>
      <UserList/>
    </div>
    </>
  );
}

export default AdminDashboard;
