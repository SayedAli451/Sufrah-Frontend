const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL; // Get backend URL from environment variables

// Fetch notifications
const fetchNotifications = async (setNotifications, setLoading, setError) => {
  try {
    const res = await fetch(`${BACKEND_URL}/notifications`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include authorization token
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch notifications"); // Check for errors
    }

    const data = await res.json(); // Parse response JSON
    setNotifications(data); // Update notifications state
  } catch (err) {
    setError(err.message); // Set error state on failure
  } finally {
    setLoading(false); // Set loading to false regardless of success or error
  }
};

// Mark notification as read
const markAsRead = async (id, setNotifications) => {
  try {
    const res = await fetch(`${BACKEND_URL}/notifications/${id}/read`, {
      method: "PUT", // Set request method to PUT
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include authorization token
      },
    });

    if (!res.ok) {
      throw new Error("Failed to update notification status"); // Check for errors
    }

    // Update state to mark notification as read
    setNotifications((prev) =>
      prev.map((notif) =>
        notif._id === id ? { ...notif, read: true } : notif // Update notification status in state
      )
    );
  } catch (err) {
    console.error("Error marking notification as read:", err); // Log any errors
  }
};

export { fetchNotifications, markAsRead }; // Export functions for use in other modules