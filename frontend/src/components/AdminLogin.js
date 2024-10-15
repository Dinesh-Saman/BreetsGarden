import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css_files/AdminLogin.css'; // Import the CSS file
import CommonHeader from './CommonHeader'; 

function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const loginData = { username, password };

        try {
            const response = await axios.post('http://localhost:8080/admin-login', loginData);
            if (response.data === 'Admin login successful') {
                localStorage.setItem('isAdminLoggedIn', true); // Store admin session
                navigate('/admin-dashboard'); // Redirect to admin dashboard
            } else {
                alert(response.data); // Show error message from the server
            }
        } catch (error) {
            alert(error.response?.data || "Error logging in");
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
        <div className="login-container20">
            <div className="login-box20">
                <h1>Admin Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="form-group20">
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group20">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </div>
        </div>
    );
}

export default AdminLogin;
