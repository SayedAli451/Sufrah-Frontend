const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL; // Get backend URL from environment variables

// Fetch admin-owned restaurants
const fetchAdminRestaurants = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/restaurants/admin`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include authorization token
      },
    });

    if (!res.ok) throw new Error("Failed to fetch restaurants"); // Check for response status

    return await res.json(); // Return parsed JSON data
  } catch (err) {
    console.error("Error fetching restaurants:", err); // Log errors
    return []; // Return an empty array on error
  }
};

// Fetch all orders for admin
const fetchAdminOrders = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include authorization token
      },
    });

    if (!res.ok) throw new Error("Failed to fetch orders"); // Check for response status

    return await res.json(); // Return parsed JSON data
  } catch (err) {
    console.error("Error fetching orders:", err); // Log errors
    return []; // Return an empty array on error
  }
};

// Delete a restaurant by ID (Admin only)
const deleteRestaurant = async (restaurantId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/restaurants/${restaurantId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include authorization token
      },
    });

    if (!res.ok) throw new Error("Failed to delete restaurant"); // Check for response status

    return await res.json(); // Return confirmation of deletion
  } catch (err) {
    console.error("Error deleting restaurant:", err); // Log errors
    return { error: "Failed to delete restaurant" }; // Return an error message
  }
};

// Fetch a single restaurant's details by ID
const fetchRestaurantById = async (restaurantId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/restaurants/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include authorization token
      },
    });

    if (!res.ok) throw new Error("Failed to fetch restaurant details"); // Check for response status

    return await res.json(); // Return restaurant details
  } catch (err) {
    console.error("Error fetching restaurant details:", err); // Log errors
    return null; // Return null on error
  }
};

export { fetchAdminRestaurants, fetchAdminOrders, deleteRestaurant, fetchRestaurantById }; // Export functions for use in other modules
