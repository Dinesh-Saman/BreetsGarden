import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CusHeader from "./CusHeader";
import hiking from './css_files/images/hiking1.jpeg';
import water_rafting1 from './css_files/images/water_rafting1.jpeg';

function ActivitiDashboard(){

    //const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);
    const [selectedType, setSelectedType] = useState('Opening Hours');
    const [selectedCategory, setSelectedCategory] = useState('Closing Hours');
    const navigate = useNavigate();
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        // Fetch packages from the server
        function fetchActivities() {
            axios.get('http://localhost:8080/activities')
                .then((res) => {
                    setActivities(res.data); // Store fetched packages in state
                })
                .catch((err) => {
                    console.error("Error fetching packages:", err.message);
                });
        }
        fetchActivities();
    }, []); 

   
    const handleToggleFavorite = (act) => {
        const isFavorite = favorites.some(favorite => favorite.id === act.id);
        if (isFavorite) {
            setFavorites(favorites.filter(favorite => favorite.id !== act.id));
        } else {
            setFavorites([...favorites, act]);
        }
    };


    const filteredactivity = activities.filter(act => {
        const matchesType = selectedType === 'Opening Hours' || act.openingHrs === selectedType;
        const matchesCategory = selectedCategory === 'Closing Hours' || act.closingHrs === selectedCategory;
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
                <h1 className='ddl'>Activities</h1>
                <p>The best activities for enjoying in your free time</p>
            </div>

            <div className="content">

            <div className="sidebar">
                    <div className="filter-group">
                        <label htmlFor="type">Opening Hours</label>
                        <select
                            id="openingHrs"
                            className="form-control"
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                        >
                            <option>All </option>
                            <option>8.00 a.m</option>
                            <option>9.00 a.m</option>
                            <option>10.00 a.m</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label htmlFor="category">Closing Hours</label>
                        <select
                            id="closingHrs"
                            className="form-control"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option>All</option>
                            <option>4.00 p.m</option>
                            <option>5.00 p.m</option>
                            <option>6.00 p.m</option>
                        </select>
                    </div>
                    <button type="reset" className="btn-reset" onClick={() => {
                        setSelectedType('Opening Hours');
                        setSelectedCategory('Closing Hours');
                    }}>
                        Reset
                    </button>
                </div>
                
                <div className="activity-list">
                    {filteredactivity.map(act => (
                        <div key={act.id} className="package">
                            {/* Display the image from the server */}
                            {act.image && (
                                <img 
                                    src={`http://localhost:8080/${act.image}`} 
                                    alt={act.title} 
                                    className="package-image"
                                    style={{ width: "200px", height: "200px", objectFit: "cover" }}
                                />
                            )}
                            <div className="package-details">
                                <h3 className="package-title">{act.activityName}</h3>
                                <p className="package-info">Opening Hours: {act.openingHrs}</p>
                                <p className="package-info">Closing Hours: {act.closingHrs}</p>
                                <button
                                    className={`btn-favorite ${favorites.some(favorite => favorite.id === act.id) ? 'favorite-active' : ''}`}
                                    onClick={() => handleToggleFavorite(act)}
                                >
                                    {favorites.some(favorite => favorite.id === act.id) ? 'Remove from Favorites' : 'Add to My Favorites'}
                                </button>
                                <div className="price-book">
                                    <p className="price">Price Per Person: {act.price}</p>
                                   
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            
{favorites.length > 0 && (
    <div className="favorites-section">
        <h2>Your Favorites</h2>
        <div className="activity-list">
            {favorites.map(act => (
                <div key={act.id} className="package">
                    
                    {act.image && (
                                    <img 
                                        src={`http://localhost:8080/${act.image}`} 
                                        alt={act.activityName} 
                                        className="package-image" 
                                    />
                                )}
                    <div className="package-details">
                    <h3 className="package-title">{act.activityName}</h3>
                    <p className="package-info">Opening Hours: {act.openingHrs}</p>
                    <p className="package-info">Closing Hours: {act.ClosingHrs}</p>
                        <div className="price-book">
                            <p className="price">Price Per Person: Rs {act.price}</p>
                            
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

export default ActivitiDashboard;