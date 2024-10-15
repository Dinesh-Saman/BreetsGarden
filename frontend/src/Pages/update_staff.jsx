import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, MenuItem, FormControl, Select, InputLabel, Box, Typography } from '@mui/material';
import Sidebar from '../components/sidebar';
import Header from '../components/navbar';
import axios from 'axios';
import swal from 'sweetalert';
import MainHeader from '../components/customer_header'; 
import Footer from '../components/customer_footer';

const UpdateStaff = () => {
  const { id } = useParams(); // Get the staff ID from the URL
  const navigate = useNavigate();
  const [staffData, setStaffData] = useState({
    staffId: '',
    name: '',
    dob: '',
    address: '',
    position: '',
    department: '',
    contact: '',
    email: '' // Added email field
  });

  // Fetch the staff data when the component mounts
  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/staff/get-staff/${id}`);
        setStaffData(response.data);
      } catch (error) {
        console.error("There was an error fetching the staff data!", error);
      }
    };

    fetchStaffData();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStaffData({
      ...staffData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:3001/staff/update-staff/${id}`, staffData);
      swal("Success", "Staff member updated successfully!", "success");
      navigate('/view-staff');
    } catch (error) {
      console.error(error);
      swal("Error", "Something went wrong. Please try again.", "error");
    }
  };

  return (
    <Box style={{backgroundColor:'cyan'}}>
      <MainHeader /> {/* Add the header here */}
      <Box display="flex">
        <Sidebar />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p={2}
          style={{ backgroundColor: 'white', borderRadius: 8, boxShadow: '0px 0px 10px rgba(0,0,0,0.1)', flex: 1, margin: '15px' }}
        >
          {/* Title Section */}
          <Box alignItems="center" justifyContent="center">
            <Typography variant="h4" gutterBottom style={{ fontFamily: 'cursive', fontWeight: 'bold', color: 'purple', textAlign: 'center' }}>
              Update Staff Member
            </Typography>
          </Box>

          <Box display="flex" width="100%">
            {/* Form Section */}
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              style={{ flex: 1, padding: '20px', margin: '15px' }}
            >
              <Box component="form" width="100%" noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Staff Member ID"
                  variant="outlined"
                  name="staffId"
                  value={staffData.staffId}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Name"
                  variant="outlined"
                  name="name"
                  value={staffData.name}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="DOB"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  name="dob"
                  value={staffData.dob.substring(0, 10)}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Address"
                  variant="outlined"
                  name="address"
                  value={staffData.address}
                  onChange={handleChange}
                />
                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputLabel>Position</InputLabel>
                  <Select
                    name="position"
                    value={staffData.position}
                    onChange={handleChange}
                    label="Position"
                  >
                    <MenuItem value="General Manager">General Manager</MenuItem>
                    <MenuItem value="Assistant Manager">Assistant Manager</MenuItem>
                    <MenuItem value="Front Desk Staff">Front Desk Staff</MenuItem>
                    <MenuItem value="Concierge">Concierge</MenuItem>
                    <MenuItem value="Housekeeping Staff">Housekeeping Staff</MenuItem>
                    <MenuItem value="Maintenance Staff">Maintenance Staff</MenuItem>
                    <MenuItem value="Food and Beverage Staff">Food and Beverage Staff</MenuItem>
                    <MenuItem value="Event and Banquet Staff">Event and Banquet Staff</MenuItem>
                    <MenuItem value="Sales and Marketing Staff">Sales and Marketing Staff</MenuItem>
                    <MenuItem value="Security Staff">Security Staff</MenuItem>
                    <MenuItem value="Spa and Recreation Staff">Spa and Recreation Staff</MenuItem>
                    <MenuItem value="Valet and Bell Staff">Valet and Bell Staff</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputLabel>Department</InputLabel>
                  <Select
                    name="department"
                    value={staffData.department}
                    onChange={handleChange}
                    label="Department"
                  >
                    <MenuItem value="Administration/Management">Administration/Management</MenuItem>
                    <MenuItem value="Front Office/Guest Services">Front Office/Guest Services</MenuItem>
                    <MenuItem value="Housekeeping">Housekeeping</MenuItem>
                    <MenuItem value="Maintenance/Engineering">Maintenance/Engineering</MenuItem>
                    <MenuItem value="Food and Beverage">Food and Beverage</MenuItem>
                    <MenuItem value="Security/Safety">Security/Safety</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Contact"
                  variant="outlined"
                  name="contact"
                  value={staffData.contact}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  type="email"
                  variant="outlined"
                  name="email"
                  value={staffData.email}
                  onChange={handleChange}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  style={{ marginTop: 16 }}
                >
                  Update Member
                </Button>
              </Box>
            </Box>

            {/* Image Section */}
            <Box
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '20px',
                margin: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src="https://s1.1zoom.me/big0/482/Tomatoes_White_background_Cook_Uniform_Smile_548857_695x1024.jpg"
                alt="Sample"
                style={{ maxWidth: '100%', borderRadius: 8 }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UpdateStaff;
