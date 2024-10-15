import React from 'react';
import { Box } from '@mui/material';
import userAvatar from '../Images/profile.png'; // Replace with actual user avatar
import './header.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const Header = () => {
  
  const navigate = useNavigate();

  const logout = () =>{
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <Box >
    </Box>
  );
};

export default Header;
