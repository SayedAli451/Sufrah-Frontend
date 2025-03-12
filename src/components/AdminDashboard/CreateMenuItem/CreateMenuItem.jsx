import { useState, useEffect } from "react"; // Import hooks for state and lifecycle management
import { fetchRestaurants, createMenuItem } from "../../services/menuService"; // Import service functions
import './CreateMenuItem.css'; // Import the CSS file

const CreateMenuItem = () => {
  const [restaurants, setRestaurants] = useState([]); // State for storing restaurants
  const [formData, setFormData] = useState({ // State for form data
    restaurant: "",
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [message, setMessage] = useState(""); // State for feedback messages

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const data = await fetchRestaurants(); // Fetch restaurants from service
        setRestaurants(data); // Update state with fetched restaurants
      } catch (err) {
        setMessage(err.message); // Set error message if fetching fails
      }
    };

    getRestaurants(); // Call the function to fetch restaurants
  }, []); // Run only on component mount

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Update the specific field in formData
  };

  const handleSubmit = async (e) => { // Handle form submission
    e.preventDefault(); // Prevent default form submission behavior
    if (!formData.category) { // Validate category selection
      setMessage("Please select a category.");
      return;
    }

    try {
      await createMenuItem(formData); // Create new menu item
      setMessage("Menu item added successfully!"); // Set success message
      setFormData({ // Reset form data
        restaurant: "",
        name: "",
        description: "",
        price: "",
        category: "",
      });
    } catch (err) {
      setMessage(err.message); // Set error message if creation fails
    }
  };

  return (
    <div className="create-menu-item-container">
      <h1 className="create-menu-header">Create Menu Item</h1>
      {message && <p className="message">{message}</p>} {/* Display feedback message */}
      <form onSubmit={handleSubmit} className="menu-form"> {/* Form for creating menu item */}
        <label>Restaurant:</label>
        <select
          name="restaurant"
          value={formData.restaurant} // Bind select value to state
          onChange={handleChange} // Handle select change
          required
          className="input-field"
        >
          <option value="">Select a restaurant</option>
          {restaurants.map((rest) => ( // Map through restaurants for options
            <option key={rest._id} value={rest._id}>
              {rest.name}
            </option>
          ))}
        </select>

        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name} // Bind input value to state
          onChange={handleChange} // Handle input change
          required
          className="input-field"
        />

        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={formData.description} // Bind input value to state
          onChange={handleChange} // Handle input change
          className="input-field"
        />

        <label>Price (BD):</label>
        <input
          type="number"
          name="price"
          value={formData.price} // Bind input value to state
          onChange={handleChange} // Handle input change
          required
          className="input-field"
        />

        <label>Category:</label>
        <select
          name="category"
          value={formData.category} // Bind select value to state
          onChange={handleChange} // Handle select change
          required
          className="input-field"
        >
          <option value="">Select a category</option>
          <option value="Appetizers">Appetizers</option>  
          <option value="Main Course">Main Course</option>
          <option value="Desserts">Desserts</option>
          <option value="Drinks">Drinks</option>
        </select>

        <button type="submit" className="submit-btn">Add Menu Item</button> {/* Submit button */}
      </form>
    </div>
  );
};

export default CreateMenuItem; // Export the CreateMenuItem component