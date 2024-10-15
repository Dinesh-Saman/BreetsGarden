import React, { useState, useEffect } from "react";
import axios from "axios";
import event1 from './css_files/images/Smeraldo.jpeg';
import event2 from './css_files/images/Empire.jpeg';
import event3 from './css_files/images/GrandBallroom.jpeg';
import './css_files/images/background2.jpeg';
import CusHeader from "./CusHeader";

function AllPromotions() {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const response = await axios.get("http://localhost:8080/promotion");
      setPromotions(response.data);
    } catch (err) {
      alert("Error fetching promotions: " + err.message);
    }
  };

  const hallDetails = [
    {
      name: "Smeraldo",
      capacity: 1000,
      price: 6000,
      image: event1,
    },
    {
      name: "Empire",
      capacity: 500,
      price: 5000,
      image: event2,
    },
    {
      name: "Grand Ballroom",
      capacity: 1000,
      price: 10000,
      image: event3,
    }
  ];

  const headerStyle = {
    width: '100%',
};

  return (
    <div>
      <div style={headerStyle}>
                <CusHeader />
            </div>
    <div className="container3">
      <div className="button-container">
        <button><a href="/my" className="book-button">Book</a></button> 
      </div>

      <div className="title-container">
        <h1>Promotions 🎉</h1>
      </div>
      
      <div className="promotions-section">
        <div className="promotions-container">
          {promotions.map((promotion) => (
            <div className="promotion-card" key={promotion._id}>
              <p>{promotion.description}</p>
              <p><strong>Valid Until:</strong> {new Date(promotion.validUntil).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="separator">
        <h1>---------------------------------------------------------------------------</h1>
      </div>

      <div className="title-container">
        <h2>Hall Details ✨</h2>
      </div>
      
      <div className="hall-details-container">
        {hallDetails.map((hall, index) => (
          <div className="hall-card" key={index}>
            <img src={hall.image} alt={hall.name} className="hall-image" />
            <p><strong>Hall Name:</strong> {hall.name}</p>
            <p><strong>Capacity:</strong> {hall.capacity}</p>
            <p><strong>Price per hour (LKR):</strong> {hall.price}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .container3 {
          width: 1300px;
          margin-left: 100px;
          padding: 70px;
          position: relative;
          font-family: Arial, sans-serif;
          min-height: 100vh;
          background-color: #E3E9EC;
        }

        .title-container {
          background-color: rgba(149, 202, 219, 0.8); /* Semi-transparent background for readability */
          padding: 10px;
          margin-bottom: 20px;
          border-radius: 5px;
        }

        .title-container h1,
        .title-container h2 {
          margin: 0;
          color: #26314c;
        }

        .promotions-section {
          background: url('/images/background2.jpeg') no-repeat center center;
          background-size: cover;
          padding: 30px;
          border-radius: 10px;
        }

        .promotions-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .promotion-card {
          background-color: rgba(170, 194, 219, 0.9); /* Semi-transparent background */
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .promotion-card p {
          margin: 0;
          color: #26314c;
        }

        .separator {
          margin: 20px 0;
        }

        .hall-details-container {
        
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .hall-card {
          background-color: rgba(170, 194, 219, 0.9); /* Semi-transparent background */
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .hall-card p {
          margin: 0;
          color: #26314c;
        }

        .hall-image {
          background-image: url('css_files/images/background2.jpeg')
          width: 100%;
          height: auto;
          border-radius: 10px;
          margin-bottom: 10px;
          object-fit: cover;
        }

        .button-container {
          position: absolute;
          top: 20px;
          right: 20px;
        }

        .book-button {
          text-decoration: none;
          color: white;
          background-color: #007bff;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          font-size: 1rem;
        }

        .book-button:hover {
          background-color: #0056b3;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .container {
            padding: 30px;
          }

          .button-container {
            top: 10px;
            right: 10px;
          }

          .book-button {
            padding: 8px 15px;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
    </div>
  );
}

export default AllPromotions;
