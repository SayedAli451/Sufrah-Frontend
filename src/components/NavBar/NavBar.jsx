import { Link } from "react-router-dom"; // Import Link for navigation
import { AuthedUserContext } from "../../App"; // Import context for authenticated user
import { useContext } from "react"; // Import useContext hook
import "./NavBar.css"; // Import CSS for styling

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext); // Get authenticated user from context

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark"> {/* Navbar structure */}
      <div className="container">
        <Link className="navbar-brand" to="/">Sufrah</Link> {/* Brand link to home */}

        <button
          className="navbar-toggler" // Button for mobile view
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav"> {/* Collapsible menu */}
          <ul className="navbar-nav">
            {user ? ( // Check if user is authenticated
              <>
                {user?.role !== "admin" && ( // Non-admin user links
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/orders">Orders</Link>
                    </li>
                  </>
                )}

                {user?.role === "admin" && ( // Admin link
                  <li className="nav-item">
                    <Link className="nav-link admin-link" to="/admin">Admin Dashboard</Link>
                  </li>
                )}
              </>
            ) : ( // Links for unauthenticated users
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signin">Sign In</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
              </>
            )}
          </ul>

          {user && ( // User-specific actions
            <div className="d-flex align-items-center ms-auto"> {/* Right aligned items */}
              {user?.role !== "admin" && ( // Cart and notifications for non-admin users
                <>
                  {/* Cart Icon */}
                  <Link className="nav-link me-3" to="/cart">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-cart-fill" viewBox="0 0 16 16">
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg>
                  </Link>

                  {/* Notifications Icon */}
                  <Link className="nav-link me-3" to="/notifications">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-bell-fill" viewBox="0 0 16 16">
                      <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
                    </svg>
                  </Link>
                </>
              )}

              {/* User section with profile and sign out */}
              <div className="user-section d-flex align-items-center border rounded p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-person-fill me-2" viewBox="0 0 16 16">
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                </svg>
                <span className="navbar-text me-3 text-white">{user.username}</span> {/* Display username */}
                <Link className="nav-link signout-btn text-red" to="" onClick={handleSignout}>Sign Out</Link> {/* Sign out button */}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar; // Export the NavBar component