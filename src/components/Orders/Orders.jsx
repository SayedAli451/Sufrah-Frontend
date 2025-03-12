import { useState, useEffect } from "react"; // Import hooks for state and lifecycle management
import { fetchUserOrders } from "../../services/orderService"; // Import function to fetch user orders
import "./Orders.css"; // Import the CSS file for Orders component
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Modal, Button } from "react-bootstrap"; // Import Bootstrap Modal and Button

const Orders = () => {
  const [orders, setOrders] = useState([]); // State for storing orders
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error messages

  // Modal State
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [selectedOrder, setSelectedOrder] = useState(null); // State for the currently selected order

  useEffect(() => {
    fetchUserOrders(setOrders, setLoading, setError); // Fetch user orders on component mount
  }, []);

  // Open modal with selected order details
  const handleOpenModal = (order) => {
    setSelectedOrder(order); // Set the selected order
    setShowModal(true); // Show modal
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false); // Hide modal
    setSelectedOrder(null); // Clear selected order
  };

  // Render loading state
  if (loading) return <p>Loading your orders...</p>;
  // Render error state
  if (error) return <p>Error: {error}</p>;
  // Render empty state if no orders
  if (orders.length === 0) return <p>You have no orders yet.</p>;

  return (
    <div className="orders-container">
      <h1 className="orders-title">Your Orders</h1>
      <ul className="orders-list">
        {orders.map((order, index) => (
          <li key={index} className="order-item" onClick={() => handleOpenModal(order)} style={{ cursor: "pointer" }}>
            {/* Safely check if restaurant exists */}
            <h3 className="order-restaurant">
              Order from {order.restaurant?.name || "Unknown Restaurant"}
            </h3>
            <p className="order-status"><strong>Status:</strong> {order.status}</p>
            <p className="order-total">
              <strong>Total Price:</strong> {order.totalPrice ? order.totalPrice.toFixed(3) : "0.000"} BD
            </p>
          </li>
        ))}
      </ul>

      {/* Bootstrap Modal for Order Details */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <>
              <h5>Order from: {selectedOrder.restaurant?.name || "Unknown Restaurant"}</h5>
              <p><strong>Status:</strong> {selectedOrder.status}</p>

              <h6>Items:</h6>
              <ul>
                {Array.isArray(selectedOrder.items) ? (
                  selectedOrder.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      {item.menuItem?.name || "Unknown Item"} x{item.quantity} ={" "}
                      {(item.menuItem?.price ? (item.menuItem.price * item.quantity).toFixed(3) : "0.000")} BD
                    </li>
                  ))
                ) : (
                  <p>No items in this order.</p>
                )}
              </ul>

              <p><strong>Total Price:</strong> {selectedOrder.totalPrice ? selectedOrder.totalPrice.toFixed(3) : "0.000"} BD</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button> {/* Close button */}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Orders; // Export the Orders component