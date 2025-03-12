import { useState, useEffect } from "react"; // Import hooks for state and lifecycle management
import { useParams, useNavigate } from "react-router-dom"; // Import hooks for URL parameters and navigation
import {
  fetchOrderById,
  updateOrderStatus,
} from "../../../services/orderService"; // Import order service functions
import "./ManageOrders.css"; // Import CSS for styling

const ManageOrders = () => {
  const { id } = useParams(); // Get order ID from URL parameters
  const navigate = useNavigate(); // Initialize navigation function
  const [order, setOrder] = useState(null); // State for storing order details

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const fetchedOrder = await fetchOrderById(id); // Fetch order details by ID
        setOrder(fetchedOrder); // Update state with fetched order
      } catch (err) {
        console.error("Error loading order:", err); // Log any errors
      }
    };
    loadOrder(); // Call loadOrder function
  }, [id]); // Run effect when ID changes

  const handleStatusUpdate = async (status) => {
    try {
      await updateOrderStatus(id, status); // Update order status
      navigate("/admin"); // Redirect to admin dashboard after update
    } catch (err) {
      console.error("Error updating order status:", err); // Log any errors
    }
  };

  if (!order) { // Render loading state if order is not yet fetched
    return (
      <div className="text-center mt-5">
        <p className="text-muted">Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Manage Order</h1>
      <div className="card p-4 shadow">
        <div className="mb-3">
          <p className="mb-1">
            <strong>Restaurant:</strong> {order.restaurant?.name} {/* Display restaurant name */}
          </p>
          <p className="mb-0">
            <strong>Status:</strong> {order.status} {/* Display current order status */}
          </p>
        </div>

        <div className="d-flex justify-content-center gap-3 mt-4">
          {/* Buttons to update order status */}
          <button
            onClick={() => handleStatusUpdate("Being Made")}
            className="btn btn-warning btn-lg"
          >
            Start Cooking
          </button>
          <button
            onClick={() => handleStatusUpdate("Ready")}
            className="btn btn-success btn-lg"
          >
            Order Ready
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageOrders; // Export the ManageOrders component