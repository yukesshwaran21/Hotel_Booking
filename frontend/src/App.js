import './App.css';
import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import RoomList from './components/RoomList';
import BookingForm from './components/BookingForm';
import UserDashboard from './components/UserDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import { createBooking, fetchMyBookings, fetchRooms, loginUser, registerUser } from './services/api';



function AuthPage({ mode, onLogin, onRegister, loading, message }) {
  const navigate = useNavigate();

  return (
    <section className="layout-grid">
      <AuthForm mode={mode} onSubmit={mode === 'login' ? onLogin : onRegister} loading={loading} />
      <section className="page-card">
        <h2>{mode === 'login' ? 'Login to Continue' : 'Create an Account'}</h2>
        <p>{message || 'After login, you can confirm bookings and manage your room reservations.'}</p>
        <div className="inline-actions">
          <button type="button" onClick={() => navigate('/login')}>
            Login
          </button>
          <button type="button" onClick={() => navigate('/register')}>
            Register
          </button>
        </div>
      </section>
    </section>
  );
}

function RoomsPage({ rooms, selectedRoomId, onSelectRoom, onBook, loading, isLoggedIn }) {
  const navigate = useNavigate();

  const handleBook = (payload) => {
    if (!isLoggedIn) {
      navigate('/login', {
        state: {
          message: 'Please login before confirming booking.'
        }
      });
      return;
    }

    onBook(payload);
  };

  return (
    <section className="rooms-layout">
      <RoomList rooms={rooms} selectedRoomId={selectedRoomId} onSelectRoom={onSelectRoom} />
      <BookingForm selectedRoomId={selectedRoomId} onBook={handleBook} loading={loading} isLoggedIn={isLoggedIn} />
    </section>
  );
}

function DashboardPage({ user, bookings, isLoggedIn }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <UserDashboard user={user} bookings={bookings} />;
}

function AppContent() {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const [authState, setAuthState] = useState(() => {
    const saved = localStorage.getItem('hotel_user_auth');
    return saved ? JSON.parse(saved) : { token: '', user: null };
  });

  const isLoggedIn = Boolean(authState.token);

  const loadRooms = useCallback(async () => {
    try {
      const roomData = await fetchRooms();
      setRooms(roomData);
      if (roomData.length && !selectedRoomId) {
        setSelectedRoomId(roomData[0]._id);
      }
    } catch (error) {
      setMessage(error.message);
    }
  }, [selectedRoomId]);

  const loadBookings = useCallback(async (token) => {
    try {
      const bookingData = await fetchMyBookings(token);
      setBookings(bookingData);
    } catch (error) {
      setMessage(error.message);
    }
  }, []);

  useEffect(() => {
    loadRooms();
  }, [loadRooms]);

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
    }
  }, [location.state]);

  useEffect(() => {
    if (authState.token) {
      loadBookings(authState.token);
      localStorage.setItem('hotel_user_auth', JSON.stringify(authState));
    } else {
      localStorage.removeItem('hotel_user_auth');
      setBookings([]);
    }
  }, [authState, loadBookings]);

  const handleLoginSubmit = async (payload) => {
    setLoading(true);
    setMessage('');

    try {
      const result = await loginUser(payload);
      setAuthState({ token: result.token, user: result.user });
      setMessage(result.message);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (payload) => {
    setLoading(true);
    setMessage('');

    try {
      const result = await registerUser(payload);
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
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} onRefreshRooms={loadRooms} user={authState.user} />

        {message && <p className="app-message">{message}</p>}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/rooms"
            element={
              <RoomsPage
                rooms={rooms}
                selectedRoomId={selectedRoomId}
                onSelectRoom={setSelectedRoomId}
                onBook={handleBookRoom}
                loading={loading}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path="/login"
            element={
              <AuthPage
                mode="login"
                onLogin={handleLoginSubmit}
                onRegister={handleRegisterSubmit}
                loading={loading}
                message={message}
              />
            }
          />
          <Route
            path="/register"
            element={
              <AuthPage
                mode="register"
                onLogin={handleLoginSubmit}
                onRegister={handleRegisterSubmit}
                loading={loading}
                message={message}
              />
            }
          />
          <Route path="/dashboard" element={<DashboardPage user={authState.user} bookings={bookings} isLoggedIn={isLoggedIn} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
