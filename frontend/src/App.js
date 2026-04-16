import './App.css';
import { useEffect, useState } from 'react';
import AuthForm from './components/AuthForm';
import RoomList from './components/RoomList';
import BookingForm from './components/BookingForm';
import UserDashboard from './components/UserDashboard';
import { createBooking, fetchMyBookings, fetchRooms, loginUser, registerUser } from './services/api';

function App() {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [authMode, setAuthMode] = useState('login');
  const [loading, setLoading] = useState(false);

  const [authState, setAuthState] = useState(() => {
    const saved = localStorage.getItem('hotel_user_auth');
    return saved ? JSON.parse(saved) : { token: '', user: null };
  });

  const isLoggedIn = Boolean(authState.token);

  const loadRooms = async () => {
    try {
      const roomData = await fetchRooms();
      setRooms(roomData);
      if (roomData.length && !selectedRoomId) {
        setSelectedRoomId(roomData[0]._id);
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  const loadBookings = async (token) => {
    try {
      const bookingData = await fetchMyBookings(token);
      setBookings(bookingData);
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  useEffect(() => {
    if (authState.token) {
      loadBookings(authState.token);
      localStorage.setItem('hotel_user_auth', JSON.stringify(authState));
    } else {
      localStorage.removeItem('hotel_user_auth');
      setBookings([]);
    }
  }, [authState]);

  const handleAuthSubmit = async (payload) => {
    setLoading(true);
    setMessage('');

    try {
      const result = authMode === 'login' ? await loginUser(payload) : await registerUser(payload);
      setAuthState({ token: result.token, user: result.user });
      setMessage(result.message);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBookRoom = async (payload) => {
    setLoading(true);
    setMessage('');

    try {
      await createBooking(payload, authState.token);
      setMessage('Room booked successfully');
      await loadBookings(authState.token);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setAuthState({ token: '', user: null });
    setMessage('Logged out successfully');
  };

  return (
    <div className="app-root">
      <main className="app-shell">
        <header className="app-header">
          <h1>Hotel Booking Portal</h1>

          {isLoggedIn ? (
            <div className="header-actions">
              <button type="button" onClick={loadRooms}>
                Refresh Rooms
              </button>
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="header-actions">
              <button type="button" onClick={() => setAuthMode('login')}>
                Login
              </button>
              <button type="button" onClick={() => setAuthMode('register')}>
                Register
              </button>
            </div>
          )}
        </header>

        {message && <p className="app-message">{message}</p>}

        <section className="layout-grid">
          {!isLoggedIn ? (
            <AuthForm mode={authMode} onSubmit={handleAuthSubmit} loading={loading} />
          ) : (
            <BookingForm selectedRoomId={selectedRoomId} onBook={handleBookRoom} loading={loading} />
          )}

          <div>
            <RoomList rooms={rooms} selectedRoomId={selectedRoomId} onSelectRoom={setSelectedRoomId} />
            {isLoggedIn && authState.user ? <UserDashboard user={authState.user} bookings={bookings} /> : null}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
