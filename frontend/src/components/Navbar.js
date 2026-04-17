import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ isLoggedIn, onLogout, onRefreshRooms, user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <header className="site-header">
      <div className="brand-block">
        <h1>Hotel Booking Portal</h1>
        <p>{isLoggedIn && user ? `Welcome, ${user.name}` : 'Find your perfect stay'}</p>
      </div>

      <nav className="site-nav">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
        <NavLink to="/rooms" className={({ isActive }) => (isActive ? 'active' : '')}>
          Rooms
        </NavLink>
        {isLoggedIn ? (
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
            Dashboard
          </NavLink>
        ) : null}
      </nav>

      <div className="site-actions">
        {isLoggedIn ? (
          <>
            <button type="button" onClick={onRefreshRooms}>
              Refresh Rooms
            </button>
            <button type="button" className="danger" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button type="button" onClick={() => navigate('/login')}>
              Login
            </button>
            <button type="button" onClick={() => navigate('/register')}>
              Register
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
