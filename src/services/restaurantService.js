const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL; // Get backend URL from environment variables

// Fetch details of a specific restaurant by ID
const fetchRestaurantDetails = async (id) => {
  try {
    const res = await fetch(`${BACKEND_URL}/restaurants/${id}`); // Send GET request to fetch restaurant details
    const data = await res.json(); // Parse response JSON
    if (!res.ok) throw new Error(data.error || "Failed to fetch restaurant details"); // Check for errors
    return data; // Return fetched restaurant details
  } catch (err) {
    throw new Error(err.message); // Handle errors
  }
};

// Fetch all restaurants for the admin
const fetchAdminRestaurants = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/restaurants/admin`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include authorization token
      },
    });

    if (!res.ok) throw new Error("Failed to fetch restaurants"); // Check for errors
    return await res.json(); // Return fetched data
  } catch (err) {
    throw new Error(err.message); // Handle errors
  }
};

// Create a new restaurant
const createRestaurant = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/restaurants`, {
      method: "POST", // Set request method to POST
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include authorization token
      },
      body: JSON.stringify(formData), // Send form data as JSON
    });

    if (!res.ok) throw new Error("Failed to create restaurant"); // Check for errors
    return await res.json(); // Return created restaurant data
  } catch (err) {
    throw new Error(err.message); // Handle errors
  }
};

export { fetchRestaurantDetails, fetchAdminRestaurants, createRestaurant }; // Export functions for use in other modules