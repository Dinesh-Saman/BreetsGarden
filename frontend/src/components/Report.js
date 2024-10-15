import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './css_files/DayoutDashboard.css';
import jsPDF from "jspdf";
import "jspdf-autotable"; // To make tables in PDFs
import Swal from 'sweetalert2';  // Import SweetAlert2
import bgImage from './css_files/images/back9.jpeg';
import ServiceManagerHeader from "./ServiceManagerHeader";

export default function Report() {
  const [activities, setActivities] = useState([]);
  const [packages, setPackages] = useState([]);
  const [spaServices, setSpaServices] = useState([]);

  useEffect(() => {
    // Fetching activities
    function getActivities() {
      axios
        .get("http://localhost:8080/activities")
        .then((res) => {
          setActivities(res.data);
        })
        .catch((err) => {
          Swal.fire({
            title: 'Error!',
            text: err.message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    }

    // Fetching day-out packages
    function getPackages() {
      axios
        .get("http://localhost:8080/dayout")
        .then((res) => {
          setPackages(res.data);
        })
        .catch((err) => {
          Swal.fire({
            title: 'Error!',
            text: err.message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    }

    // Fetching spa services
    function getSpaServices() {
      axios
        .get("http://localhost:8080/spa")
        .then((res) => {
          setSpaServices(res.data);
        })
        .catch((err) => {
          Swal.fire({
            title: 'Error!',
            text: err.message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    }

    getActivities();
    getPackages();
    getSpaServices();
  }, []);

  // Function to generate a PDF report
  const generateReport = () => {
    const doc = new jsPDF();

    doc.text("Comprehensive Report: Activities, Dayout Packages, and Spa Services", 14, 16);

    // Activities Section
    doc.text("Activities", 14, 26);
    doc.autoTable({
      head: [["Activity Name", "Opening Hrs", "Closing Hrs", "Price(LKR)"]],
      body: activities.map((act) => [
        act.activityName,
        act.openingHrs,
        act.closingHrs,
        act.price,
      ]),
      startY: 30,
    });

    // Day-out Packages Section
    const startAfterActivities = doc.lastAutoTable.finalY + 10; // Start after activities table
    doc.text("Day-out Packages", 14, startAfterActivities);
    doc.autoTable({
      head: [["Title", "Validity", "Duration", "Price(LKR)", "Package Type", "Category"]],
      body: packages.map((pkg) => [
        pkg.title,
        pkg.validity,
        pkg.duration,
        pkg.price,
        pkg.packageType,
        pkg.category,
      ]),
      startY: startAfterActivities + 5,
    });

    // Spa Services Section
    const startAfterPackages = doc.lastAutoTable.finalY + 10; // Start after packages table
    doc.text("Spa Services", 14, startAfterPackages);
    doc.autoTable({
      head: [["Service Name", "Service Type", "Duration", "Price(LKR)", "Availability"]],
      body: spaServices.map((srv) => [
        srv.serviceName,
        srv.serviceType,
        srv.duration,
        srv.price,
        srv.availability,
      ]),
      startY: startAfterPackages + 5,
    });

    // Save the PDF
    doc.save("comprehensive-report.pdf");

    // Show success alert
    Swal.fire({ 
      title: 'Success!',
      text: 'Report generated successfully!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

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
    <ServiceManagerHeader /> {/* Include the Header at the top */}

    <div className="container2">
      

      <h3>Comprehensive Details</h3>

      {/* Display Activities */}
      <h4>Activities</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Activity Name</th>
            <th>Opening Hrs</th>
            <th>Closing Hrs</th>
            <th>Price(LKR)</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((act) => (
            <tr key={act.id}>
              <td>{act.activityName}</td>
              <td>{act.openingHrs}</td>
              <td>{act.closingHrs}</td>
              <td>{act.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display Day-out Packages */}
      <h4>Day-out Packages</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Validity</th>
            <th>Duration</th>
            <th>Price(LKR)</th>
            <th>Package Type</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg) => (
            <tr key={pkg.id}>
              <td>{pkg.title}</td>
              <td>{pkg.validity}</td>
              <td>{pkg.duration}</td>
              <td>{pkg.price}</td>
              <td>{pkg.packageType}</td>
              <td>{pkg.category}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display Spa Services */}
      <h4>Spa Services</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Service Name</th>
            <th>Service Type</th>
            <th>Duration</th>
            <th>Price(LKR)</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          {spaServices.map((srv) => (
            <tr key={srv.id}>
              <td>{srv.serviceName}</td>
              <td>{srv.serviceType}</td>
              <td>{srv.duration}</td>
              <td>{srv.price}</td>
              <td>{srv.availability}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Report Generation Button */}
      <button onClick={generateReport} className="btn btn-primary mb-3">
        Download Report
      </button>
    </div>
    </div>
  );
}
