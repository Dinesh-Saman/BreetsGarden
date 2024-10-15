import React, { useState } from "react";
import CommonHeader from './CommonHeader'; 

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Hardcoded credentials for demo purposes
  const validCredentials = [
    { email: "emanager@gmail.com", password: "123" },
    { email: "admin@gmail.com", password: "456" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the entered credentials match any of the valid ones
    const isValidUser = validCredentials.some(
      (cred) => cred.email === email && cred.password === password
    );

    if (isValidUser) {
      setSuccess("Login successful!");
      setError("");
      // Redirect or perform additional actions on successful login
      window.location.href = "/Man"; // Example redirect
    } else {
      setError("Invalid credentials");
      setSuccess("");
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
      <h2>Event Manager Login</h2>
      
        <form onSubmit={handleSubmit}>
          <div className="sm-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="sm-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="log">
            Login
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
    

      <style jsx>{`
        .login-container {
    width: 300px;
    margin: 100px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f8f8f8;
    
  }
  
  .login-container h2 {
    text-align: center;
  }
  
  .sm-group {
    margin-bottom: 15px;
  }
  
  .sm-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .sm-group input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }
      `}</style>
    </div>
    </div>
  );
}

export default LoginPage;
