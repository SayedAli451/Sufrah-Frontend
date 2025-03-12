import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from "../../services/authService"; // Import authentication service
import "./SigninForm.css"; // Import the CSS file for styling

const SigninForm = (props) => {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [message, setMessage] = useState([""]); // State for feedback messages
  const [formData, setFormData] = useState({
    username: "", // State for username
    password: "", // State for password
  });

  // Update the message state
  const updateMessage = (msg) => {
    setMessage(msg);
  };

  // Handle input changes
  const handleChange = (e) => {
    updateMessage(""); // Clear any previous messages
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Update form data
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const user = await authService.signin(formData); // Call signin service
      props.setUser(user); // Set the user in the parent component
      navigate("/"); // Navigate to home page after successful login
    } catch (err) {
      updateMessage(err.message); // Update message on error
    }
  };

  return (
    <main className="signin-container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="signin-form bg-white p-4 rounded shadow-sm w-100"
        style={{ maxWidth: "400px" }}
      >
        <h1 className="text-center mb-4">Log In</h1>
        {message && (
          <p className="error-message text-danger text-center">{message}</p> // Display error message
        )}
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label
              htmlFor="username"
              className="form-label d-flex align-items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-person me-2"
                viewBox="0 0 16 16"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
              </svg>
              Username:
            </label>
            <input
              type="text"
              autoComplete="off"
              id="username"
              value={formData.username}
              name="username"
              onChange={handleChange} // Update username on change
              className="form-control"
            />
          </div>
          <div className="form-group mb-3">
            <label
              htmlFor="password"
              className="form-label d-flex align-items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-lock me-2"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
              </svg>
              Password:
            </label>
            <input
              type="password"
              autoComplete="off"
              id="password"
              value={formData.password}
              name="password"
              onChange={handleChange} // Update password on change
              className="form-control"
            />
          </div>
          <div className="form-actions d-flex justify-content-between gap-2">
            <button type="submit" className="btn btn-primary flex-grow-1">
              Log In
            </button>
            <Link to="/" className="btn btn-secondary flex-grow-1">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SigninForm; // Export the SigninForm component