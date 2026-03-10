import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="logo-section">
          <h1>PremiumPortal</h1>
        </div>
        <div className="user-section">
          <span>Welcome, <strong>{user?.name}</strong></span>
          <button onClick={handleLogout} className="logout-btn">Log Out</button>
        </div>
      </nav>
      
      <main className="dashboard-content">
        <header className="hero">
          <h2>User Dashboard</h2>
          <p>This is a protected area. Only signed-in users can see this content.</p>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Profile Status</h3>
            <p className="status active">Active</p>
          </div>
          <div className="stat-card">
            <h3>Account Type</h3>
            <p>Premium User</p>
          </div>
          <div className="stat-card">
            <h3>Login Email</h3>
            <p>{user?.email}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
