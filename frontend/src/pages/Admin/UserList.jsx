/*import React, { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    const res = await fetch('http://localhost:3000/api/admin/users');
    if (!res.ok) {
        const text = await res.text();
      console.error('Error response:', text);
      alert('Failed to fetch users:' + res.status);
      return;
    }
    const data = await res.json();
    setUsers(data);
   // setLoading(false);
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    const res = await fetch(`http://localhost:3000/api/admin/users/${id}`, { method: 'DELETE' });
    if (res.ok) {
      alert('User deleted successfully');
      fetchUsers();
    } else {
      alert('Failed to delete user');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="bg-white rounded shadow p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">User List</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Last Login</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">No users found</td>
            </tr>
          )}
          {users.map(user => (
            <tr key={user._id} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}</td>
              <td className="border border-gray-300 p-2">
                {user.isActive ? (
                  <span className="text-green-600 font-semibold">Active</span>
                ) : (
                  <span className="text-red-600 font-semibold">Inactive</span>
                )}
              </td>
              <td className="border border-gray-300 p-2">
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => deleteUser(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;

import React, { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/admin/users');
      if (!res.ok) {
        const text = await res.text();
        console.error('Error response:', text);
        alert('Failed to fetch users: ' + res.status);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Failed to fetch users: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      const res = await fetch(`http://localhost:3000/api/admin/users/${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert('User deleted successfully');
        await fetchUsers();
      } else {
        const text = await res.text();
        alert('Failed to delete user: ' + res.status + ' ' + text);
      }
    } catch (error) {
      alert('Failed to delete user: ' + error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="bg-white rounded shadow p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">User List</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Last Login</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">
                No users found
              </td>
            </tr>
          ) : (
            users.map(user => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">{user.name}</td>
                <td className="border border-gray-300 p-2">{user.email}</td>
                <td className="border border-gray-300 p-2">{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}</td>
                <td className="border border-gray-300 p-2">
                  {user.isActive ? (
                    <span className="text-green-600 font-semibold">Active</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Inactive</span>
                  )}
                </td>
                <td className="border border-gray-300 p-2">
                  <button className="text-red-600 hover:underline" onClick={() => deleteUser(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
*/
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/admin/users');
      if (!res.ok) {
        const text = await res.text();
        console.error('Error response:', text);
        toast.error('Failed to fetch users: ' + res.status);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to fetch users: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      const res = await fetch(`http://localhost:3000/api/admin/users/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('User deleted successfully');
        await fetchUsers();
      } else {
        const text = await res.text();
        toast.error('Failed to delete user: ' + res.status + ' ' + text);
      }
    } catch (error) {
      toast.error('Failed to delete user: ' + error.message);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="bg-white rounded shadow p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">User List</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Role</th>  {/* New Role column */}
            <th className="border border-gray-300 p-2">Last Login</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center p-4 text-gray-500">
                No users found
              </td>
            </tr>
          ) : (
            users.map(user => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">{user.name}</td>
                <td className="border border-gray-300 p-2">{user.email}</td>
                <td className="border border-gray-300 p-2 capitalize">{user.role}</td>  {/* Role field */}
                <td className="border border-gray-300 p-2">{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}</td>
                <td className="border border-gray-300 p-2">
                  {user.isActive ? (
                    <span className="text-green-600 font-semibold">Active</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Inactive</span>
                  )}
                </td>
                <td className="border border-gray-300 p-2">
                  <button className="text-red-600 hover:underline" onClick={() => deleteUser(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
