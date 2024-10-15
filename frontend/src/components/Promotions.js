import React, { useState, useEffect } from "react";
import axios from "axios";

function Promotions() {
  const [promotions, setPromotions] = useState([]);
  const [promotionId, setPromotionId] = useState("");
  const [description, setDescription] = useState("");
  const [validUntil, setValidUntil] = useState("");

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const response = await axios.get("http://localhost:8080/promotion");
      setPromotions(response.data);
    } catch (err) {
      alert("Error fetching promotions: " + err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate if the selected date is in the past
    const currentDate = new Date();
    const selectedDate = new Date(validUntil);
    if (selectedDate < currentDate.setHours(0, 0, 0, 0)) {
      alert("Date invalid! Please pick a date in the future.");
      return;
    }

    const promotionData = { description, validUntil };
    try {
      if (promotionId) {
        // Update promotion
        await axios.put(`http://localhost:8080/promotion/update/${promotionId}`, promotionData);
        alert("Promotion updated successfully");
      } else {
        // Add new promotion
        await axios.post("http://localhost:8080/promotion/add", promotionData);
        alert("Promotion added successfully");
      }
      fetchPromotions();
      clearForm();
    } catch (err) {
      alert("Error saving promotion: " + err.message);
    }
  };

  const handleEdit = (promotion) => {
    setPromotionId(promotion._id);
    setDescription(promotion.description);
    setValidUntil(new Date(promotion.validUntil).toISOString().split("T")[0]);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/promotion/delete/${id}`);
      alert("Promotion deleted successfully");
      fetchPromotions();
    } catch (err) {
      alert("Error deleting promotion: " + err.message);
    }
  };

  const clearForm = () => {
    setPromotionId("");
    setDescription("");
    setValidUntil("");
  };

  return (
    <div className="container12">
      <h1>Promotions</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group12">
          <label htmlFor="Description">Description</label>
          <input
            type="text"
            className="form-control"
            id="Description"
            placeholder="Enter promotion description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group12">
          <label htmlFor="ValidUntil">Valid Until</label>
          <input
            type="date"
            className="form-control"
            id="ValidUntil"
            value={validUntil}
            onChange={(e) => setValidUntil(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {promotionId ? "Update Promotion" : "Add Promotion"}
        </button>
        <button type="button" className="btn btn-secondary ml-2" onClick={clearForm}>
          Clear
        </button>
      </form>

      <h1 className="mt-5">All Promotions</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Valid Until</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {promotions.map((promotion) => (
            <tr key={promotion._id}>
              <td>{promotion.description}</td>
              <td>{new Date(promotion.validUntil).toLocaleDateString()}</td>
              <td className="actions">
                <button className="btn btn-info" onClick={() => handleEdit(promotion)}>
                  Edit
                </button>
                <button className="btn btn-danger ml-2" onClick={() => handleDelete(promotion._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .container12 {
          background-color: #E3E9EC;
          padding: 20px;
        }
        .form-group12 {
          margin-bottom: 20px;
        }
        .table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        .table th, .table td {
          border: 1px solid #ddd;
          padding: 8px;
        }
        .actions {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .btn {
          margin-left: 5px;
        }
      `}</style>
    </div>
  );
}

export default Promotions;
