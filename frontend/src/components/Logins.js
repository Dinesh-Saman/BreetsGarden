import React from "react";
import CommonHeader from "./CommonHeader";

function Logins() {
    // Define styles using CSS-in-JS
    const styles = {
        container: {
            textAlign: 'center',
            paddingTop: '100px' // Adjust to place below header
        },
        buttonContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'calc(100vh - 200px)' // Full height minus header and heading space
        },
        button: {
            backgroundColor: '#1E3A8A', // Dark blue color
            color: '#FFFFFF',            // White text color
            padding: '10px 20px',
            marginBottom: '10px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            textDecoration: 'none',
            textAlign: 'center'
        }
    };

    return (
        <div>
            <CommonHeader />

            {/* Heading below the header */}
            <div style={styles.container}>
                <h1>Welcome to the Home Page</h1>
            </div>

            {/* Adding Flexbox to center the buttons */}
            <div style={styles.buttonContainer}>
                <a href="/login" style={{ textDecoration: 'none' }}>
                    <button style={styles.button}>Customer Login</button>
                </a>
                <a href="/managerlogin" style={{ textDecoration: 'none' }}>
                    <button style={styles.button}>Manager Login</button>
                </a>
                
            </div>
        </div>
    );
}

export default Logins;
