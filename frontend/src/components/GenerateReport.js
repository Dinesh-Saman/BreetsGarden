import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import StockManagerHeader from './StockManagerHeader';
import bgImage from './css_files/images/stock1.jpeg';

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement);

function GenerateReport() {
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchReportData();
    }, []);

    const fetchReportData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/stocks/reports');
            setReportData(response.data);
        } catch (error) {
            console.error('Error fetching report data:', error);
            setError('Failed to fetch report data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const generatePDFReport = () => {
        const doc = new jsPDF();
        doc.setFontSize(12);
        doc.text('Stock Report', 20, 10);

        // Create table data
        const tableData = reportData.map(item => [
            item.itemName,
            item.category,
            item.quantity,
            item.unitPrice,
            item.supplierName,
            item.contactNumber,
            item.expiryDate
        ]);

        // Add the table to the PDF
        doc.autoTable({
            head: [['Item Name', 'Category', 'Quantity', 'Unit Price', 'Supplier Name', 'Contact Number', 'Expiry Date']],
            body: tableData,
            startY: 20, // Start position for the table
            theme: 'grid', // You can change the theme if needed
        });

        doc.save('stock_report.pdf');
    };

    // Render bar and pie charts
    const renderCharts = () => (
        <div>
            <div>
                <h3>Stock Quantity Bar Chart</h3>
                <div className="chart-container" style={{ position: 'relative', width: '50%', height: '300px', margin: 'auto' }}>
                    <Bar
                        data={{
                            labels: reportData.map(item => item.itemName),
                            datasets: [{
                                label: 'Stock Quantity',
                                data: reportData.map(item => item.quantity),
                                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            }]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                        }}
                    />
                </div>
            </div>
            <div>
                <h3>Stock Categories Pie Chart</h3>
                <div className="chart-container" style={{ position: 'relative', width: '50%', height: '300px', margin: 'auto' }}>
                    <Pie
                        data={{
                            labels: reportData.map(item => item.category),
                            datasets: [{
                                label: 'Categories',
                                data: reportData.map(item => item.quantity),
                                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                            }]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                        }}
                    />
                </div>
            </div>
            <button onClick={generatePDFReport} style={{ marginTop: '20px' }}>Download PDF</button>
        </div>
    );

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

        <div style={containerStyle}>
            
        <div className='container30'>
            <h2>Stock Report</h2>
            {loading ? <p>Loading report data...</p> : error ? <p>{error}</p> : renderCharts()}
        </div>
        </div>
        </div>
    );
}

export default GenerateReport;
