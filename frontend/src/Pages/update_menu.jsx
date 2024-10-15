import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, FormControl, Select, InputLabel, Box, Typography, FormHelperText } from '@mui/material';
import Sidebar from '../components/mnusidebar';
import Header from '../components/customer_header'; 
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const UpdateMenu = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [menuItemId, setMenuItemId] = useState('');
  const [menuItemName, setMenuItemName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [preparationTime, setPreparationTime] = useState('');
  const [servingSize, setServingSize] = useState('');
  const [menuImage, setMenuImage] = useState('');
  const [imagePreview, setImagePreview] = useState(''); // To hold the image preview URL
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/menu/get-menu-item/${id}`);
        const { menuItemId, menuItemName, category, price, preparationTime, servingSize, menuImage } = response.data;
        setMenuItemId(menuItemId);
        setMenuItemName(menuItemName);
        setCategory(category);
        setPrice('Rs ' + price);
        setPreparationTime(preparationTime);
        setServingSize(servingSize);
        setMenuImage(menuImage);
        setImagePreview(menuImage); // Set the initial preview from the fetched data
      } catch (error) {
        console.error(error);
        swal("Error", "Failed to fetch menu item data.", "error");
      }
    };

    fetchMenuItem();
  }, [id]);

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
      const imageUrl = URL.createObjectURL(file);
      setMenuImage(file); // Set the file for uploading later
      setImagePreview(imageUrl); // Set the preview image
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
  
    const formData = new FormData();
    formData.append('menuItemId', menuItemId);
    formData.append('menuItemName', menuItemName);
    formData.append('category', category);
    formData.append('price', price.replace(/^Rs\s*/, '')); // Remove 'Rs ' from the price
    formData.append('preparationTime', preparationTime);
    formData.append('servingSize', servingSize);
  
    if (menuImage instanceof File) { // Only append if menuImage is a file (newly uploaded)
      formData.append('menuImage', menuImage); // Attach the image file
    }
  
    try {
      await axios.put(`http://localhost:3001/menu/update-menu-item/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important to set multipart/form-data for file uploads
        },
      });
      swal("Success", "Menu item updated successfully!", "success");
      navigate('/view-menu');
    } catch (error) {
      console.error(error);
      swal("Error", "Something went wrong. Please try again.", "error");
    }
  };
  


  return (
    <Box>
      <Header />
      <Box display="flex" width="100%" justifyContent="space-between">
        <Sidebar />
        <Box
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p={5}
          style={{ backgroundColor: 'white', borderRadius: 8, boxShadow: '0px 0px 10px rgba(0,0,0,0.1)', flex: 1, margin: '15px' }}
        >
          <Box alignItems="center" justifyContent="center">
            <Typography variant="h4" gutterBottom style={{ fontFamily: 'cursive', fontWeight: 'bold', color: 'purple', textAlign: 'center', marginTop: '40px' }}>
              Update Menu Item
            </Typography>
          </Box>

          <Box display="flex" width="100%">
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
                  onChange={handleMenuItemIdChange}
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

                {/* Wrapping the input file component in Box for spacing */}
                <Box margin="normal">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleMenuImageChange} 
                    style={{ margin: '16px 0' }} 
                  />
                </Box>

                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  style={{ marginTop: '20px', marginBottom:'20px' }}
                >
                  Update Menu Item
                </Button>

                {/* Move the image preview below the Update button */}
                {imagePreview && (
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    style={{ maxWidth: '100%', maxHeight: '200px', display: 'block' }} 
                  />
                )}
              </Box>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <img 
                src="https://cdn.sanity.io/images/bs9rmafh/main/01d3971a4ed2b314478887f8585cd22b2799e1d2-2335x3500.jpg?w=2335&h=3500&auto=format"  // Replace with the path to your fixed image
                alt="Fixed Decorative Image"
                style={{ width: '100%', height: 'auto', maxWidth: '400px', borderRadius: '8px' , marginBottom:'200px'}} // Adjusted styles
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UpdateMenu;
