import React, { useState } from 'react';
import axios from 'axios';
import bgImage from './css_files/images/back9.jpeg';
import StockManagerHeader from './StockManagerHeader';

export default function AddStockItem() {
    const [itemName, setItemName] = useState("");
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [unitPrice, setUnitPrice] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [supplierName, setSupplierName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [errors, setErrors] = useState({});

    // Subcategories for each category
    const subCategories = {
        Food: ['Fruits', 'Vegetables', 'Meat', 'Dairy'],
        Beverages: ['Soft Drinks', 'Juices', 'Alcoholic Beverages'],
        Toiletries: ['Shampoo', 'Soap', 'Toothpaste'],
        'Event Supplies': ['Chairs', 'Tables', 'Decorations']
    };

    
    function validateForm() {
        let newErrors = {};
        let isValid = true;

        if (!itemName) {
            newErrors.itemName = "Item name is required";
            isValid = false;
        }

        if (!category) {
            newErrors.category = "Category is required";
            isValid = false;
        }

        if (!subCategory) {
            newErrors.subCategory = "Sub category is required";
            isValid = false;
        }

        if (!quantity) {
            newErrors.quantity = "Quantity is required";
            isValid = false;
        } else if (parseInt(quantity) < 0) {
            newErrors.quantity = "Quantity cannot be negative";
            isValid = false;
        }

        if (!unitPrice) {
            newErrors.unitPrice = "Unit price is required";
            isValid = false;
        } else if (parseFloat(unitPrice) < 0) {
            newErrors.unitPrice = "Unit price cannot be negative";
            isValid = false;
        }

        if (!expiryDate) {
            newErrors.expiryDate = "Expiry date is required";
            isValid = false;
        } else if (new Date(expiryDate) <= new Date()) {
            newErrors.expiryDate = "Expiry date must be in the future";
            isValid = false;
        }

        if (!supplierName) {
            newErrors.supplierName = "Supplier name is required";
            isValid = false;
        }

        if (!contactNumber) {
            newErrors.contactNumber = "Contact number is required";
            isValid = false;
        } else if (!/^\d{10}$/.test(contactNumber)) {
            newErrors.contactNumber = "Contact number must be exactly 10 digits";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

    function sendData(e) {
        e.preventDefault();
        
        if (validateForm()) {
            const newStockItem = {
                itemName,
                category,
                subCategory,
                quantity,
                unitPrice,
                expiryDate,
                supplierName,
                contactNumber
            };

            axios.post("http://localhost:8080/stocks/sadd", newStockItem)
            .then((response) => {
                console.log('Success:', response);
                alert("New Stock Item Details are submitted successfully!");
                
                // Reset form fields
                setItemName("");
                setCategory("");
                setSubCategory("");
                setQuantity("");
                setUnitPrice("");
                setExpiryDate("");
                setSupplierName("");
                setContactNumber("");
                setErrors({});
            })
            .catch((err) => {
                console.error('Error:', err);
                alert(err.message);
            });
        }
    }

    const containerStyle = {
        backgroundImage: `linear-gradient(rgba(172, 172, 172, 0.4), rgba(213, 212, 212, 0.4)),url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
    backgroundRepeat: 'noRepeat',
        padding: '20px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '140px' // Increased paddingTop to account for header height
    };

    return (
        <div style={containerStyle}>
            <StockManagerHeader /> {/* Include the Header at the top */}

        <div className='container30'>
            <form onSubmit={sendData}>
                <h1>Add New Stock Item</h1>
                <div className="form-group30">
                    <label htmlFor="itemName">Item Name</label>
                    <input type="text" className="form-control" id="itemName" value={itemName} placeholder="Enter Item Name" onChange={(e) => setItemName(e.target.value)} />
                    {errors.itemName && <div className="text-danger">{errors.itemName}</div>}
                </div>

                <div className="form-group30">
                    <label htmlFor="category">Category</label>
                    <select className="form-control" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Select a category</option>
                        <option value="Food">Food</option>
                        <option value="Beverages">Beverages</option>
                        <option value="Toiletries">Toiletries</option>
                        <option value="Event Supplies">Event Supplies</option>
                    </select>
                    {errors.category && <div className="text-danger">{errors.category}</div>}
                </div>

                <div className="form-group30">
                    <label htmlFor="subCategory">Sub Category</label>
                    <select className="form-control" id="subCategory" value={subCategory} onChange={(e) => setSubCategory(e.target.value)} disabled={!category}>
                        <option value="">Select a sub category</option>
                        {category && subCategories[category].map((sub, index) => (
                            <option key={index} value={sub}>{sub}</option>
                        ))}
                    </select>
                    {errors.subCategory && <div className="text-danger">{errors.subCategory}</div>}
                </div>

                <div className="form-group30">
                    <label htmlFor="quantity">Quantity</label>
                    <input type="number" className="form-control" id="quantity" value={quantity} placeholder="Enter Quantity" onChange={(e) => setQuantity(e.target.value)} />
                    {errors.quantity && <div className="text-danger">{errors.quantity}</div>}
                </div>

                <div className="form-group30">
                    <label htmlFor="unitPrice">Unit Price</label>
                    <input type="number" className="form-control" id="unitPrice" value={unitPrice} placeholder="Enter Unit Price" onChange={(e) => setUnitPrice(e.target.value)} />
                    {errors.unitPrice && <div className="text-danger">{errors.unitPrice}</div>}
                </div>

                <div className="form-group30">
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input type="date" className="form-control" id="expiryDate" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                    {errors.expiryDate && <div className="text-danger">{errors.expiryDate}</div>}
                </div>

                <div className="form-group30">
                    <label htmlFor="supplierName">Supplier Name</label>
                    <input type="text" className="form-control" id="supplierName" value={supplierName} placeholder="Enter Supplier Name" onChange={(e) => setSupplierName(e.target.value)} />
                    {errors.supplierName && <div className="text-danger">{errors.supplierName}</div>}
                </div>

                <div className="form-group30">
                    <label htmlFor="contactNumber">Contact Number</label>
                    <input type="text" className="form-control" id="contactNumber" value={contactNumber} placeholder="Enter Contact Number" onChange={(e) => setContactNumber(e.target.value)} />
                    {errors.contactNumber && <div className="text-danger">{errors.contactNumber}</div>}
                </div>

                <button type="submit" className="btn btn-primary">Create Stock</button>
            </form>
        </div>
        </div>
    );
}
