import React, { useState, useEffect } from "react";
import axios from "axios";

function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [reportData, setReportData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(""); 

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:8080/booking");
      setBookings(response.data);
    } catch (err) {
      alert("Error fetching bookings: " + err.message);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value); 
  };

  const filteredBookings = bookings.filter((booking) =>
    booking.HallName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.Email.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by hall name or email
  );

  const generateReport = () => {
    if (!selectedMonth) {
      alert("Please select a month");
      return;
    }

    const filteredByMonth = filteredBookings.filter((booking) => {
      const bookingMonth = new Date(booking.Date).getMonth() + 1; // Get month (1-based)
      return bookingMonth === parseInt(selectedMonth);
    });

    setReportData(filteredByMonth);
  };

  const downloadCSV = () => {
    const csvRows = [
      ["Hall Name", "Date", "Duration", "Email"], 
      ...reportData.map((booking) => [
        booking.HallName,
        new Date(booking.Date).toLocaleDateString(),
        booking.Duration,
        booking.Email, 
      ]),
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," + csvRows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "bookings_report.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="container13">
      <h1>All Bookings</h1>

      {/* Search Input */}
      <div className="form-group13">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Hall Name or Email"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Month Selector */}
      <div className="form-group13">
        <label>Select Month:</label>
        <select className="form-control" value={selectedMonth} onChange={handleMonthChange}>
          <option value="">--Select Month--</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>

      {/* Display Filtered Bookings */}
      <ul>
        {filteredBookings.map((booking) => (
          <li key={booking._id}>
            {booking.HallName} - {new Date(booking.Date).toLocaleDateString()} - {booking.Duration} hours - {booking.Email}
          </li>
        ))}
      </ul>

      {/* Generate Report Button */}
      <button onClick={generateReport} className="btn btn-primary mt-3">
        Generate Report
      </button>

      {/* Download CSV Button */}
      {reportData.length > 0 && (
        <button onClick={downloadCSV} className="btn btn-secondary mt-3 ml-2">
          Download Report as CSV
        </button>
      )}

      {/* Report Table */}
      {reportData.length > 0 && (
        <div className="mt-5">
          <h2>Report</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Hall Name</th>
                <th>Date</th>
                <th>Duration (hours)</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.HallName}</td>
                  <td>{new Date(booking.Date).toLocaleDateString()}</td>
                  <td>{booking.Duration}</td>
                  <td>{booking.Email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style jsx>{`
        .container13 {
          background-color: #E3E9EC;
          padding: 20px;
        }
        .form-group13 {
          margin-bottom: 20px;
        }
        .table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        .table th, .table td {
          border: 5px solid #3a373a;
          padding: 8px;
        }
        .btn {
          margin-left: 5px;
        }
      `}</style>
    </div>
  );
}

export default AllBookings;
