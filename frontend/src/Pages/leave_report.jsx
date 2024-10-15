import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar';
import Header from '../components/customer_header';
import axios from 'axios';
import 'jspdf-autotable';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Footer from '../components/customer_footer';

const LeaveReportPage = () => {
  const [leaveRecords, setLeaveRecords] = useState([]);
  const [staffRecords, setStaffRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaveRecords = async () => {
      try {
        const response = await axios.get('http://localhost:3001/leaves');
        setLeaveRecords(response.data);
      } catch (error) {
        console.error('Error fetching leave records:', error);
        setError('Failed to load leave records.');
      }
    };

    const fetchStaffRecords = async () => {
      try {
        const response = await axios.get('http://localhost:3001/staff/get-staff');
        setStaffRecords(response.data);
      } catch (error) {
        console.error('Error fetching staff records:', error);
        setError('Failed to load staff records.');
      }
    };

    fetchLeaveRecords();
    fetchStaffRecords();
    setLoading(false);
  }, []);

  // Create staff maps after fetching records
  const staffMap = staffRecords.reduce((acc, staff) => {
    acc[staff._id] = staff.name;
    return acc;
  }, {});

  const staffIdMap = staffRecords.reduce((acc, staff) => {
    acc[staff._id] = staff.staffId;
    return acc;
  }, {});

  const handleDownload = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    const startY = 15;
    
    // Add Letterhead
    doc.setFontSize(22);
    doc.setFont('courier', 'bold');
    doc.setTextColor(75, 0, 130);
    doc.text("Hotel Breet's Garden", pageWidth / 2, startY, { align: 'center'});

    // Subtitle
    doc.setFontSize(17);
    doc.setFont('courier', 'bold');
    doc.setTextColor(0, 128, 0);
    const subtitleY = startY + 7;
    doc.text('Leave Report', pageWidth / 2, subtitleY, { align: 'center' });

    // Address
    doc.setFontSize(12);
    doc.setFont('courier', 'normal');
    doc.setTextColor(0, 0, 255);
    const addressY = subtitleY + 10;
    doc.text('123 Main Street, City, Country', pageWidth / 2, addressY, { align: 'center' });

    // Contact
    doc.setFontSize(12);
    doc.setFont('courier', 'normal');
    doc.setTextColor(0, 128, 0);
    const contactY = addressY + 12;
    doc.text('Contact - 123-456-789', pageWidth / 2, contactY, { align: 'center' });

    // Draw a horizontal line below the address
    doc.setLineWidth(0.5);
    doc.setDrawColor(0, 0, 0);
    doc.line(margin, addressY + 18, pageWidth - margin, addressY + 18);

    // Prepare table data
    const tableColumn = ['Employee ID', 'Employee Name', 'Start Date', 'End Date', 'Reason', 'Status'];
    const tableRows = leaveRecords
      .filter(record => staffMap[record.staffId] && staffIdMap[record.staffId])  // Filter out "Unknown" records
      .map(record => [
        staffIdMap[record.staffId],
        staffMap[record.staffId],
        record.startDate.substring(0,10),
        record.endDate.substring(0,10),
        record.reason,
        record.status
      ]);

    doc.autoTable({
      startY: addressY + 22,
      head: [tableColumn],
      body: tableRows,
      styles: {
        fontSize: 10,
        overflow: 'linebreak',
        cellPadding: 4,
        halign: 'center',
        valign: 'middle',
      },
      headStyles: {
        fillColor: [123, 31, 162],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        lineWidth: 0.1,
        lineColor: [200, 200, 200],
      },
      margin: { top: 0, bottom: 20, left: margin, right: margin },
    });

    // Add Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(128, 128, 128);
      doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin, doc.internal.pageSize.getHeight() - 10, { align: 'right' });
    }

    doc.save('leave_report.pdf');
  };

  if (error) return <Typography>{error}</Typography>;

  return (
    <Box style={{backgroundColor:'cyan'}}>
      <Header />
      <Box display="flex">
        <Sidebar />
        <Box
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p={2}
          style={{
            flex: 1,
            minHeight: '100vh',
            backgroundColor: 'white',
            borderRadius: 8,
            boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
            margin: '15px',
            marginTop: '15px',
            marginBottom: '15px',
          }}
          id="printable-section"
        >
          <Box
            style={{
              textAlign: 'center',
              marginBottom: '20px',
              padding: '10px',
              borderBottom: '2px solid purple',
              backgroundColor: 'lightblue',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <Typography
              variant="h4"
              style={{ fontFamily: 'cursive', fontWeight: 'bold', color: 'purple', marginTop: '20px' }}
            >
              Hotel Breet's Garden
            </Typography>
            <Typography variant="h6" style={{ fontFamily: 'serif', fontStyle: 'bold', color: 'green' }}>
              Leave Report
            </Typography>
            <Typography variant="body1" style={{ fontFamily: 'sans-serif', color: 'grey', marginTop: 10 }}>
              123 Main Street, City, Country
              <br />
              Contact: 123-456-789
            </Typography>
          </Box>
          <Box mt={4}>
            <Button variant="contained" color="secondary" onClick={handleDownload} style={{marginBottom:'10px'}}>
              Download PDF
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow style={{backgroundColor:'orange'}}>
                  <TableCell><strong>Employee ID</strong></TableCell>
                  <TableCell><strong>Employee Name</strong></TableCell>
                  <TableCell><strong>Start Date</strong></TableCell>
                  <TableCell><strong>End Date</strong></TableCell>
                  <TableCell><strong>Leave Reason</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaveRecords
                  .filter(record => staffMap[record.staffId] && staffIdMap[record.staffId]) // Filter out "Unknown" records
                  .map((record) => (
                    <TableRow key={record.staffId}>
                      <TableCell>{staffIdMap[record.staffId]}</TableCell>
                      <TableCell>{staffMap[record.staffId]}</TableCell>
                      <TableCell>{record.startDate.substring(0, 10)}</TableCell>
                      <TableCell>{record.endDate.substring(0, 10)}</TableCell>
                      <TableCell>{record.reason}</TableCell>
                      <TableCell>{record.status}</TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default LeaveReportPage;

