// src/pages/Settings.jsx
import React, { useState } from 'react';

function Settings() {
  // State for form fields (example)
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    password: '',
    newPassword: '',
    confirmNewPassword: '',
    notifications: true,
    darkMode: false,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Save profile settings backend call or local state action
    alert('Settings saved successfully.');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-semibold mb-6 text-indigo-700">User Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Info */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={profile.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>
        </section>

        {/* Password Change */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Change Password</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="password">Current Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={profile.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="newPassword">New Password</label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                value={profile.newPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="confirmNewPassword">Confirm New Password</label>
              <input
                id="confirmNewPassword"
                name="confirmNewPassword"
                type="password"
                value={profile.confirmNewPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="••••••••"
              />
            </div>
          </div>
        </section>

        {/* Preferences */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Preferences</h3>
          <div className="flex flex-col gap-4">
            <label className="inline-flex items-center space-x-3 cursor-pointer select-none">
              <input
                type="checkbox"
                name="notifications"
                checked={profile.notifications}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
              <span className="text-gray-700">Enable Email Notifications</span>
            </label>

            <label className="inline-flex items-center space-x-3 cursor-pointer select-none">
              <input
                type="checkbox"
                name="darkMode"
                checked={profile.darkMode}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
              <span className="text-gray-700">Enable Dark Mode</span>
            </label>
          </div>
        </section>

        <button
          type="submit"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}

export default Settings;
