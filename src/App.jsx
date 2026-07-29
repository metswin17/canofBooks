import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import BestBooks from './BestBooks'
import About from './About'
import './App.css'
import { useAuth0 } from "@auth0/auth0-react";
//new imports
import Profile from './Profile';
import Welcome from './Welcome';
import AuthButtons from './Auth/AuthButtons';

function App() {

  const {
    isLoading, // Loading state, the SDK needs to reach Auth0 on load
    isAuthenticated,
    error,
    loginWithRedirect: login, // Starts the login flow
    logout: auth0Logout, // Starts the logout flow
    user, // User profile
  } = useAuth0();

  if (isLoading) {
    return <h2>Loading authentication...</h2>;
  }


  return (
    <BrowserRouter>
      <header>
  <nav>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>

    {isAuthenticated && <Link to="/profile">Profile</Link>}

    <AuthButtons />

  </nav>
</header>

      <Routes>
  <Route
    path="/"
    element={isAuthenticated ? <BestBooks /> : <Welcome />}
  />
  <Route path="/profile" element={<Profile />} />
  <Route path="/about" element={<About />} />
</Routes>
    </BrowserRouter>
  )
}

export default App