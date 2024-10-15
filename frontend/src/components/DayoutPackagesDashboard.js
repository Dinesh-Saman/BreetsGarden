/*import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './css_files/DayoutDashboard.css';
//import './SpaServicesDashboard';
import day1 from './css_files/images/day1.jpeg';
import day2 from './css_files/images/day2.jpeg';
import day3 from './css_files/images/day3.jpeg';
import day4 from './css_files/images/day4.jpeg';

function DayoutPackagerDashboard() {
    const [selectedType, setSelectedType] = useState('All Types');
    const [selectedCategory, setSelectedCategory] = useState('All Groups');
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    const packages = [
        {
            id: 1,
            title: 'Special - Day Out Package',
            validity: 'Contact Hotel',
            duration: 'One Day',
            price: 2750,
            type: 'Special package',
            category: 'One Day',
            image: day1,
        },
        {
            id: 2,
            title: 'Couple Day Out Package',
            validity: 'during winter',
            duration: '1-2 days',
            price: 5000,
            type: 'Couple Package',
            category: 'One Night',
            image: day2,
        },
        {
            id: 3,
            title: 'Family Day Out Package',
            validity: 'during winter',
            duration: 'One day',
            price: 3500,
            type: 'Family Package',
            category: 'One Day',
            image: day3,
        },
        {
            id: 4,
            title: 'Dayout Package for 3-10 persons',
            validity: 'during winter',
            duration: 'One day',
            price: 5000,
            type: 'Group Package',
            category: 'One Day',
            image: day4,
        },
    ];

    const handleToggleFavorite = (pkg) => {
        const isFavorite = favorites.some(favorite => favorite.id === pkg.id);
        if (isFavorite) {
            setFavorites(favorites.filter(favorite => favorite.id !== pkg.id));
        } else {
            setFavorites([...favorites, pkg]);
        }
    };

    const handleCreditCardClick = (pkg) => {
        navigate('/creditcard', { state: { selectedPackage: pkg } });
    };

    const filteredPackages = packages.filter(pkg => {
        const matchesType = selectedType === 'All Types' || pkg.type === selectedType;
        const matchesCategory = selectedCategory === 'All Groups' || pkg.category === selectedCategory;
        return matchesType && matchesCategory;
    });

    return (
        <div className="container1">
             <nav className="navbar">
                <p className="nav-item"></p>
                <Link to="/facilities-dashboard" className="nav-item">Facilities & Services</Link>
                <Link to="/package-Dashboard" className="nav-item">Dayout Packages</Link>
                <Link to="/activitD" className="nav-item">Activities</Link>
                <Link to="/spa-intro" className="nav-item">Spa Service</Link>
            </nav>
            <div className="header">
                <h1 className='ddl'>Day-out Packages</h1>
                <p>Only the best packages for enjoying with your family and beloved ones.</p>
            </div>

            <div className="content">
                <div className="sidebar">
                    <div className="filter-group">
                        <label htmlFor="type">Tour Type</label>
                        <select
                            id="type"
                            className="form-control"
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                        >
                            <option>All Types</option>
                            <option>Couple Package</option>
                            <option>Family Package</option>
                            <option>Group Package</option>
                            <option>Special package</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label htmlFor="category">Tour Category</label>
                        <select
                            id="category"
                            className="form-control"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option>All Groups</option>
                            <option>One Day</option>
                            <option>One Night</option>
                            <option>Two Days</option>
                        </select>
                    </div>
                    <button type="reset" className="btn-reset" onClick={() => {
                        setSelectedType('All Types');
                        setSelectedCategory('All Groups');
                    }}>
                        Reset
                    </button>
                </div>

                <div className="packages-list">
                    {filteredPackages.map(pkg => (
                        <div key={pkg.id} className="package">
                            <img src={pkg.image} alt={pkg.title} className="package-image" />
                            <div className="package-details">
                                <h3 className="package-title">{pkg.title}</h3>
                                <p className="package-info">Validity Period: {pkg.validity}</p>
                                <p className="package-info">Tour Duration: {pkg.duration}</p>
                                <button
                                    className={`btn-favorite ${favorites.some(favorite => favorite.id === pkg.id) ? 'favorite-active' : ''}`}
                                    onClick={() => handleToggleFavorite(pkg)}
                                >
                                    {favorites.some(favorite => favorite.id === pkg.id) ? 'Remove from Favorites' : 'Add to My Favorites'}
                                </button>
                                <div className="price-book">
                                    <p className="price">Price Per Person: Rs {pkg.price}</p>
                                    <button className="btn-book" onClick={() => handleCreditCardClick(pkg)}>Book Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            
            {favorites.length > 0 && (
                <div className="favorites-section">
                     <h2>Your Favorites</h2>
                            <div className="packages-list">
                        {favorites.map(pkg => (
                            <div key={pkg.id} className="package">
                                <img src={pkg.image} alt={pkg.title} className="package-image" />
                                <div className="package-details">
                                    <h3 className="package-title">{pkg.title}</h3>
                                    <p className="package-info">Validity Period: {pkg.validity}</p>
                                    <p className="package-info">Tour Duration: {pkg.duration}</p>
                                    <div className="price-book">
                                        <p className="price">Price Per Person: Rs {pkg.price}</p>
                                        <button className="btn-book">Credit Card</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
            </div>
)}
    
        </div>
    );
}

export default DayoutPackagerDashboard;
*/



/*NEW */
/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';  // <-- Import axios for API calls
import { useNavigate } from 'react-router-dom';
import './css_files/DayoutDashboard.css';

function DayoutPackagerDashboard() {
    const [selectedType, setSelectedType] = useState('All Types');
    const [selectedCategory, setSelectedCategory] = useState('All Groups');
    const [favorites, setFavorites] = useState([]);
    const [packages, setPackages] = useState([]);  // <-- Initialize packages from backend
    const navigate = useNavigate();

    // Fetch the packages from the backend when the component loads
    useEffect(() => {
        axios.get("http://localhost:8080/dayout")  // <-- Fetch packages from backend
            .then((res) => {
                setPackages(res.data);  // <-- Store the data in the packages state
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);  // <-- This runs only once when the component loads

    // Function to handle adding/removing favorites
    const handleToggleFavorite = (pkg) => {
        const isFavorite = favorites.some(favorite => favorite.id === pkg.id);
        if (isFavorite) {
            setFavorites(favorites.filter(favorite => favorite.id !== pkg.id));
        } else {
            setFavorites([...favorites, pkg]);
        }
    };

    const handleCreditCardClick = (pkg) => {
        navigate('/creditcard', { state: { selectedPackage: pkg } });
    };

    // Filter packages based on selected filters
    const filteredPackages = packages.filter(pkg => {
        const matchesType = selectedType === 'All Types' || pkg.packageType === selectedType;
        const matchesCategory = selectedCategory === 'All Groups' || pkg.category === selectedCategory;
        return matchesType && matchesCategory;
    });

    return (
        <div className="container1">
            <div className="header">
                <h1 className='ddl'>Day-out Packages</h1>
                <p>Only the best packages for enjoying with your family and beloved ones.</p>
            </div>

            <div className="content">
                <div className="sidebar">
                    <div className="filter-group">
                        <label htmlFor="type">Tour Type</label>
                        <select
                            id="type"
                            className="form-control"
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                        >
                            <option>All Types</option>
                            <option>Couple Package</option>
                            <option>Family Package</option>
                            <option>Group Package</option>
                            <option>Special package</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label htmlFor="category">Tour Category</label>
                        <select
                            id="category"
                            className="form-control"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option>All Groups</option>
                            <option>One Day</option>
                            <option>One Night</option>
                            <option>Two Days</option>
                        </select>
                    </div>
                    <button type="reset" className="btn-reset" onClick={() => {
                        setSelectedType('All Types');
                        setSelectedCategory('All Groups');
                    }}>
                        Reset
                    </button>
                </div>

                <div className="packages-list">
                    {filteredPackages.map(pkg => (
                        <div key={pkg._id} className="package"> 
                            
                            <img src={`http://localhost:8080/uploads/${pkg.image}`} alt={pkg.title} className="package-image"/>


                            <div className="package-details">
                                <h3 className="package-title">{pkg.title}</h3>
                                <p className="package-info">Validity Period: {pkg.validity}</p>
                                <p className="package-info">Tour Duration: {pkg.duration}</p>
                                <button
                                    className={`btn-favorite ${favorites.some(favorite => favorite.id === pkg.id) ? 'favorite-active' : ''}`}
                                    onClick={() => handleToggleFavorite(pkg)}
                                >
                                    {favorites.some(favorite => favorite.id === pkg.id) ? 'Remove from Favorites' : 'Add to My Favorites'}
                                </button>
                                <div className="price-book">
                                    <p className="price">Price Per Person: Rs {pkg.price}</p>
                                    <button className="btn-book" onClick={() => handleCreditCardClick(pkg)}>Book Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {favorites.length > 0 && (
                <div className="favorites-section">
                    <h2>Your Favorites</h2>
                    <div className="packages-list">
                        {favorites.map(pkg => (
                            <div key={pkg._id} className="package">  
                                <img src={pkg.image} alt={pkg.title} className="package-image" />
                                <div className="package-details">
                                    <h3 className="package-title">{pkg.title}</h3>
                                    <p className="package-info">Validity Period: {pkg.validity}</p>
                                    <p className="package-info">Tour Duration: {pkg.duration}</p>
                                    <div className="price-book">
                                        <p className="price">Price Per Person: Rs {pkg.price}</p>
                                        <button className="btn-book">Credit Card</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default DayoutPackagerDashboard;
*/










/*

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css_files/DayoutDashboard.css';

function DayoutPackagerDashboard() {
    const [selectedType, setSelectedType] = useState('All Types');
    const [selectedCategory, setSelectedCategory] = useState('All Groups');
    const [favorites, setFavorites] = useState([]);
    const [packages, setPackages] = useState([]); // Updated to store fetched packages
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch packages from the server
        function fetchPackages() {
            axios.get('http://localhost:8080/dayout')
                .then((res) => {
                    setPackages(res.data); // Store fetched packages in state
                })
                .catch((err) => {
                    console.error("Error fetching packages:", err.message);
                });
        }
        fetchPackages();
    }, []); // Runs once when the component mounts

    const handleToggleFavorite = (pkg) => {
        const isFavorite = favorites.some(favorite => favorite._id === pkg._id);
        if (isFavorite) {
            setFavorites(favorites.filter(favorite => favorite._id !== pkg._id));
        } else {
            setFavorites([...favorites, pkg]);
        }
    };

    const handleCreditCardClick = (pkg) => {
        navigate('/creditcard', { state: { selectedPackage: pkg } });
    };

    // Filter packages based on selected filters
    const filteredPackages = packages.filter(pkg => {
        const matchesType = selectedType === 'All Types' || pkg.title === selectedType;
        const matchesCategory = selectedCategory === 'All Groups' || pkg.duration === selectedCategory;
        return matchesType && matchesCategory;
    });

    return (
        <div className="container1">
            <nav className="navbar">
                <Link to="/facilities-dashboard" className="nav-item">Facilities & Services</Link>
                <Link to="/package-Dashboard" className="nav-item">Dayout Packages</Link>
                <Link to="/activitD" className="nav-item">Activities</Link>
                <Link to="/spa-intro" className="nav-item">Spa Service</Link>
            </nav>

            <div className="header">
                <h1 className='ddl'>Day-out Packages</h1>
                <p>Only the best packages for enjoying with your family and beloved ones.</p>
            </div>

            <div className="content">
                <div className="sidebar">
                    <div className="filter-group">
                        <label htmlFor="title">Tour Type</label>
                        <select
                            id="title"
                            className="form-control"
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                        >
                            <option>All Types</option>
                            <option>Couple Package</option>
                            <option>Family Package</option>
                            <option>Group Package</option>
                            <option>Special Dayout Package</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label htmlFor="duration">Tour Category</label>
                        <select
                            id="duration"
                            className="form-control"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option>All Groups</option>
                            <option>One Day</option>
                            <option>One Night</option>
                            <option>Two Days</option>
                        </select>
                    </div>
                    <button type="reset" className="btn-reset" onClick={() => {
                        setSelectedType('All Types');
                        setSelectedCategory('All Groups');
                    }}>
                        Reset
                    </button>
                </div>

                <div className="packages-list">
                    {filteredPackages.map(pkg => (
                        <div key={pkg._id} className="package">
                            <img src={pkg.image} alt={pkg.title} className="package-image" />
                            <div className="package-details">
                                <h3 className="package-title">{pkg.title}</h3>
                                <p className="package-info">Validity Period: {pkg.validity}</p>
                                <p className="package-info">Tour Duration: {pkg.duration}</p>
                                <button
                                    className={`btn-favorite ${favorites.some(favorite => favorite._id === pkg._id) ? 'favorite-active' : ''}`}
                                    onClick={() => handleToggleFavorite(pkg)}
                                >
                                    {favorites.some(favorite => favorite._id === pkg._id) ? 'Remove from Favorites' : 'Add to My Favorites'}
                                </button>
                                <div className="price-book">
                                    <p className="price">Price Per Person: Rs {pkg.price}</p>
                                    <button className="btn-book" onClick={() => handleCreditCardClick(pkg)}>Book Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {favorites.length > 0 && (
                <div className="favorites-section">
                    <h2>Your Favorites</h2>
                    <div className="packages-list">
                        {favorites.map(pkg => (
                            <div key={pkg._id} className="package">
                                <img src={pkg.image} alt={pkg.title} className="package-image" />
                                <div className="package-details">
                                    <h3 className="package-title">{pkg.title}</h3>
                                    <p className="package-info">Validity Period: {pkg.validity}</p>
                                    <p className="package-info">Tour Duration: {pkg.duration}</p>
                                    <div className="price-book">
                                        <p className="price">Price Per Person: Rs {pkg.price}</p>
                                        <button className="btn-book">Credit Card</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default DayoutPackagerDashboard;

*/









import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css_files/DayoutDashboard.css';
import CusHeader from "./CusHeader";

function DayoutPackagerDashboard() {
    const [selectedType, setSelectedType] = useState('All Types');
    const [selectedCategory, setSelectedCategory] = useState('All Groups');
    const [favorites, setFavorites] = useState([]);
    const [packages, setPackages] = useState([]); 
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch packages from the server
        function fetchPackages() {
            axios.get('http://localhost:8080/dayout')
                .then((res) => {
                    setPackages(res.data); // Store fetched packages in state
                })
                .catch((err) => {
                    console.error("Error fetching packages:", err.message);
                });
        }
        fetchPackages();
    }, []); 

    const handleToggleFavorite = (pkg) => {
        const isFavorite = favorites.some(favorite => favorite._id === pkg._id);
        if (isFavorite) {
            setFavorites(favorites.filter(favorite => favorite._id !== pkg._id));
        } else {
            setFavorites([...favorites, pkg]);
        }
    };

    const handleCreditCardClick = (pkg) => {
        navigate('/creditcard', { state: { selectedPackage: pkg } });
    };

    // Filter packages based on selected filters
    const filteredPackages = packages.filter(pkg => {
        const matchesType = selectedType === 'All Types' || pkg.title === selectedType;
        const matchesCategory = selectedCategory === 'All Groups' || pkg.duration === selectedCategory;
        return matchesType && matchesCategory;
    });

    const headerStyle = {
        width: '100%',
    };

    return (
        <div>
      <div style={headerStyle}>
                <CusHeader />
            </div>
        <div className="container1">
            <nav className="navbar">
            <p className="nav-item"></p>
                <Link to="/facilities-dashboard" className="nav-item1">Facilities & Services</Link>
                <Link to="/package-Dashboard" className="nav-item">Dayout Packages</Link>
                <Link to="/activitD" className="nav-item">Activities</Link>
                <Link to="/spa-intro" className="nav-item2">Spa Service</Link>
            </nav>

            <div className="header">
                <h1 className='ddl'>Day-out Packages</h1>
                <p>Only the best packages for enjoying with your family and beloved ones.</p>
            </div>

            <div className="content">
                <div className="sidebar">
                    <div className="filter-group">
                        <label htmlFor="title">Tour Type</label>
                        <select
                            id="title"
                            className="form-control"
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                        >
                            <option>All Types</option>
                            <option>Couple Package</option>
                            <option>Family Package</option>
                            <option>Group Package</option>
                            <option>Special Dayout Package</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label htmlFor="duration">Tour Category</label>
                        <select
                            id="duration"
                            className="form-control"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option>All Groups</option>
                            <option>One Day</option>
                            <option>One Night</option>
                            <option>Two Days</option>
                        </select>
                    </div>
                    <button type="reset" className="btn-reset" onClick={() => {
                        setSelectedType('All Types');
                        setSelectedCategory('All Groups');
                    }}>
                        Reset
                    </button>
                </div>

                <div className="packages-list">
                    {filteredPackages.map(pkg => (
                        <div key={pkg._id} className="package">
                            {/* Display the image from the server */}
                            {pkg.image && (
                                <img 
                                    src={`http://localhost:8080/${pkg.image}`} 
                                    alt={pkg.title} 
                                    className="package-image"
                                    style={{ width: "200px", height: "200px", objectFit: "cover" }}
                                />
                            )}
                            <div className="package-details">
                                <h3 className="package-title">{pkg.title}</h3>
                                <p className="package-info">Validity Period: {pkg.validity}</p>
                                <p className="package-info">Tour Duration: {pkg.duration}</p>
                                <button
                                    className={`btn-favorite ${favorites.some(favorite => favorite._id === pkg._id) ? 'favorite-active' : ''}`}
                                    onClick={() => handleToggleFavorite(pkg)}
                                >
                                    {favorites.some(favorite => favorite._id === pkg._id) ? 'Remove from Favorites' : 'Add to My Favorites'}
                                </button>
                                <div className="price-book">
                                    <p className="price">Price Per Person: {pkg.price}</p>
                                    <button className="btn-book" onClick={() => handleCreditCardClick(pkg)}>Book Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {favorites.length > 0 && (
                <div className="favorites-section">
                    <h2>Your Favorites</h2>
                    <div className="packages-list">
                        {favorites.map(pkg => (
                            <div key={pkg._id} className="package">
                                {pkg.image && (
                                    <img 
                                        src={`http://localhost:8080/${pkg.image}`} 
                                        alt={pkg.title} 
                                        className="package-image" 
                                    />
                                )}
                                <div className="package-details">
                                    <h3 className="package-title">{pkg.title}</h3>
                                    <p className="package-info">Validity Period: {pkg.validity}</p>
                                    <p className="package-info">Tour Duration: {pkg.duration}</p>
                                    <div className="price-book">
                                        <p className="price">Price Per Person: Rs {pkg.price}</p>
                                        <button className="btn-book">Credit Card</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
        </div>
    );
}

export default DayoutPackagerDashboard;





