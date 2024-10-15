import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CommonHeader from './CommonHeader';

function CusRegister() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function sendData(e) {
        e.preventDefault();

        const newCustomer = {
            username,
            email,
            password
        };

        axios.post("http://localhost:8080/customer/register", newCustomer)
            .then((response) => {
                alert(response.data);
                navigate('/login');
            })
            .catch((err) => {
                alert(err.response?.data || "Error registering customer");
            });
    }

    // Define CSS styles
    const styles = {
        container: {
            backgroundColor: '#87CEEB',  // Light blue background
            minHeight: '100vh',
            paddingTop: '100px',  // Push content below header
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        formContainer: {
            backgroundColor: '#FFFFFF',  // White background for form
            padding: '40px',
            borderRadius: '8px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            maxWidth: '400px',
            width: '100%'
        },
        header: {
            textAlign: 'center',
            marginBottom: '20px'
        },
        button: {
            backgroundColor: '#1E3A8A',  // Dark blue button
            color: '#FFFFFF',            // White text
            padding: '10px 20px',
            border: 'none',
            cursor: 'pointer',
            width: '100%',
            textAlign: 'center'
        }
    };

    return (
        <div>
            <CommonHeader />

            {/* Form content centered in frame */}
            <div style={styles.container}>
                <div style={styles.formContainer}>
                    <h1 style={styles.header}>Register</h1>
                    <form onSubmit={sendData}>
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
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="abc@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                        <button type="submit" style={styles.button}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CusRegister;
