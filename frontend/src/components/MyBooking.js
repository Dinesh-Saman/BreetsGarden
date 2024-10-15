import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import CusHeader from "./CusHeader";

function MyBooking() {
  const [bookings, setBookings] = useState([]);
  const [bookingId, setBookingId] = useState("");
  const [hallName, setHallName] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [email, setEmail] = useState(""); 

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
        const response = await axios.get("http://localhost:8080/booking");
        const currentTime = new Date();

        // Filter bookings added within the last 10 minutes
        const filteredBookings = response.data.filter(booking => {
            const bookingTime = new Date(booking.createdAt);
            const timeDifference = (currentTime - bookingTime) / (1000 * 60); // Difference in minutes
            return timeDifference <= 10;
        });

        setBookings(filteredBookings);
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Error fetching bookings',
            text: err.message,
        });
    }
};


const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Check if the hall and date combination already exists
  const isBookingExists = bookings.some(
    (booking) => booking.HallName === hallName && new Date(booking.Date).toISOString().split("T")[0] === date
  );

  if (isBookingExists) {
    // Show error message if the booking already exists
    Swal.fire({
      icon: 'error',
      title: 'Booking not available',
      text: 'Sorry the venue not availabe for the date.',
    });
    return; // Exit the function to prevent the form from submitting
  }

  const bookingData = { HallName: hallName, Date: date, Duration: duration, Email: email }; 

  try {
    if (bookingId) {
      // Update booking
      await axios.put(`http://localhost:8080/booking/update/${bookingId}`, bookingData);
      Swal.fire({
        icon: 'success',
        title: 'Booking updated successfully',
      });
    } else {
      // Add new booking
      await axios.post("http://localhost:8080/booking/add", bookingData);
      Swal.fire({
        icon: 'success',
        title: 'Booking added successfully',
      });
    }
    fetchBookings(); // Refresh bookings after adding/updating
    clearForm(); // Clear form fields
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Error saving booking',
      text: err.message,
    });
  }
};


  const handleEdit = (booking) => {
    setBookingId(booking._id);
    setHallName(booking.HallName);
    setDate(new Date(booking.Date).toISOString().split("T")[0]);
    setDuration(booking.Duration);
    setEmail(booking.Email); 
  };

  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });

    if (confirmDelete.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8080/booking/delete/${id}`);
        Swal.fire({
          icon: 'success',
          title: 'Booking deleted successfully',
        });
        fetchBookings();
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Error deleting booking',
          text: err.message,
        });
      }
    }
  };

  const clearForm = () => {
    setBookingId("");
    setHallName("");
    setDate("");
    setDuration("");
    setEmail(""); 
  };

  const headerStyle = {
    width: '100%',
};

  return (
    <div>
      <div style={headerStyle}>
                <CusHeader />
            </div>
    <div className="container11">
      <h1>My Bookings 🎊</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group3">
          <label htmlFor="HallName">Hall Name</label>
          <input
            type="text"
            className="form-control"
            id="HallName"
            placeholder="Enter hall name"
            value={hallName}
            onChange={(e) => setHallName(e.target.value)}
            required
          />
        </div>
        <div className="form-group3">
          <label htmlFor="Date">Date</label>
          <input
            type="date"
            className="form-control"
            id="Date"
            placeholder="Enter date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group3">
          <label htmlFor="Duration">Duration (hours)</label>
          <input
            type="number"
            className="form-control"
            id="Duration"
            placeholder="Enter duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>
        <div className="form-group3">
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            className="form-control"
            id="Email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {bookingId ? "Update Booking" : "Add Booking"}
        </button>
        <button type="button" className="btn btn-secondary ml-2" onClick={clearForm}>
          Clear
        </button>
      </form>

      <h2 className="mt-5">All Bookings 📚</h2>
      <p className="p1" style={{ color: 'white' }}>Note: You can edit/delete your booking within 10 minutes</p>
      <table className="table">
        <thead>
          <tr>
            <th>Hall Name</th>
            <th>Date</th>
            <th>Duration (hours)</th>
            <th>Email</th> 
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.HallName}</td>
              <td>{new Date(booking.Date).toLocaleDateString()}</td>
              <td>{booking.Duration}</td>
              <td>{booking.Email}</td> 
              <td>
                <button className="btn btn-info ml-2" onClick={() => handleEdit(booking)}>
                  Edit
                </button>
                <button className="btn btn-danger ml-2" onClick={() => handleDelete(booking._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
  .container11 {
    position: relative;
    background-image: url("/images/background3.jpg");
    background-size: cover;
    background-position: center;
    padding: 40px;
    border-radius: 12px;
    max-width: 900px;
    margin: 0 auto;
    margin-top: 50px;
    margin-bottom: 50px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  /* Create a dark overlay */
  .container11::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black */
    border-radius: 12px;
    z-index: 1;
  }

  /* Ensure text and form elements are above the overlay */
  .container11 > * {
    position: relative;
    z-index: 2;
  }

  /* Typography */
  h1, h2 {
    font-family: 'Roboto', sans-serif;
    color: #fff; /* Change text color to white for contrast */
  }

  h1 {
    font-size: 32px;
    margin-bottom: 20px;
    text-align: center;
  }

  h2 {
    font-size: 24px;
    margin-top: 40px;
  }

  /* Form Styling */
  .form-group3 label {
    color: #fff; /* Change label color to white */
  }

  .form-group3 input {
    color: #333;
  }

  /* Button Styling */
  .btn {
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .btn-primary {
    background-color: #3498db;
    color: white;
  }

  .btn-primary:hover {
    background-color: #2980b9;
  }

  .btn-secondary {
    background-color: #7f8c8d;
    color: white;
    margin-left: 10px;
  }

  .btn-secondary:hover {
    background-color: #566573;
  }

  /* Table Styling */
  .table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
  }

  .table th, .table td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  .table th {
    background-color: #3498db;
    color: white;
  }

  .table tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  .table tr:hover {
    background-color: #eaeaea;
  }

  /* Note Styling */
  .p1 {
    color: red;
    font-style: italic;
  }
`}</style>



    </div>
    </div>
  );
}

export default MyBooking;
