const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL; // Get backend URL from environment variables

// Fetch all restaurants
const fetchRestaurants = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/restaurants`); // Send GET request to fetch restaurants
    const data = await res.json(); // Parse response JSON
    if (!res.ok) throw new Error(data.error || "Failed to fetch restaurants"); // Check for errors
    return data; // Return fetched data
  } catch (err) {
    throw new Error(err.message); // Handle errors
  }
};

// Fetch all menu items for a restaurant
const fetchMenuItems = async (restaurantId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/menuItems/restaurant/${restaurantId}`); // Send GET request for menu items
    const data = await res.json(); // Parse response JSON
    if (!res.ok) throw new Error(data.error || "Failed to fetch menu items"); // Check for errors
    return data; // Return fetched data
  } catch (err) {
    throw new Error(err.message); // Handle errors
  }
};

// Add a new menu item to a restaurant
const addMenuItem = async (newItem, restaurantId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/menuItems`, {
      method: "POST", // Set request method to POST
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include authorization token
      },
      body: JSON.stringify({ ...newItem, restaurant: restaurantId }), // Send new item data as JSON
    });

    const data = await res.json(); // Parse response JSON
    if (!res.ok) throw new Error(data.error || "Failed to add menu item"); // Check for errors
    return data; // Return added item data
  } catch (err) {
    throw new Error(err.message); // Handle errors
  }
};

// Update an existing menu item
const updateMenuItem = async (editingItem) => {
  try {
    const res = await fetch(`${BACKEND_URL}/menuItems/${editingItem._id}`, {
      method: "PUT", // Set request method to PUT
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include authorization token
      },
      body: JSON.stringify(editingItem), // Send the updated item data as JSON
    });

    const data = await res.json(); // Parse response JSON
    if (!res.ok) throw new Error(data.error || "Failed to update menu item"); // Check for errors
    return data; // Return updated item data
  } catch (err) {
    throw new Error(err.message); // Handle errors
  }
};

// Delete a menu item
const deleteMenuItem = async (itemId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/menuItems/${itemId}`, {
      method: "DELETE", // Set request method to DELETE
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include authorization token
      },
    });

    if (!res.ok) throw new Error("Failed to delete menu item"); // Check for errors
  } catch (err) {
    throw new Error(err.message); // Handle errors
  }
};

export { fetchRestaurants, fetchMenuItems, addMenuItem, updateMenuItem, deleteMenuItem }; // Export functions for use in other modules