/*import React from "react";
import { Link } from "react-router-dom";
import './css_files/Header.css'


function Header(){
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="#" style={{color:"red"}}>Navbar</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" 
            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                
                <Link to="/facilities-dashboard" className="nav-link active">Home</Link> 
                <Link to="/day-out-packages" className="nav-link">Dayout Packages</Link>
               <Link to="/activities">Activities</Link>
                <Link to="/spa-services" className="nav-link">Spa Service</Link>
                
            </div>
            </div>
        </div>
        </nav>
    )
}
*/



import React from 'react';
import logo from './css_files/images/Untitled-2.png'; // Path for the logo
import './css_files/CusHeader.css'; // Importing the CSS file


function CusHeader() {
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        window.location.href = '/login'; // Redirect to login page
    };

    // Inline styles for the header
    const headerContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#4BAAC8',
        padding: '0 20px', // Remove top and bottom padding
        height: '100px', // Set a fixed height for the header
    };

    const logoStyle = {
        width: '150px', // Set the desired width for the logo
        height: 'auto', // Keep height proportional to width
        margin: '0', // Remove any margin around the logo
        padding: '0', // Remove any padding around the logo
    };

    const headerTitleStyle = {
        color: 'white',
        fontSize: '2.5rem',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        margin: 0,
        fontFamily: '"Georgia", serif', // Change the font style here
        textAlign: 'center', // Center the text
        flexGrow: 1, // Allow the title to grow and take up space
    };

    return (
        <>
            <div style={headerContainerStyle}>
                <img src={logo} alt="Hotel Breeta's Garden" style={logoStyle} />
                <h1 style={headerTitleStyle}>Hotel Breeta's Garden</h1>
            </div>

            <nav className="header-nav">
                <div className="header-container">
                    <div className="header-links">
                        {username && email ? (
                            <>
                                <a href="/">Home</a>
                                <a href="/getcusrooms">Bookings</a>
                                <a href="/reviews">Reviews</a>
                                <a href="/facilities-dashboard">Services</a>
                                <a href="/menu-page">Menus</a>
                                <a href="/AllPro">Events</a>
                                <a href="/gallery">Gallery</a>
                            </>
                        ) : (
                            <>
                                <a href="/login" onClick={(e) => e.preventDefault()}>Home</a>
                                <a href="/login" onClick={(e) => e.preventDefault()}>Bookings</a>
                                <a href="/login" onClick={(e) => e.preventDefault()}>Reviews</a>
                                <a href="/login" onClick={(e) => e.preventDefault()}>Services</a>
                                <a href="/login" onClick={(e) => e.preventDefault()}>Menus</a>
                                <a href="/login" onClick={(e) => e.preventDefault()}>Events</a>
                                <a href="/login" onClick={(e) => e.preventDefault()}>Gallery</a>
                            </>
                        )}
                    </div>

                    <div className="header-auth">
                        {username && email ? (
                            <>
                                <span className="header-username">Hello, {username}</span>
                                <span className="header-logout" onClick={handleLogout}>Logout</span>
                            </>
                        ) : (
                            <a href="/login" className="header-login">Login</a>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default CusHeader;





/*import React from "react";
import { Link } from "react-router-dom";
import './css_files/Header.css';  // Import custom CSS for styling


function Header() {
  return (
    <div className="d-flex">
      
      <nav className="sidebar bg-body-tertiary">
        <div className="container-fluid">
          <h2 className="sidebar-brand" style={{ color: "red" }}>Navbar</h2>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/" className="nav-link active">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/create" className="nav-link">Add Dayout Packages</Link>
            </li>
            <li className="nav-item">
              <Link to="/book" className="nav-link">Book Dayout</Link>
            </li>
            <li className="nav-item">
              <Link to="/spa-services" className="nav-link">Add Spa Service</Link>
            </li>
          </ul>
        </div>
      </nav>

    
     
    </div>
  );
}

*/



