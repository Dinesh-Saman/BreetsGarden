import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'; // Adjusted the path to import from the parent directory
import StockManagerHeader from './StockManagerHeader';
import bgImage from './css_files/images/stock1.jpeg';

export default function InventoryTracker() {
  const [stocks, setStocks] = useState([]);
  const [lowStockThreshold, setLowStockThreshold] = useState(10); // Default threshold

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/stocks');
      setStocks(response.data);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    }
  };

  const getLowStockItems = () => {
    return stocks.filter(stock => stock.quantity <= lowStockThreshold);
  };

  const containerStyle = {
    backgroundImage: `linear-gradient(rgba(172, 172, 172, 0.4), rgba(213, 212, 212, 0.4)),url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
backgroundRepeat: 'noRepeat',
    padding: '20px',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '140px' // Increased paddingTop to account for header height
};


  return (
    <div style={containerStyle}>
    <StockManagerHeader /> {/* Include the Header at the top */}

    <div className="container">
      <div className="inventory-section">
        <h1 className="inventory-title">Inventory Tracker</h1>
        <div className="threshold-container">
          <label>Low Stock Threshold:</label>
          <input
            type="number"
            value={lowStockThreshold}
            onChange={(e) => setLowStockThreshold(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="low-stock-section">
        <h2 className="low-stock-warning">Low Stock Warning</h2>
        <ul className="low-stock-items">
          {getLowStockItems().map((item) => (
            <li
              key={item._id}
              style={{
                color: item.quantity === 0 ? 'red' : 'orange',
              }}
            >
              {item.itemName} - Quantity: {item.quantity}
              {item.quantity === 0 ? ' (Out of Stock)' : ' (Low Stock)'}
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
}
