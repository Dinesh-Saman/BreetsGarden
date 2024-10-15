import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, TextField, TablePagination } from '@mui/material';
import swal from 'sweetalert';
import Header from '../components/customer_header'; 
import Sidebar from '../components/sidebar';
import { makeStyles } from '@mui/styles'; // Correct import for makeStyles in MUI v5

import Footer from '../components/customer_footer';

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
    flex: 1,
    margin: '15px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '80vh',
  },
  tableContainer: {
    width: '100%',
    overflowX: 'auto',
  },
  searchContainer: {
    display: 'flex',
    marginBottom: '20px',
    justifyContent: 'space-between',
    width: '100%',
  },
}));

const ViewAllLeaves = () => {
  const classes = useStyles();
  const [leaveRecords, setLeaveRecords] = useState([]);
  const [staffRecords, setStaffRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('staffName');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  // Fetch leave records
  const fetchLeaveRecords = async () => {
    try {
      const response = await axios.get('http://localhost:3001/leaves'); 
      setLeaveRecords(response.data);
    } catch (error) {
      console.error(error);
      swal("Error", "Failed to load leave records.", "error");
    }
  };

  // Fetch staff records
  const fetchStaffRecords = async () => {
    try {
      const response = await axios.get('http://localhost:3001/staff/get-staff'); 
      setStaffRecords(response.data);
    } catch (error) {
      console.error(error);
      swal("Error", "Failed to load staff records.", "error");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchLeaveRecords();
      await fetchStaffRecords();
      setLoading(false);
    };
    fetchData();
  }, []);

  // Create a map of staff IDs to names for quick lookup
  const staffMap = staffRecords.reduce((acc, staff) => {
    acc[staff._id] = staff.staffId; // Assuming staffId is the unique identifier
    return acc;
  }, {});

  const staffNameMap = staffRecords.reduce((acc, staff) => {
    acc[staff._id] = staff.name;
    return acc;
  }, {});

  // Function to handle status change
  const handleStatusChange = async (leaveId, newStatus) => {
    try {
      await axios.patch(`http://localhost:3001/leaves/leaves/${leaveId}`, { status: newStatus });
      setLeaveRecords((prevRecords) =>
        prevRecords.map((record) =>
          record._id === leaveId ? { ...record, status: newStatus } : record
        )
      );
    } catch (error) {
      console.error(error);
      swal("Error", "Failed to update status.", "error");
    }
  };

  // Function to filter leave records based on search criteria
  const filteredLeaveRecords = leaveRecords.filter((record) => {
    // Check if staffId exists in staffMap to avoid rendering unknown records
    const staffId = staffMap[record.staffId];
    const staffName = staffNameMap[record.staffId];

    // Only include records with valid staff IDs and names
    if (!staffId || !staffName) return false;

    switch (searchCriteria) {
      case 'staffId':
        return staffId.toLowerCase().includes(searchQuery.toLowerCase());
      case 'staffName':
        return staffName.toLowerCase().includes(searchQuery.toLowerCase());
      case 'status':
        return record.status.toLowerCase().includes(searchQuery.toLowerCase());
      case 'reason':
        return record.reason.toLowerCase().includes(searchQuery.toLowerCase());
      case 'startDate':
        return new Date(record.startDate).toLocaleDateString().includes(searchQuery);
      case 'endDate':
        return new Date(record.endDate).toLocaleDateString().includes(searchQuery);
      default:
        return true;
    }
  });

  // Handle pagination change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box style={{backgroundColor:'cyan'}}>
      <Header />
      <Box display="flex">
        <Sidebar />
        <Box className={classes.contentContainer}>
          <Typography
            variant="h4"
            gutterBottom
            style={{ marginBottom: '20px', fontFamily: 'cursive', fontWeight: 'bold', color: 'purple', textAlign: 'center', marginTop:'40px', marginBottom:'30px' }}
          >
            Employee Leave Records
          </Typography>
          <Box className={classes.searchContainer}>
            <TextField
              label="Search"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '70%' }}
            />
            <Select
              value={searchCriteria}
              onChange={(e) => setSearchCriteria(e.target.value)}
              style={{ width: '25%', marginLeft: '10px' }}
            >
              <MenuItem value="staffId">Staff Id</MenuItem>
              <MenuItem value="staffName">Staff Name</MenuItem>
              <MenuItem value="status">Status</MenuItem>
              <MenuItem value="reason">Reason</MenuItem>
              <MenuItem value="startDate">Start Date</MenuItem>
              <MenuItem value="endDate">End Date</MenuItem>
            </Select>
          </Box>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: '#d4ac0d', color: 'white' }}>
                  <TableCell style={{ color: 'white' }}>Staff Id</TableCell>
                  <TableCell style={{ color: 'white' }}>Staff Name</TableCell>
                  <TableCell style={{ color: 'white' }}>Start Date</TableCell>
                  <TableCell style={{ color: 'white' }}>End Date</TableCell>
                  <TableCell style={{ color: 'white' }}>Reason</TableCell>
                  <TableCell style={{ color: 'white' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredLeaveRecords.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record) => {
                  const staffId = staffMap[record.staffId];
                  const staffName = staffNameMap[record.staffId];

                  // Only render if staffId and staffName exist
                  if (!staffId || !staffName) return null;

                  return (
                    <TableRow key={record._id}>
                      <TableCell>{staffId}</TableCell>
                      <TableCell>{staffName}</TableCell>
                      <TableCell>{new Date(record.startDate).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(record.endDate).toLocaleDateString()}</TableCell>
                      <TableCell>{record.reason}</TableCell>
                      <TableCell>
                        <Select
                          value={record.status}
                          style={{
                            fontWeight: 'bold',
                            color: record.status === 'Pending' ? 'blue' : record.status === 'Approved' ? 'green' : 'red',
                          }}
                          onChange={(e) => handleStatusChange(record._id, e.target.value)}
                        >
                          <MenuItem value="Pending">Pending</MenuItem>
                          <MenuItem value="Approved">Approved</MenuItem>
                          <MenuItem value="Rejected">Rejected</MenuItem>
                        </Select>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[8, 16, 24]}
            component="div"
            count={filteredLeaveRecords.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ViewAllLeaves;
