import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchRestaurantDetails } from "../../services/restaurantService";
import { fetchMenuItems } from "../../services/menuService";
import { addToCart } from "../../services/cartService";
import { AuthedUserContext } from "../../App";
import "./Restaurant.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";

const Restaurant = () => {
  const { id } = useParams();
  const user = useContext(AuthedUserContext);
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleModal = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  useEffect(() => {
    const loadRestaurantDetails = async () => {
      try {
        const data = await fetchRestaurantDetails(id);
        setRestaurant(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const loadMenuItems = async () => {
      try {
        const data = await fetchMenuItems(id);
        setMenuItems(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadRestaurantDetails();
    loadMenuItems();
  }, [id]);

  const handleAddToCart = (item) => {
    addToCart(item, handleModal);
  };

  if (loading) return <p className="loading-text">Loading restaurant details...</p>;
  if (error) return <p className="error-text">Error: {error}</p>;
  if (!restaurant) return <p className="not-found-text">Restaurant not found.</p>;

  return (
    <div className="restaurant-container">
  <div className="restaurant-details">
    {/* Restaurant Image */}
    <img
      src={restaurant.image || "placeholder-image.jpg"}
      alt={restaurant.name}
      className="restaurant-image"
    />
    <h1 className="restaurant-name">{restaurant.name}</h1>
    <p className="restaurant-description">{restaurant.description}</p>
    <div className="restaurant-location-hours">
      <p><strong>Location:</strong> {restaurant.location}</p>
      <p><strong>Opening Hours:</strong> {restaurant.openingHours}</p>
    </div>
  </div>

  <h2 className="menu-heading">Menu</h2>
  {menuItems.length === 0 ? (
    <p className="no-menu">No menu items available.</p>
  ) : (
    <div className="menu-list">
      {menuItems.map((item) => (
        <div key={item._id} className="menu-card">
          <div className="menu-image-container">
            <img
              src={item.imageUrl && item.imageUrl !== "" ? item.imageUrl : "placeholder-image.jpg"}
              alt={item.name}
              className="menu-item-image"
            />
          </div>
          <div className="menu-item-details">
            <h3>{item.name}</h3>
            <p className="menu-description">{item.description}</p>
            <p className="menu-price"><strong>Price:</strong> {item.price} BD</p>
            {user && user.role !== "admin" && (
              <button className="add-to-cart-btn btn btn-primary" onClick={() => handleAddToCart(item)}>
                Add to Cart
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )}
  
  {/* Bootstrap Modal */}
  <Modal show={showModal} onHide={closeModal} centered>
    <Modal.Header closeButton>
      <Modal.Title>Notification</Modal.Title>
    </Modal.Header>
    <Modal.Body>{modalMessage}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={closeModal}>Close</Button>
    </Modal.Footer>
  </Modal>
</div>

  );
};

export default Restaurant;
