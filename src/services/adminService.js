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

export { fetchAdminRestaurants, fetchAdminOrders }; // Export functions for use in other modules

//! CODE GRAVEYARD

// // Fetch all restaurants
// const fetchRestaurants = async () => {
//   try {
//     const res = await fetch(`${BACKEND_URL}/restaurants`); // Fetch all restaurants
//     const data = await res.json(); // Parse response data
//     setRestaurants(data); // Set state with fetched data
//   } catch (err) {
//     console.error("Error fetching restaurants:", err); // Log errors
//   }
// };