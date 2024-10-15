import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css_files/Login.css';  // Link to your custom CSS file
import CommonHeader from './CommonHeader'; 


function StockManagerLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Hardcoded credentials for simplicity
    if (username === 'chathu123' && password === '2001') {
      // If login is successful, redirect to the dashboard
      navigate('/stockDash');
    } else {
      // Set error message for incorrect login
      setError('Invalid username or password');
    }
  };

  const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#87CEEB' // Light blue background
    },
    formFrame: {
      backgroundColor: 'white', // Matching background color
      borderRadius: '8px',
      padding: '30px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      maxWidth: '400px',
      width: '100%'
  },
  };

  return (
    <div style={styles.container}>
            <CommonHeader />
    <div className="login-container">
      <h2>Stock Manager Login</h2>
      <form onSubmit={handleLogin}>
        <div className="sm-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="sm-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button className="log" type="submit">Login</button>
      </form>
    </div>
    </div>
  );
}

export default StockManagerLogin;
