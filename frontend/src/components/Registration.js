import React, { useState } from "react";
import "./Registration.css";
const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic form validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.mobileNumber ||
      !formData.password
    ) {
      setError("Please fill all fields");
      return;
    }

    // For demonstration purposes, logging the form data
    console.log(formData);

    // Send the form data to your backend API (This part is for later)
    // await axios.post('YOUR_BACKEND_API_URL', formData);

    setError("");
    alert("Registration successful! Redirecting to login...");
    // Redirect to login page
    // window.location.href = '/login'; // Example redirect
  };

  return (
    <div className="registration-container">
      <h2>Register with EQUIP9™️</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter First Name"
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter Last Name"
          />
        </div>
        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Enter Mobile Number"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Password"
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="submit-btn">
          Register
        </button>

        <div className="social-login">
          <button className="google-btn">Login with Google</button>
          <button className="facebook-btn">Login with Facebook</button>
          <button className="apple-btn">Login with Apple</button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
