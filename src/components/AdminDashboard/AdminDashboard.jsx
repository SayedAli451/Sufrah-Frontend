import { useEffect, useState } from "react"; // Import hooks for state and lifecycle management
import { Link } from "react-router-dom"; // Import Link for navigation
import {
  fetchAdminRestaurants,
  fetchAdminOrders,
} from "../../services/adminService"; // Import admin service functions
import "./AdminDashboard.css"; // Import the CSS file for styles

const AdminDashboard = () => {
  const [restaurants, setRestaurants] = useState([]); // State for storing restaurants
  const [orders, setOrders] = useState([]); // State for storing orders

  useEffect(() => {
    const loadData = async () => {
      const fetchedRestaurants = await fetchAdminRestaurants(); // Fetch restaurants for admin
      const fetchedOrders = await fetchAdminOrders(); // Fetch orders for admin
      setRestaurants(fetchedRestaurants); // Update restaurants state
      setOrders(fetchedOrders); // Update orders state
    };

    loadData(); // Call loadData function
  }, []); // Run only on component mount

  return (
    <div className="admin-dashboard">
      <h1 className="admin-dashboard__title">Admin Dashboard</h1>

      <h2 className="admin-dashboard__section-title">Manage Restaurants</h2>
      <Link to="/admin/create-restaurant">
        <button className="admin-dashboard__btn">Create New Restaurant</button> {/* Button to create a new restaurant */}
      </Link>

      {restaurants.length > 0 ? ( // Check if there are restaurants to display
        <ul className="admin-dashboard__list">
          {restaurants.map((restaurant) => (
            <li
              key={restaurant._id} // Unique key for each restaurant
              className="admin-dashboard__list-item d-flex justify-content-between align-items-center"
            >
              <h3 className="admin-dashboard__restaurant-name mb-0">
                {restaurant.name} {/* Display restaurant name */}
              </h3>
              <Link
                className="btn btn-primary admin-dashboard__link"
                to={`/admin/restaurant/${restaurant._id}/menu`}
              >
                Manage Menu {/* Link to manage restaurant menu */}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="admin-dashboard__no-data">No restaurants available.</p> // Message if no restaurants
      )}

      <h2 className="admin-dashboard__section-title">Manage Orders</h2>
      {orders.length > 0 ? ( // Check if there are orders to display
        <ul className="admin-dashboard__list">
          {orders.map((order) => (
            <li
              key={order._id} // Unique key for each order
              className="admin-dashboard__list-item d-flex justify-content-between align-items-center"
            >
              <p className="admin-dashboard__order-details mb-0">
                Order from {order.restaurant?.name || "Unknown"} -{" "}
                {order.status} {/* Display order details */}
              </p>
              <Link
                className="btn btn-primary admin-dashboard__link"
                to={`/admin/order/${order._id}`}
              >
                View Order {/* Link to view order details */}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="admin-dashboard__no-data">No orders available.</p> // Message if no orders
      )}
    </div>
  );
};

export default AdminDashboard; // Export the AdminDashboard component