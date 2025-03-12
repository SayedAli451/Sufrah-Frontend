import "./Cart.css"; // Import CSS for styling
import { useState, useEffect } from "react"; // Import hooks for state and lifecycle management
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  getCart,
  checkout,
} from "../../services/cartService"; // Import cart service functions
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Modal, Button } from "react-bootstrap"; // Import Bootstrap Modal and Button

const Cart = ({ handleModal }) => { // Accept handleModal as a prop for showing messages
  const [cartItems, setCartItems] = useState([]); // State for cart items
  const [totalPrice, setTotalPrice] = useState(0); // State for total price

  // Modal State
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  useEffect(() => {
    const cart = getCart(); // Fetch cart items from service
    setCartItems(cart); // Set cart items state
  }, []);

  useEffect(() => {
    // Calculate total price whenever cartItems change
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total.toFixed(3)); // Update total price state
  }, [cartItems]);

  const handleCheckout = () => {
    setShowModal(true); // Open modal on checkout click
  };

  const confirmCheckout = () => {
    checkout(cartItems, setCartItems, setTotalPrice); // Perform checkout
    setShowModal(false); // Close modal after confirming checkout
  };

  const handleIncreaseQuantity = (itemId) => {
    const updatedCart = increaseQuantity(itemId); // Increase item quantity
    if (updatedCart) {
      setCartItems(updatedCart); // Update cart items state
    }
  };

  const handleDecreaseQuantity = (itemId) => {
    const updatedCart = decreaseQuantity(itemId); // Decrease item quantity
    if (updatedCart) {
      setCartItems(updatedCart); // Update cart items state
    }
  };

  const handleRemoveFromCart = (itemId) => {
    const updatedCart = removeFromCart(itemId); // Remove item from cart
    if (updatedCart) {
      setCartItems(updatedCart); // Update cart items state
    } else {
      handleModal("This item could not be removed from the cart."); // Show error message if removal fails
    }
  };

  return (
    <div className="cart-container">
      <h1 className="cart-header">Your Cart</h1>
      {cartItems.length === 0 ? ( // Render empty cart message if no items
        <p className="empty-cart-message">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-items-list">
            {cartItems.map((item) => (
              <li key={item._id} className="cart-item">
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>{item.price} BD</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <div className="item-actions">
                  <button className="btn-action" onClick={() => handleIncreaseQuantity(item._id)}>+</button>
                  <button className="btn-action" onClick={() => handleDecreaseQuantity(item._id)}>-</button>
                  <button className="btn-remove" onClick={() => handleRemoveFromCart(item._id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="total-section">
            <h2>Total: {totalPrice} BD</h2>
            <button className="btn-checkout" onClick={handleCheckout}>Checkout</button> {/* Checkout button */}
          </div>
        </>
      )}

      {/* Bootstrap Modal for Checkout Confirmation */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header>
          <Modal.Title>Confirm Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to checkout? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button> {/* Cancel button */}
          <Button variant="primary" onClick={confirmCheckout}>Confirm</Button> {/* Confirm button */}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cart; // Export the Cart component