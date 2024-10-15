import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import calendar styles

const ViewAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [leaveRecords, setLeaveRecords] = useState([]);
  const [dateMarked, setDateMarked] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  const staffId = user._id;

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const attendanceResponse = await axios.get(`http://localhost:3001/attendance/${staffId}`);
        setAttendanceRecords(attendanceResponse.data);
  
        const leaveResponse = await axios.get(`http://localhost:3001/leaves/${staffId}`);
        setLeaveRecords(leaveResponse.data);
  
        // Prepare dates for marking on the calendar
        const markedDates = {};
  
        // Mark attendance dates
        attendanceResponse.data.forEach(record => {
          const date = new Date(record.date).toLocaleDateString();
          markedDates[date] = record.status === 'Present' ? 'present' : 'absent'; // Use status as key
        });
  
        // Mark leave dates
        leaveResponse.data.forEach(record => {
          const startDate = new Date(record.startDate); // Adjust according to your leave record structure
          const endDate = new Date(record.endDate);
          
          // Loop through the range of dates
          for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
            const dateString = d.toLocaleDateString();
            markedDates[dateString] = 'leave'; 
          }
        });
  
        setDateMarked(markedDates);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchAttendance();
  }, [staffId]);
  

  // Function to get tile class name for marking dates
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toLocaleDateString();
      return dateMarked[dateString] ? `highlight ${dateMarked[dateString]}` : null; // Return appropriate class
    }
    return null;
  };

  return (
    <Box style={{ display: 'flex', padding: '40px' }}>
      <Box style={{ 
          backgroundColor: '#f9f9f9', 
          borderRadius: 12, 
          boxShadow: '0px 4px 12px rgba(0,0,0,0.1)', 
          width: '1000px',  // Increased width
          padding: '20px' 
      }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          style={{ 
            fontFamily: 'cursive', 
            fontWeight: 'bold', 
            color: 'purple', 
            textAlign: 'center',
            marginBottom: '20px' 
          }}
        >
          Attendance Records
        </Typography>
        
        <Box component="ul" style={{ listStyle: 'none', padding: 0 }}>
          {attendanceRecords.map((record) => (
            <Box 
              key={record._id} 
              component="li" 
              style={{ 
                padding: '16px', 
                backgroundColor: 'white', 
                borderRadius: 8, 
                boxShadow: '0px 2px 8px rgba(0,0,0,0.1)', 
                marginBottom: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant="body1" style={{ fontWeight: '500' }}>
                {new Date(record.date).toLocaleDateString()} 
              </Typography>
              <Typography 
                variant="body2" 
                style={{ 
                  fontWeight: 'bold', 
                  color: record.status === 'Present' ? 'green' : 'red' 
                }}
              >
                {record.status}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      
      <Box style={{ marginLeft: '20px', marginTop: '0' }}> {/* Remove margin-top if needed */}
        <Calendar
          tileClassName={tileClassName} // Add the function to highlight dates
          style={{ border: '1px solid #ccc', borderRadius: '8px' }}
        />
      </Box>

      <style jsx>{`
        .react-calendar__tile.highlight.present {
          background-color: rgba(0, 128, 0, 0.3); /* Light green for present */
        }

        .react-calendar__tile.highlight.absent {
          background-color: rgba(255, 0, 0, 0.3); /* Light red for absent */
        }

        .react-calendar__tile.highlight.leave {
          background-color: rgba(0, 0, 255, 0.3); /* Light blue for leave */
        }
      `}</style>
    </Box>
  );
};

export default ViewAttendance;
