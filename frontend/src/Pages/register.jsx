import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, FormControl, Select, InputLabel, Box, Typography } from '@mui/material';
import axios from 'axios';
import swal from 'sweetalert';
import Header from '../components/customer_header'; 
import Footer from '../components/customer_footer';
import RegisterImg from '../Images/register.jpg'
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar';

const Register = () => {
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [staffId, setStaffId] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, position: '' }));
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, department: '' }));
  };

  const handleContactChange = (event) => {
    const { value } = event.target;
    if (/^\d*$/.test(value) && value.length <= 10) {
      setContact(value);
      setErrors((prevErrors) => ({ ...prevErrors, contact: '' }));
    }
  };  

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
    setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
  };

  const validateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };


  const validateFields = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!staffId) newErrors.staffId = "Staff ID is required";
    if (!name) newErrors.name = "Name is required";
    if (!dob) {
      newErrors.dob = "Date of Birth is required";
    } else if (validateAge(dob) < 18) {
      newErrors.dob = "User must be at least 18 years old";
    }
    if (!address) newErrors.address = "Address is required";
    if (!position) newErrors.position = "Position is required";
    if (!department) newErrors.department = "Department is required";
    if (!contact) newErrors.contact = "Contact number is required";
    else if (contact.length !== 10) newErrors.contact = "Contact number must be exactly 10 digits";  // Validation for 10 digits
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    else if (!emailPattern.test(email)) newErrors.email = "Invalid email format";

    return newErrors;
  };

  const generateStaffId = () => {
    const randomId = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
    return `STF${randomId}`; // Format: STFXXXX
};


  useEffect(() => {
    const newStaffId = generateStaffId();
    setStaffId(newStaffId);
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newUser = {
      staffId,
      name,
      dob,
      address,
      position,
      department,
      contact,
      email,
      password
    };

    try {
      await axios.post('http://localhost:3001/staff/add-staff', newUser);
      swal("Success", "Registration successful!", "success") ; 
    } catch (error) {
      console.error(error);
      swal("Error", "Something went wrong. Please try again.", "error");
    }
  };

  return (
    <div style={{backgroundColor:'cyan'}}>
      <Header />
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="flex-start" 

        style={{
          height: 'auto',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Sidebar />
        <Box
          display="flex"
          flexDirection="row"  // Change flex direction to row
          alignItems="center"
          justifyContent="center"
          style={{
            flex: 1,
            backgroundColor: 'white',
            borderRadius: 8,
            boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
            padding: '40px',
            width: '100%',
            maxWidth: '1200px',  // Adjust max width to accommodate image
            marginBottom:'60px',
            marginLeft:'20px',
            marginRight:'20px',
            marginTop:'20px'
          }}
        >
          {/* Form Section */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            style={{
              width: '150%', 
              marginRight: '20px', 
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              style={{ fontFamily: 'cursive', fontWeight: 'bold', color: 'purple', textAlign: 'center' }}
            >
              Register
            </Typography>

            <Box component="form" width="100%" noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Staff ID"
              variant="outlined"
              value={staffId}
              InputProps={{
                  readOnly: true,
              }}
              disabled
          />

              <TextField
                fullWidth
                margin="normal"
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors((prevErrors) => ({ ...prevErrors, name: '' }));
                }}
                error={!!errors.name}
                helperText={errors.name}
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
                value={dob}
                onChange={(e) => {
                  setDob(e.target.value);
                  setErrors((prevErrors) => ({ ...prevErrors, dob: '' }));
                }}
                error={!!errors.dob}
                helperText={errors.dob}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Address"
                variant="outlined"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setErrors((prevErrors) => ({ ...prevErrors, address: '' }));
                }}
                error={!!errors.address}
                helperText={errors.address}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                variant="outlined"
                value={email}
                onChange={handleEmailChange}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={handlePasswordChange}
                error={!!errors.password}
                helperText={errors.password}
              />
              <FormControl fullWidth margin="normal" variant="outlined" error={!!errors.position}>
                <InputLabel>Position</InputLabel>
                <Select
                  value={position}
                  onChange={handlePositionChange}
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
                {errors.position && <Typography color="error">{errors.position}</Typography>}
              </FormControl>
              <FormControl fullWidth margin="normal" variant="outlined" error={!!errors.department}>
                <InputLabel>Department</InputLabel>
                <Select
                  value={department}
                  onChange={handleDepartmentChange}
                  label="Department"
                >
                    <MenuItem value="Administration/Management">Administration/Management</MenuItem>
                    <MenuItem value="Front Office/Guest Services">Front Office/Guest Services</MenuItem>
                    <MenuItem value="Housekeeping">Housekeeping</MenuItem>
                    <MenuItem value="Maintenance/Engineering">Maintenance/Engineering</MenuItem>
                    <MenuItem value="Food and Beverage">Food and Beverage</MenuItem>
                    <MenuItem value="Security/Safety">Security/Safety</MenuItem>
                </Select>
                {errors.department && <Typography color="error">{errors.department}</Typography>}
              </FormControl>

              <TextField
                fullWidth
                margin="normal"
                label="Contact"
                variant="outlined"
                value={contact}
                onChange={handleContactChange}
                error={!!errors.contact}
                helperText={errors.contact}
              />

            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <Button fullWidth type="submit" variant="contained" color="primary">
                Register
              </Button>

              {/* Already have an account? Login text */}
              <Typography variant="body2" style={{ marginTop: '10px' }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color: 'blue', textDecoration: 'none', fontWeight: 'bold' }}>
                  Login
                </Link>
              </Typography>
            </Box>

            </Box>
          </Box>

          {/* Image Section */}
          <Box
            width="160%" 
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <img
              src={RegisterImg}
              alt="Register"
              style={{
                maxWidth: '100%',
                maxHeight: '120%',
                objectFit: 'cover',
                position: 'absolute', // Position the image absolutely within the container
                top: '38%',
                left: '60%',
                
              }}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Register;
