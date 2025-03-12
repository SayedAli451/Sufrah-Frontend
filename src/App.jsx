import { useState, createContext } from 'react'; // Import necessary hooks and context API
import { Routes, Route, Navigate } from 'react-router-dom'; // Import routing components

// Components
import NavBar from './components/NavBar/NavBar'; // Import NavBar component
import Restaurants from './components/Restaurants/Restaurants'; // Import Restaurants component
import Restaurant from "./components/Restaurant/Restaurant"; // Import single Restaurant component
import Cart from './components/Cart/Cart'; // Import Cart component
import Orders from './components/Orders/Orders'; // Import Orders component
import Notifications from './components/Notifications/Notifications'; // Import Notifications component
import SignupForm from './components/SignupForm/SignupForm'; // Import SignupForm component
import SigninForm from './components/SigninForm/SigninForm'; // Import SigninForm component
import AdminDashboard from "./components/AdminDashboard/AdminDashboard"; // Import AdminDashboard component
import CreateRestaurant from "./components/AdminDashboard/CreateRestaurant/CreateRestaurant"; // Import CreateRestaurant component
import ManageOrders from "./components/AdminDashboard/ManageOrders/ManageOrders"; // Import ManageOrders component
import ManageMenu from "./components/AdminDashboard/ManageMenu/ManageMenu"; // Import ManageMenu component

// Services
import * as authService from './services/authService'; // Import authentication service

// Authentication Context
export const AuthedUserContext = createContext(null); // Create context for authenticated user

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // Initialize user state

  const handleSignout = () => {
    authService.signout(); // Call signout service
    setUser(null); // Clear user state
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}> {/* Provide user context */}
        <NavBar user={user} handleSignout={handleSignout} /> {/* Render NavBar with user info */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Restaurants />} /> {/* Main restaurant listing */}
          <Route path="/restaurant/:id" element={<Restaurant />} /> {/* Single restaurant detail page */}
  
          {/* Protected Routes */}
          {user ? ( // Check if user is authenticated
            <>
              <Route path="/cart" element={<Cart />} /> {/* Cart page */}
              <Route path="/orders" element={<Orders />} /> {/* Orders page */}
              <Route path="/notifications" element={<Notifications />} /> {/* Notifications page */}
  
              {/* Admin Routes */}
              {user?.role === "admin" && ( // Check if user is an admin
                <>
                  <Route path="/admin" element={<AdminDashboard />} /> {/* Admin dashboard */}
                  <Route path="/admin/create-restaurant" element={<CreateRestaurant />} /> {/* Create restaurant page */}
                  <Route path="/admin/order/:id" element={<ManageOrders />} /> {/* Manage orders page */}
                  <Route path="/admin/restaurant/:id/menu" element={<ManageMenu />} /> {/* Manage menu page */}
                </>
              )}
            </>
          ) : (
            <>
              <Route path="/cart" element={<Navigate to="/signin" />} /> {/* Redirect to signin if not authenticated */}
              <Route path="/orders" element={<Navigate to="/signin" />} /> {/* Redirect to signin if not authenticated */}
              <Route path="/notifications" element={<Navigate to="/signin" />} /> {/* Redirect to signin if not authenticated */}
            </>
          )}
  
          {/* Auth Routes */}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} /> {/* Signup page */}
          <Route path="/signin" element={<SigninForm setUser={setUser} />} /> {/* Signin page */}
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App; // Export the App component