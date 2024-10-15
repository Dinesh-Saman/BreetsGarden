import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CommonHeader from './CommonHeader';

function CusLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Check for admin credentials
        if (username === "admin" && password === "admin") {
            navigate('/view-staff');
            return; 
        }

        // Check for staff credentials
        if (username.includes("STF") && password === "staff") {
            navigate('/user');
            return; 
        }

        const loginData = { username, password };

        try {
            const response = await axios.post('http://localhost:8080/customer/login', loginData);

            if (response.data === 'Login successful') {
                // Store the username and email in local storage
                localStorage.setItem('username', username);
                localStorage.setItem('email', response.data.email); // Assuming email is returned

                // Navigate to Home.js after successful login
                navigate('/Home');
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
            backgroundColor: '#87CEEB',
        },
        formFrame: {
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '30px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            maxWidth: '400px',
            width: '100%'
        },
        header: {
            textAlign: 'center',
            marginBottom: '20px'
        },
        button: {
            backgroundColor: '#1E3A8A',
            color: '#FFFFFF',
            padding: '10px',
            width: '100%',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'center',
            borderRadius: '4px'
        }
    };

    return (
        <div style={styles.container}>
            <CommonHeader />
            <div style={styles.formFrame}>
                <h1 style={styles.header}>Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Enter Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" style={styles.button}>Login</button>
                </form>
            </div>
        </div>
    );
}

export default CusLogin;
