import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, FormControl, Select, InputLabel, Box, Typography, FormHelperText } from '@mui/material';
import Sidebar from '../components/mnusidebar';
import Header from '../components/customer_header'; 
import axios from 'axios';
import swal from 'sweetalert';
import Footer from '../components/customer_footer';

const AddMenu = () => {
  const [menuItemId, setMenuItemId] = useState('');
  const [menuItemName, setMenuItemName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [preparationTime, setPreparationTime] = useState('');
  const [servingSize, setServingSize] = useState('');
  const [menuImage, setMenuImage] = useState('');
  const [errors, setErrors] = useState({});
  const [menuImageFile, setMenuImageFile] = useState(null);

    // Auto-generate the menu item ID when the component loads
    useEffect(() => {
      generateMenuItemId();
    }, []);
  
    const generateMenuItemId = () => {
      const id = `MENU-${Math.floor(Math.random() * 100000)}`;
      setMenuItemId(id);
    };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setErrors(prevErrors => ({ ...prevErrors, category: '' }));
  };

  const handleMenuItemIdChange = (event) => {
    const value = event.target.value;
    setMenuItemId(value);
    setErrors(prevErrors => ({ ...prevErrors, menuItemId: '' }));
  };

  const handlePriceChange = (event) => {
    const value = event.target.value.replace(/^Rs\s*/, '');
    if (/^\d*\.?\d*$/.test(value)) {
      setPrice(value ? 'Rs ' + value : '');
    }
    setErrors(prevErrors => ({ ...prevErrors, price: '' }));
  };

  const handlePreparationTimeChange = (event) => {
    setPreparationTime(event.target.value);
    setErrors(prevErrors => ({ ...prevErrors, preparationTime: '' }));
  };

  const handleServingSizeChange = (event) => {
    setServingSize(event.target.value);
    setErrors(prevErrors => ({ ...prevErrors, servingSize: '' }));
  };

  const handleMenuImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        setMenuImageFile(file);
        setMenuImage(URL.createObjectURL(file)); // Create a temporary URL for the preview
        setErrors(prevErrors => ({ ...prevErrors, menuImage: '' }));
    }
};


  const validateForm = () => {
    const newErrors = {};
    if (!menuItemId) newErrors.menuItemId = "Menu Item ID is required.";
    if (!menuItemName) newErrors.menuItemName = "Menu Item Name is required.";
    if (!category) newErrors.category = "Category is required.";
    if (!price || price === 'Rs ') newErrors.price = "Price is required.";
    if (!preparationTime) newErrors.preparationTime = "Preparation Time is required.";
    if (!servingSize) newErrors.servingSize = "Serving Size is required.";
    if (!menuImage) newErrors.menuImage = "Menu Image URL is required.";
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }

    const newMenuItem = {
        menuItemId,
        menuItemName,
        category,
        price: price.replace(/^Rs\s*/, ''),
        preparationTime,
        servingSize,
        // You can upload the image file here
    };

    const formData = new FormData();
    Object.entries(newMenuItem).forEach(([key, value]) => {
        formData.append(key, value);
    });

    // Append the image file if it exists
    if (menuImageFile) {
        formData.append('menuImage', menuImageFile);
    }

    try {
        await axios.post('http://localhost:3001/menu/add-menu-item', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Specify the content type
            },
        });
        swal("Success", "New menu item added successfully!", "success");
        setMenuItemName('');
        setCategory('');
        setPrice('');
        setPreparationTime('');
        setServingSize('');
        setMenuImage('');
        setMenuImageFile(null); // Reset the image file
        setErrors({});
    } catch (error) {
        console.error(error);
        swal("Error", "Something went wrong. Please try again.", "error");
    }
};

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
          style={{ backgroundColor: 'white', borderRadius: 8, boxShadow: '0px 0px 10px rgba(0,0,0,0.1)', flex: 1, margin: '15px', marginTop:'20px' }}
        >
          {/* Title Section */}
          <Box
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h4" gutterBottom style={{ fontFamily: 'cursive', fontWeight: 'bold', color: 'purple', textAlign: 'center', marginTop: '40px' }}>
              Add New Menu Item
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
                  label="Menu Item ID"
                  variant="outlined"
                  value={menuItemId}
                  helperText={errors.menuItemId}
                  error={!!errors.menuItemId}
                  disabled
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Menu Item Name"
                  variant="outlined"
                  value={menuItemName}
                  onChange={(e) => setMenuItemName(e.target.value)}
                  helperText={errors.menuItemName}
                  error={!!errors.menuItemName}
                />
                <FormControl fullWidth margin="normal" variant="outlined" error={!!errors.category}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={category}
                    onChange={handleCategoryChange}
                    label="Category"
                  >
                    <MenuItem value="Appetizer">Appetizer</MenuItem>
                    <MenuItem value="Main Course">Main Course</MenuItem>
                    <MenuItem value="Dessert">Dessert</MenuItem>
                    <MenuItem value="Beverage">Beverage</MenuItem>
                  </Select>
                  <FormHelperText>{errors.category}</FormHelperText>
                </FormControl>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Price"
                  variant="outlined"
                  value={price}
                  onChange={handlePriceChange}
                  helperText={errors.price}
                  error={!!errors.price}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                />
                <FormControl fullWidth margin="normal" variant="outlined" error={!!errors.preparationTime}>
                  <InputLabel>Preparation Time (in minutes)</InputLabel>
                  <Select
                    value={preparationTime}
                    onChange={handlePreparationTimeChange}
                    label="Preparation Time (in minutes)"
                  >
                    <MenuItem value="5">5 minutes</MenuItem>
                    <MenuItem value="10">10 minutes</MenuItem>
                    <MenuItem value="15">15 minutes</MenuItem>
                    <MenuItem value="20">20 minutes</MenuItem>
                    <MenuItem value="25">25 minutes</MenuItem>
                    <MenuItem value="30">30 minutes</MenuItem>
                    <MenuItem value="35">35 minutes</MenuItem>
                    <MenuItem value="40">40 minutes</MenuItem>
                    <MenuItem value="45">45 minutes</MenuItem>
                    <MenuItem value="50">50 minutes</MenuItem>
                    <MenuItem value="55">55 minutes</MenuItem>
                    <MenuItem value="60">60 minutes</MenuItem>
                  </Select>
                  <FormHelperText>{errors.preparationTime}</FormHelperText>
                </FormControl>
                <FormControl fullWidth margin="normal" variant="outlined" error={!!errors.servingSize}>
                  <InputLabel>Serving Size</InputLabel>
                  <Select
                    value={servingSize}
                    onChange={handleServingSizeChange}
                    label="Serving Size"
                  >
                    <MenuItem value="Small">Small</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Large">Large</MenuItem>
                  </Select>
                  <FormHelperText>{errors.servingSize}</FormHelperText>
                </FormControl>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Menu Image URL"
                  variant="outlined"
                  value={menuImage}
                  helperText={errors.menuImage}
                  error={!!errors.menuImage}
                  disabled // Disable this field as we are using file input instead
              />
              <Box marginTop={2}>
                  <InputLabel htmlFor="upload-image">Upload Menu Image</InputLabel>
                  <input
                      id="upload-image"
                      type="file"
                      accept="image/*"
                      onChange={handleMenuImageChange}
                      style={{ display: 'none' }}
                  />
                  <label htmlFor="upload-image">
                      <Button variant="contained" component="span" color="primary" style={{backgroundColor:'green'}}>
                          Choose File
                      </Button>
                      <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  style={{ marginTop: 16 }}
                >
                  Add Menu Item
                </Button>
                  </label>
                  {menuImage && (
                      <img
                          src={menuImage}
                          alt="Selected Preview"
                          style={{
                              width: '100%',
                              height: 'auto',
                              borderRadius: '10px',
                              marginTop: '10px',
                          }}
                      />
                  )}
              </Box>


              </Box>
            </Box>

            {/* Image Section */}
            <Box
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '20px',
                margin: '15px',
              }}
            >
              <img
                src="https://cdn.sanity.io/images/bs9rmafh/main/01d3971a4ed2b314478887f8585cd22b2799e1d2-2335x3500.jpg?w=2335&h=3500&auto=format"
                alt="Food"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '10px',
                  marginTop:'15px'
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddMenu;
