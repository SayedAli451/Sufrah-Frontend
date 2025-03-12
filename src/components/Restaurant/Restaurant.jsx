import { useState, useEffect, useContext } from "react"; // Import hooks for state and lifecycle management
import { useParams } from "react-router-dom"; // Import useParams for URL parameters
import { fetchRestaurantDetails } from "../../services/restaurantService"; // Import function to fetch restaurant details
import { fetchMenuItems } from "../../services/menuService"; // Import function to fetch menu items
import { addToCart } from "../../services/cartService"; // Import function to add items to cart
import { AuthedUserContext } from "../../App"; // Import context for authenticated user
import "./Restaurant.css"; // Import the CSS file for styling
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Modal, Button } from "react-bootstrap"; // Import Bootstrap Modal and Button

const Restaurant = () => {
  const { id } = useParams(); // Get restaurant ID from URL
  const user = useContext(AuthedUserContext); // Get authenticated user from context
  const [restaurant, setRestaurant] = useState(null); // State for restaurant details
  const [menuItems, setMenuItems] = useState([]); // State for menu items
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error messages

  // Bootstrap Modal State
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [modalMessage, setModalMessage] = useState(""); // State for modal message

  // Show Modal
  const handleModal = (message) => {
    setModalMessage(message); // Set message for modal
    setShowModal(true); // Show modal
  };

  // Close Modal
  const closeModal = () => setShowModal(false); // Hide modal

  useEffect(() => {
    const loadRestaurantDetails = async () => {
      try {
        const data = await fetchRestaurantDetails(id); // Fetch restaurant details
        setRestaurant(data); // Set restaurant state
      } catch (err) {
        setError(err.message); // Set error message on failure
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    const loadMenuItems = async () => {
      try {
        const data = await fetchMenuItems(id); // Fetch menu items
        setMenuItems(data); // Set menu items state
      } catch (err) {
        setError(err.message); // Set error message on failure
      }
    };

    loadRestaurantDetails(); // Load restaurant details
    loadMenuItems(); // Load menu items
  }, [id]); // Run when ID changes

  // Updated Add to Cart function (shows modal)
  const handleAddToCart = (item) => {
    addToCart(item, handleModal); // Add item to cart and show modal
  };

  if (loading) return <p className="loading-text">Loading restaurant details...</p>; // Render loading state
  if (error) return <p className="error-text">Error: {error}</p>; // Render error state
  if (!restaurant) return <p className="not-found-text">Restaurant not found.</p>; // Render not found state

  return (
    <div className="restaurant-container">
      <div className="restaurant-details">
        <h1>{restaurant.name}</h1> {/* Restaurant name */}
        <p>{restaurant.description}</p> {/* Restaurant description */}
        <p><strong>Location:</strong> {restaurant.location}</p> {/* Restaurant location */}
        <p><strong>Opening Hours:</strong> {restaurant.openingHours}</p> {/* Restaurant opening hours */}
      </div>

      <h2 className="menu-heading">Menu</h2>
      {menuItems.length === 0 ? (
        <p className="no-menu">No menu items available.</p> // Render if no menu items
      ) : (
        <div className="menu-list">
          {menuItems.map((item) => (
            <div key={item._id} className="menu-card">
              <h3>{item.name}</h3> {/* Menu item name */}
              <p className="menu-description">{item.description}</p> {/* Menu item description */}
              <p className="menu-price"><strong>Price:</strong> {item.price} BD</p> {/* Menu item price */}

              {/* Only show "Add to Cart" if user is NOT an admin */}
              {user && user.role !== "admin" && (
                <button className="add-to-cart-btn btn btn-primary" onClick={() => handleAddToCart(item)}>
                  Add to Cart
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Bootstrap Modal */}
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body> {/* Modal message */}
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Close</Button> {/* Close button */}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Restaurant; // Export the Restaurant component