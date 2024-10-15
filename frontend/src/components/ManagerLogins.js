import React from "react";
import CommonHeader from "./CommonHeader";

function ManagerLogins() {
    // Define styles using CSS-in-JS
    const styles = {
        container: {
            textAlign: 'center',
            paddingTop: '100px' // Push content below the header
        },
        buttonContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'calc(120vh - 200px)', // Full height minus header and heading space
            gap: '10px' // Space between buttons
        },
        button: {
            backgroundColor: '#1E3A8A', // Dark blue color
            color: '#FFFFFF',            // White text color
            padding: '10px 20px',
            width: '250px',              // Fixed width for equal size
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            textDecoration: 'none',
            textAlign: 'center',
            whiteSpace: 'nowrap'         // Prevent text from wrapping
        }
    };

    return (
        <div>
            <CommonHeader />

            {/* Adding padding to push content below the header */}
            <div style={styles.container}>
                <h1 style={{marginTop:'10px'}}>Welcome to the Home Page</h1>
                {/* Button container for vertical alignment */}
                <div style={styles.buttonContainer}>
                    <a href="/reslogin" style={{ textDecoration: 'none' }}>
                        <button style={styles.button}>Reservation Manager Login</button>
                    </a>
                    <a href="/admin-login" style={{ textDecoration: 'none' }}>
                        <button style={styles.button}>Review Manager Login</button>
                    </a>
                    <a href="/slogin" style={{ textDecoration: 'none' }}>
                        <button style={styles.button}>Service Manager Login</button>
                    </a>

                    <a href="/stockM" style={{ textDecoration: 'none' }}>
                        <button style={styles.button}>Stock Manager Login</button>
                    </a>

                    <a href="/elogin" style={{ textDecoration: 'none' }}>
                        <button style={styles.button}>Event Manager Login</button>
                    </a>

                    <a href="/stflogin" style={{ textDecoration: 'none' }}>
                        <button style={styles.button}>Staff Manager Login</button>
                    </a>

                    <a href="/mnulogin" style={{ textDecoration: 'none' }}>
                        <button style={styles.button}>Menu Manager Login</button>
                    </a>

                    <a href="/stafflogin" style={{ textDecoration: 'none' }}>
                        <button style={styles.button}>Staff Login</button>
                    </a>
                    
                </div>
            </div>
        </div>
    );
}

export default ManagerLogins;
