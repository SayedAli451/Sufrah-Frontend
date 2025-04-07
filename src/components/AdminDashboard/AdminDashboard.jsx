import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchAdminRestaurants,
  fetchAdminOrders,
  deleteRestaurant,
} from "../../services/adminService";
import "./AdminDashboard.css"; // Import custom CSS file for styles

const AdminDashboard = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [restaurantToDelete, setRestaurantToDelete] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const fetchedRestaurants = await fetchAdminRestaurants();
      const fetchedOrders = await fetchAdminOrders();
      setRestaurants(fetchedRestaurants);
      setOrders(fetchedOrders);
    };

    loadData();
  }, []);

  const handleOpenModal = (restaurantId) => {
    setRestaurantToDelete(restaurantId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setRestaurantToDelete(null);
    setShowModal(false);
  };

  const handleDeleteRestaurant = async () => {
    try {
      await deleteRestaurant(restaurantToDelete);
      setRestaurants((prevRestaurants) =>
        prevRestaurants.filter((restaurant) => restaurant._id !== restaurantToDelete)
      );
      handleCloseModal();
    } catch (err) {
      console.error("Error deleting restaurant:", err);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1 className="admin-dashboard__title text-center">Admin Dashboard</h1>

      <h2 className="admin-dashboard__section-title">Manage Restaurants</h2>
      <Link to="/admin/create-restaurant">
        <button className="btn btn-success mb-4">Create New Restaurant</button>
      </Link>

      {restaurants.length > 0 ? (
        <div className="row">
          {restaurants.map((restaurant) => (
            <div key={restaurant._id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">{restaurant.name}</h3>
                  <div className="d-flex justify-content-between">
                    <Link
                      className="btn btn-primary"
                      to={`/admin/restaurant/${restaurant._id}/menu`}
                    >
                      Manage Menu
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleOpenModal(restaurant._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="admin-dashboard__no-data text-center">No restaurants available.</p>
      )}

      <h2 className="admin-dashboard__section-title">Manage Orders</h2>
      {orders.length > 0 ? (
        <ul className="list-group">
          {orders.map((order) => (
            <li key={order._id} className="list-group-item d-flex justify-content-between align-items-center">
              <p className="mb-0">
                Order from {order.restaurant?.name || "Unknown"} - {order.status}
              </p>
              <Link
                className="btn btn-primary"
                to={`/admin/order/${order._id}`}
              >
                View Order
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="admin-dashboard__no-data text-center">No orders available.</p>
      )}

      {/* Bootstrap Modal for delete confirmation */}
      {showModal && (
        <div className="modal show" tabIndex="-1" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Confirmation</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this restaurant?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger" onClick={handleDeleteRestaurant}>
                  Yes, Delete
                </button>
                <button className="btn btn-secondary" onClick={handleCloseModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
