const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL; // Get backend URL from environment variables

// Retrieve the cart from local storage
const getCart = () => JSON.parse(localStorage.getItem("cart")) || []; // Return parsed cart or an empty array

// Save the cart to local storage
const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart)); // Store cart as a JSON string
  return cart; // Return the saved cart
};

// Add an item to the cart with a modal handler for notifications
const addToCart = (item, handleModal) => {
  let cart = getCart(); // Get current cart

  // Check if the cart has items from a different restaurant
  if (cart.length > 0 && cart[0].restaurant !== item.restaurant) {
    handleModal(`Your cart contains items from a different restaurant. Adding ${item.name} is not possible. Please clear your current cart first.`);
    return; // Do not add item if restaurant differs
  }

  // Check if item already exists in the cart
  const existingItem = cart.find((cartItem) => cartItem._id === item._id);
  if (existingItem) {
    existingItem.quantity += 1; // Increase quantity if item exists
  } else {
    cart.push({ ...item, quantity: 1 }); // Add new item with quantity 1
  }

  saveCart(cart); // Save updated cart
  handleModal(`${item.name} has been added to your cart!`); // Show confirmation message
};

// Increase the quantity of an item in the cart
const increaseQuantity = (itemId) => {
  let cart = getCart(); // Retrieve current cart
  cart = cart.map((item) =>
    item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item // Increase quantity for the specified item
  );
  return saveCart(cart); // Save updated cart
};

// Decrease the quantity of an item in the cart
const decreaseQuantity = (itemId) => {
  let cart = getCart(); // Retrieve current cart
  cart = cart.map((item) =>
    item._id === itemId ? { ...item, quantity: item.quantity - 1 } : item // Decrease quantity for the specified item
  );
  cart = cart.filter((item) => item.quantity > 0); // Remove items with zero quantity
  return saveCart(cart); // Save updated cart
};

// Remove an item from the cart
const removeFromCart = (itemId) => {
  let cart = getCart(); // Retrieve current cart
  cart = cart.filter((item) => item._id !== itemId); // Filter out the specified item
  return saveCart(cart); // Save updated cart
};

// Checkout function to place an order using cart items
const checkout = async (cartItems, setCartItems, setTotalPrice) => {
  if (cartItems.length === 0) {
    return; // Exit if cart is empty
  }

  const token = localStorage.getItem("token"); // Retrieve token from local storage
  if (!token) {
    return; // Exit if no token is found
  }

  const restaurantId = cartItems[0].restaurant; // Get restaurant ID from cart items
  const orderData = {
    restaurant: restaurantId,
    items: cartItems.map((item) => ({
      menuItem: item._id,
      quantity: item.quantity, // Prepare order data
    })),
  };

  try {
    const res = await fetch(`${BACKEND_URL}/orders`, {
      method: "POST", // Set request method to POST
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
        Authorization: `Bearer ${token}`, // Include authorization token
      },
      body: JSON.stringify(orderData), // Send order data as JSON
    });

    const data = await res.json(); // Parse response JSON
    if (!res.ok) throw new Error(data.error || "Failed to place order"); // Check for errors

    localStorage.removeItem("cart"); // Clear cart from local storage
    setCartItems([]); // Reset cart items in state
    setTotalPrice(0); // Reset total price
    window.location.href = "/orders"; // Redirect to orders page
  } catch (error) {
    console.error(error.message); // Log any errors
  }
};

export { getCart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, checkout }; // Export functions for use in other modules