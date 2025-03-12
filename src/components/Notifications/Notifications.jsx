import { useState, useEffect } from "react"; // Import hooks for state and lifecycle management
import { fetchNotifications, markAsRead } from "../../services/notificationService"; // Import functions for fetching and marking notifications
import './Notifications.css'; // Import CSS for styling

const Notifications = () => {
  const [notifications, setNotifications] = useState([]); // State for storing notifications
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error messages

  // Fetch notifications on component mount
  useEffect(() => {
    fetchNotifications(setNotifications, setLoading, setError);
  }, []);

  // Mark notification as read
  const handleMarkAsRead = async (id) => {
    await markAsRead(id, setNotifications); // Call service to mark notification as read
  };

  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([]); // Reset notifications state
  };

  // Render loading state
  if (loading) return <p className="loading">Loading notifications...</p>;
  // Render error state
  if (error) return <p className="error">Error: {error}</p>;
  // Render empty state if no notifications
  if (notifications.length === 0) return <p className="no-notifications">No new notifications.</p>;

  return (
    <div className="notifications-container">
      <h1>Your Notifications</h1>
      <button className="clear-btn" onClick={clearNotifications}>Clear Notifications</button> {/* Button to clear notifications */}
      <ul>
        {notifications.map((notif) => (
          <li
            key={notif._id} // Unique key for each notification
            className={`notification-item ${notif.read ? "read" : "unread"}`} // Conditional class for read/unread state
            onClick={() => handleMarkAsRead(notif._id)} // Mark notification as read on click
          >
            {notif.message} {!notif.read && <strong> (New)</strong>} {/* Display notification message and "New" label if unread */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications; // Export the Notifications component