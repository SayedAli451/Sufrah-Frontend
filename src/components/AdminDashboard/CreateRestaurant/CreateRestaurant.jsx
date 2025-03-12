import { useState } from "react"; // Import useState hook for managing state
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { createRestaurant } from "../../../services/restaurantService"; // Import restaurant service function
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./CreateRestaurant.css"; // Optional: For additional custom styles

const CreateRestaurant = () => {
  const [formData, setFormData] = useState({ // State to hold form data
    name: "",
    description: "",
    location: "",
    openingHours: "",
    image: "", // Image field for restaurant
  });

  const navigate = useNavigate(); // Initialize navigation function

  const handleChange = (e) => { // Handle input changes
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Update the specific field in formData
  };

  const handleSubmit = async (e) => { // Handle form submission
    e.preventDefault(); // Prevent default form submission behavior
    try {
      await createRestaurant(formData); // Call service to create the restaurant
      navigate("/admin"); // Redirect to admin dashboard after successful creation
    } catch (err) {
      console.error("Error creating restaurant:", err); // Log any errors
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Create a New Restaurant</h1>
      <form onSubmit={handleSubmit} className="card p-4 shadow"> {/* Form for restaurant creation */}
        <div className="mb-3">
          <input
            type="text"
            name="name"
            placeholder="Restaurant Name"
            value={formData.name} // Bind input value to state
            onChange={handleChange} // Handle input change
            required
            className="form-control" // Bootstrap styling
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description} // Bind input value to state
            onChange={handleChange} // Handle input change
            required
            className="form-control" // Bootstrap styling
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location} // Bind input value to state
            onChange={handleChange} // Handle input change
            required
            className="form-control" // Bootstrap styling
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="openingHours"
            placeholder="Opening Hours"
            value={formData.openingHours} // Bind input value to state
            onChange={handleChange} // Handle input change
            required
            className="form-control" // Bootstrap styling
          />
        </div>

        {/* Image URL Input Field */}
        <div className="mb-3">
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image} // Bind input value to state
            onChange={handleChange} // Handle input change
            required
            className="form-control" // Bootstrap styling
          />
        </div>

        <button type="submit" className="btn btn-primary w-100"> {/* Submit button */}
          Create Restaurant
        </button>
      </form>
    </div>
  );
};

export default CreateRestaurant; // Export the CreateRestaurant component