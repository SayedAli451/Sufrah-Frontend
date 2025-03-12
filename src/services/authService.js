const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL; // Get backend URL from environment variables

// Retrieve the user from the token stored in local storage
const getUser = () => {
  const token = localStorage.getItem('token'); // Get token from local storage
  if (!token) return null; // Return null if no token is found
  const user = JSON.parse(atob(token.split('.')[1])); // Decode and parse the token to get user info
  return user; // Return user object
};

// Signup function to register a new user
const signup = async (formData) => { 
  try {
    const res = await fetch(`${BACKEND_URL}/auth/signup`, {
      method: 'POST', // Set request method to POST
      headers: { 'Content-Type': 'application/json' }, // Set content type to JSON
      body: JSON.stringify(formData), // Send form data as JSON
    });
    const json = await res.json(); // Parse response JSON
    if (json.error) {
      throw new Error(json.error); // Throw error if response contains an error
    }
    localStorage.setItem('token', json.token); // Store the received token in local storage
    return json; // Return the response data
  } catch (err) {
    throw new Error(err); // Handle errors
  }
};

// Signin function for user authentication
const signin = async (user) => {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/signin`, {
      method: 'POST', // Set request method to POST
      headers: { 'Content-Type': 'application/json' }, // Set content type to JSON
      body: JSON.stringify(user), // Send user credentials as JSON
    });
    const json = await res.json(); // Parse response JSON
    if (json.error) {
      throw new Error(json.error); // Throw error if response contains an error
    }
    if (json.token) {
      localStorage.setItem('token', json.token); // Store the received token in local storage
      const user = JSON.parse(atob(json.token.split('.')[1])); // Decode and parse the token to get user info
      return user; // Return user object
    }
  } catch (err) {
    console.log(err); // Log error
    throw err; // Handle errors
  }
};

// Signout function to remove the user's session
const signout = () => {
  localStorage.removeItem('token'); // Remove token from local storage
};

export { signup, signin, getUser, signout }; // Export functions for use in other modules