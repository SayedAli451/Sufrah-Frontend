import { useState, useEffect } from "react"; // Import hooks for state and lifecycle management
import { useParams } from "react-router-dom"; // Import hook for URL parameters
import {
  fetchMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../../../services/menuService"; // Import menu service functions
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./ManageMenu.css"; // Optional: For additional custom styles

const ManageMenu = () => {
  const { id } = useParams(); // Get restaurant ID from URL parameters
  const [menuItems, setMenuItems] = useState([]); // State for menu items
  const [newItem, setNewItem] = useState({ // State for new menu item
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [editingItem, setEditingItem] = useState(null); // State for item being edited
  const [error, setError] = useState(null); // State for error messages

  useEffect(() => {
    loadMenuItems(); // Load menu items on component mount
  }, []);

  const loadMenuItems = async () => {
    try {
      const data = await fetchMenuItems(id); // Fetch menu items from service
      setMenuItems(data); // Update state with fetched menu items
    } catch (err) {
      setError(err.message); // Set error message if fetch fails
    }
  };

  const handleChange = (e) => { // Handle input changes for new or editing item
    if (editingItem) {
      setEditingItem({ ...editingItem, [e.target.name]: e.target.value });
    } else {
      setNewItem({ ...newItem, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!newItem.category) { // Validate category selection
      setError("Please select a category.");
      return;
    }

    try {
      const addedItem = await addMenuItem(newItem, id); // Add new menu item
      setMenuItems([...menuItems, addedItem]); // Update state with new item
      setNewItem({ name: "", description: "", price: "", category: "" }); // Reset new item form
    } catch (err) {
      setError(err.message); // Set error message if adding fails
    }
  };

  const handleEditClick = (item) => {
    setEditingItem(item); // Set the item to be edited
  };

  const handleSaveEdit = async () => {
    if (!editingItem.category) { // Validate category selection
      setError("Please select a category.");
      return;
    }

    try {
      const updatedItem = await updateMenuItem(editingItem); // Update the menu item
      setMenuItems(menuItems.map((item) => (item._id === updatedItem._id ? updatedItem : item))); // Update state with updated item
      setEditingItem(null); // Clear editing state
    } catch (err) {
      setError(err.message); // Set error message if updating fails
    }
  };

  const handleDelete = async (itemId) => { // Handle menu item deletion
    try {
      await deleteMenuItem(itemId); // Delete the item
      setMenuItems(menuItems.filter((item) => item._id !== itemId)); // Update state to remove deleted item
    } catch (err) {
      setError(err.message); // Set error message if deletion fails
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Manage Menu</h1>

      {error && (
        <div className="alert alert-danger text-center">{error}</div> // Display error message if present
      )}

      <div className="card p-4 shadow mb-5">
        <h2 className="text-center mb-3">
          {editingItem ? "Edit Menu Item" : "Add Menu Item"} {/* Conditional heading */}
        </h2>
        <form onSubmit={editingItem ? handleSaveEdit : handleSubmit}> {/* Conditional form submission */}
          <div className="mb-3">
            <input
              type="text"
              name="name"
              placeholder="Item Name"
              value={editingItem ? editingItem.name : newItem.name} // Set input value based on state
              onChange={handleChange} // Handle input change
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={editingItem ? editingItem.description : newItem.description} // Set input value based on state
              onChange={handleChange} // Handle input change
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              name="price"
              placeholder="Price (BD)"
              value={editingItem ? editingItem.price : newItem.price} // Set input value based on state
              onChange={handleChange} // Handle input change
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <select
              name="category"
              value={editingItem ? editingItem.category : newItem.category} // Set select value based on state
              onChange={handleChange} // Handle select change
              className="form-select"
            >
              <option value="">Select Category</option> {/* Default option */}
              <option value="Appetizers">Appetizers</option>
              <option value="Main Course">Main Course</option>
              <option value="Desserts">Desserts</option>
              <option value="Drinks">Drinks</option>
            </select>
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              {editingItem ? "Save Changes" : "Add Item"} {/* Conditional button text */}
            </button>
            {editingItem && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setEditingItem(null)} // Clear editing state
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <h2 className="text-center mb-3">Current Menu</h2>
      {menuItems.length === 0 ? (
        <p className="text-center">No menu items available.</p> // Message if no items
      ) : (
        <ul className="list-group">
          {menuItems.map((item) => (
            <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{item.name}</strong> - {item.price} BD {/* Display menu item details */}
              </div>
              <div>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEditClick(item)} // Set item to be edited
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(item._id)} // Delete item
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageMenu; // Export the ManageMenu component