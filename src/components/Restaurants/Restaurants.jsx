import { useState, useEffect } from "react"; // Import hooks for managing state and side effects
import { Link } from "react-router-dom"; // Import Link component for navigation
import "./Restaurants.css"; // ✅ Import the CSS file in the same folder

const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL; // Fetch backend URL from environment variables

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]); // State to hold the list of restaurants
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage error messages

  useEffect(() => {
    const fetchRestaurants = async () => { // Async function to fetch restaurants data
      try {
        const res = await fetch(`${BACKEND_URL}/restaurants`); // Fetch data from backend
        const data = await res.json(); // Parse the response as JSON

        if (!res.ok) { // Check if the response is not OK
          throw new Error(data.error || "Failed to fetch restaurants"); // Throw error if fetching fails
        }

        setRestaurants(data); // Update state with fetched restaurant data
      } catch (err) {
        setError(err.message); // Set error message in state if an error occurs
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchRestaurants(); // Call the fetch function on component mount
  }, []); // Empty dependency array means this runs once after the initial render

  if (loading) return <p className="loading-text">Loading restaurants...</p>; // Display loading message while fetching
  if (error) return <p className="error-text">Error: {error}</p>; // Display error message if there is an error

  return (
    <div className="container"> {/* Main container for the restaurant list */}
      <h1 className="title">Available Restaurants</h1> {/* Title of the page */}
      <div className="row"> {/* Row for layout */}
        {restaurants.map((restaurant) => ( // Map through the list of restaurants
          <div key={restaurant._id} className="col-md-4 col-sm-6"> {/* Column for each restaurant card */}
            <div className="restaurant-card"> {/* Card for restaurant details */}
              <img src={restaurant.image || "placeholder-image.jpg"} alt={restaurant.name} className="restaurant-image" /> {/* Restaurant image */}
              <Link to={`/restaurant/${restaurant._id}`} className="restaurant-link"> {/* Link to the restaurant's detail page */}
                <h3 className="restaurant-name">{restaurant.name}</h3> {/* Restaurant name */}
              </Link>
              <p className="restaurant-description">{restaurant.description}</p> {/* Restaurant description */}
              <p><strong>Location:</strong> {restaurant.location}</p> {/* Restaurant location */}
              <p><strong>Opening Hours:</strong> {restaurant.openingHours}</p> {/* Restaurant opening hours */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurants; // Export the Restaurants component