import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      signup(formData);
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-card">
      <div className="glass-morphism">
        <h2>Create Account</h2>
        <p className="subtitle">Join our premium community</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input 
              type="text" 
              required 
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              required 
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              required 
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          {error && <p className="error-msg">{error}</p>}
          <button type="submit" className="primary-btn">Sign Up</button>
        </form>
        <p className="auth-footer">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
