import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateRoomBooking from './UpdateRoomBookings';
import bgImage from './css_files/images/bg.jpg';
import ResManagerHeader from './ResManagerHeader'; // Import the Header component
import Swal from 'sweetalert2';
import jsPDF from "jspdf";
import "jspdf-autotable";

function AllRoomBookings() {
    const [bookRooms, setBookRooms] = useState([]);
    const [currentRoomBooking, setCurrentRoomBooking] = useState(null);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showModal, setShowModal] = useState(false); // For modal state
    const [selectedBookingId, setSelectedBookingId] = useState(null); // To track the booking to delete
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // To track the selected year
    const [analysisData, setAnalysisData] = useState(null); // To hold the analysis data
    const [showAnalysis, setShowAnalysis] = useState(false); // For displaying analysis popup

    useEffect(() => {
        const getRoomBookings = async () => {
            try {
                const res = await axios.get("http://localhost:8080/book/getbookings");
                setBookRooms(res.data);
                setFilteredBookings(res.data); // Initialize filtered bookings with all data
            } catch (err) {
                alert(err.message);
            }
        };
        getRoomBookings();
    }, []);

    const deleteRoomBooking = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/book/deleteBooking/${id}`);
            setBookRooms((prev) => prev.filter(bookRoom => bookRoom._id !== id));
            setFilteredBookings((prev) => prev.filter(bookRoom => bookRoom._id !== id));
            Swal.fire('Deleted!', 'Room booking deleted successfully.', 'success');
        } catch (err) {
            Swal.fire('Error', `Error deleting room booking: ${err.message}`, 'error');
        }
    };
    
    const handleDeleteClick = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteRoomBooking(id); // Call the delete function directly here
            }
        });
    };
    

    const confirmDelete = () => {
        if (selectedBookingId) {
            deleteRoomBooking(selectedBookingId); // Call delete function
        }
    };
    

    const updateRoomBooking = (id) => {
        const bookRoom = bookRooms.find(bookRoom => bookRoom._id === id);
        setCurrentRoomBooking(bookRoom);
    };

    const filterBookings = () => {
        const filtered = bookRooms.filter((booking) => {
            const checkinDate = new Date(booking.checkin);
            const checkoutDate = new Date(booking.checkout);
            const start = new Date(startDate);
            const end = new Date(endDate);
    
            // Check for overlap
            return (
                (checkinDate >= start && checkinDate <= end) || // Booking starts within the range
                (checkoutDate >= start && checkoutDate <= end) || // Booking ends within the range
                (checkinDate <= start && checkoutDate >= end) // Specified range falls within the booking
            );
        });
        setFilteredBookings(filtered);
    };
    

    const downloadReport = () => {
        const doc = new jsPDF();
        const header = ["Customer Name", "Room ID", "Room Name", "Email", "Phone number", "No. of Persons", "Check-in", "Check-out"];
        
        // Create table data from filtered bookings
        const tableData = filteredBookings.map((booking) => {
            const checkinDate = new Date(booking.checkin).toISOString().split('T')[0];
            const checkoutDate = new Date(booking.checkout).toISOString().split('T')[0];
            return [
                booking.cusName,
                booking.roomId,
                booking.roomName,
                booking.email,
                booking.phoneNumber,
                booking.noOfPersons,
                checkinDate,
                checkoutDate
            ];
        });

        // Create a new page for the booking details
        doc.autoTable({
            head: [header],
            body: tableData,
            startY: 20,
        });

        // Add a page for the analysis data if available
        if (analysisData) {
            doc.addPage();
            doc.text(`Check-in Analysis for ${selectedYear}`, 14, 10);
            doc.text(`Total Check-ins: ${analysisData.totalCheckIns}`, 14, 20);

            // Prepare data for monthly check-ins
            const monthlyData = analysisData.checkInsPerMonth.map((count, index) => {
                return {
                    month: new Date(0, index).toLocaleString('default', { month: 'long' }),
                    count: count
                };
            });

            // Create a table for the monthly data
            doc.autoTable({
                head: [['Month', 'Check-ins']],
                body: monthlyData.map(item => [item.month, item.count]),
                startY: 30,
            });
        }

        // Save the PDF
        doc.save("room_bookings_report.pdf");
    };

    // Function to analyze check-ins for the selected year
    const analyzeCheckIns = () => {
        const checkInsPerMonth = Array(12).fill(0);
        filteredBookings.forEach(booking => {
            const checkinDate = new Date(booking.checkin);
            if (checkinDate.getFullYear() === selectedYear) {
                checkInsPerMonth[checkinDate.getMonth()]++;
            }
        });

        const totalCheckIns = checkInsPerMonth.reduce((a, b) => a + b, 0);
        setAnalysisData({ totalCheckIns, checkInsPerMonth });
        setShowAnalysis(true); // Open analysis modal
    };

    // Modal styles
    const modalStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        zIndex: 1000
    };

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 999
    };

    const containerStyle = {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '140px' // Increased paddingTop to account for header height
    };

    const tableFrameStyle = {
        border: '2px solid black',
        borderRadius: '10px',
        padding: '20px',
        backgroundColor: 'rgba(135, 206, 250, 0.4)',
        margin: '20px',
        width: '100%',
        maxWidth: '1200px',
        overflowX: 'auto'
    };

    const buttonFrameStyle = {
        border: '2px solid black',
        borderRadius: '10px',
        padding: '10px',
        backgroundColor: 'rgba(135, 206, 250, 0.3)', // Change to RGBA for opacity (0.8 for 80% opacity)
        marginBottom: '20px',
        width: '100%',
        maxWidth: '900px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '10px',
        margin: '20px auto', // Center horizontally using margin auto
    };
    
    
    const h1Style = {
        textAlign: 'center', // Center text horizontally
        color: 'darkblue',
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
    };

    const thStyle = {
        border: '1px solid white',
        padding: '10px',
        backgroundColor: 'darkblue', // Set background color to black
        color: 'white', // Set text color to white
    };

    const tdStyle = {
        border: '1px solid black',
        padding: '10px',
        backgroundColor: '#f8d4e2', 
    };
    

    const commonButtonStyle = {
        borderRadius: '5px',
        padding: '8px 12px',
        margin: '0 5px',
        cursor: 'pointer',
        color: 'white',
        backgroundColor: '#1d4ed8',
        border: 'none',
        transition: 'transform 0.2s', // Smooth scale transition
    };
    
    const frameStyle ={
        border: '2px solid black',
        borderRadius: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        marginBottom: '20px',
        margin: '20px',
        padding: '8px 12px',
    };

    

    return (
        <div style={containerStyle}>
            <ResManagerHeader /> {/* Include the Header at the top */}

            <div style={frameStyle}>
                <h1 style={h1Style}>All Room Bookings</h1>

                <div style={buttonFrameStyle}>
                    <label style={{marginRight: '10px'}}>
                        Check-in Date:
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </label>
                    <label style={{marginRight: '10px'}}>
                        Check-out Date:
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </label>
                    <div>
                        <button style={commonButtonStyle} onClick={filterBookings}>Filter Bookings</button>
                    </div>
                    <div><button style={commonButtonStyle} onClick={downloadReport}>Download Report</button></div>
                </div>

                <div style={buttonFrameStyle}>
                    <label style={{ marginRight: '5px', display: 'flex', alignItems: 'center' }}> {/* Align label and select vertically */}
                        Year:
                        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} style={{ marginLeft: '5px' }}> {/* Add left margin for spacing */}
                            {/* Dynamically generate year options */}
                            {[...Array(5).keys()].map(i => {
                                const year = new Date().getFullYear() - i;
                                return <option key={year} value={year}>{year}</option>;
                            })}
                        </select>
                    </label>
                    <button style={commonButtonStyle} onClick={analyzeCheckIns}>Analyze</button>
                </div>



                <div style={tableFrameStyle}>
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th style={thStyle}>Customer Name</th>
                                <th style={thStyle}>Room ID</th>
                                <th style={thStyle}>Room Name</th>
                                <th style={thStyle}>Email</th>
                                <th style={thStyle}>Phone number</th>
                                <th style={thStyle}>No. of Persons</th>
                                <th style={thStyle}>Check-in</th>
                                <th style={thStyle}>Check-out</th>
                                <th style={thStyle}>Update</th>
                                <th style={thStyle}>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings.map((BookRoom) => (
                                <tr key={BookRoom._id}>
                                    <td style={tdStyle}>{BookRoom.cusName}</td>
                                    <td style={tdStyle}>{BookRoom.roomId}</td>
                                    <td style={tdStyle}>{BookRoom.roomName}</td>
                                    <td style={tdStyle}>{BookRoom.email}</td>
                                    <td style={tdStyle}>{BookRoom.phoneNumber}</td>
                                    <td style={tdStyle}>{BookRoom.noOfPersons}</td>
                                    <td style={tdStyle}>{BookRoom.checkin}</td>
                                    <td style={tdStyle}>{BookRoom.checkout}</td>
                                    <td style={tdStyle}><button style={commonButtonStyle} className="btn btn-primary" onClick={() => updateRoomBooking(BookRoom._id)}>Update</button></td>
                                    <td style={tdStyle}><button style={commonButtonStyle} className="btn btn-danger" onClick={() => handleDeleteClick(BookRoom._id)}>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                </div>

                

                {currentRoomBooking && (
                    <UpdateRoomBooking
                        currentRoomBooking={currentRoomBooking}
                        setCurrentRoomBooking={setCurrentRoomBooking}
                        setBookRooms={setBookRooms}
                        bookRooms={bookRooms}
                    />
                )}

                {/* Modal for Delete Confirmation */}
                {showModal && (
                    <>
                        <div style={overlayStyle}></div> {/* Background overlay */}
                        <div style={modalStyle}>
                            <h2>Confirm Deletion</h2>
                            <p>Are you sure you want to delete this room booking?</p>
                            <button style={commonButtonStyle} onClick={confirmDelete}>Yes, Delete</button>
                            <button style={commonButtonStyle} onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </>
                )}

                
                {/* Modal for Analysis Results */}
                {showAnalysis && analysisData && (
                    <>
                        <div style={overlayStyle}></div> {/* Background overlay */}
                        <div style={modalStyle}>
                            <h2>Check-in Analysis for {selectedYear}</h2>
                            <p>Total Check-ins: {analysisData.totalCheckIns}</p>
                            <div>
                                <h3>Monthly Check-ins:</h3>
                                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '200px' }}>
                                    {analysisData.checkInsPerMonth.map((count, index) => (
                                        <div key={index} style={{ textAlign: 'center', margin: '0 10px' }}> {/* Add margin for space */}
                                            <div style={{
                                                width: '30px',
                                                height: `${count * 10}px`, // Scale height for visibility
                                                backgroundColor: 'darkblue',
                                                margin: '0 auto',
                                                borderRadius: '5px',
                                            }}></div>
                                            <span>{new Date(0, index).toLocaleString('default', { month: 'long' })}</span>
                                            <span style={{ display: 'block', color: 'darkblue', fontWeight: 'bold', marginTop: '5px' }}>{count}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button style={commonButtonStyle} onClick={() => setShowAnalysis(false)}>Close</button>
                        </div>
                    </>
                )}
            

        </div>
    );
}

export default AllRoomBookings;