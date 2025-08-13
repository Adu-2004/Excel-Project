import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await axios.post('http://localhost:3000/api/admin/login', { email, password });

      // Extract data exactly as provided by your backend
      const { message, success, token, role } = res.data;

      if (success && role === 'admin') {
        // Store token and role in localStorage (or secure cookie)
        localStorage.setItem('adminToken', token);
        localStorage.setItem('role', role);

        alert(message); // "Admin login successful"
        
        // Redirect admin to dashboard
        window.location.href = '/admin/dashboard';
      } else {
        setErrorMsg(message || 'Login failed');
      }

    } catch (error) {
      console.error(error);
      setErrorMsg(
        error.response?.data?.message || 'Something went wrong, please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container" style={{ maxWidth: '400px', margin: 'auto', padding: 20 }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: 8 }}
          />
        </div>

        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

        <button type="submit" disabled={loading} style={{ padding: 10, width: '100%' }}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;


