import './App.css';
import { useCallback, useEffect, useState } from 'react';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import RoomForm from './components/RoomForm';
import RoomTable from './components/RoomTable';
import UserTable from './components/UserTable';
import BookingTable from './components/BookingTable';
import {
  addRoom,
  adminLogin,
  changeUserBlockStatus,
  deleteUser,
  getAllBookings,
  getRooms,
  getUsers,
  updateRoom
} from './services/api';

function App() {
  const [authState, setAuthState] = useState(() => {
    const saved = localStorage.getItem('hotel_admin_auth');
    return saved ? JSON.parse(saved) : { token: '', user: null };
  });

  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const isAdminLoggedIn = Boolean(authState.token);

  const loadRooms = useCallback(async () => {
    try {
      const data = await getRooms();
      setRooms(data);
    } catch (error) {
      setMessage(error.message);
    }
  }, []);

  const loadUsers = useCallback(async () => {
    if (!authState.token) {
      return;
    }

    try {
      const data = await getUsers(authState.token);
      setUsers(data.filter((user) => user.role === 'user'));
    } catch (error) {
      setMessage(error.message);
    }
  }, [authState.token]);

  const loadBookings = useCallback(async () => {
    if (!authState.token) {
      return;
    }

    try {
      const data = await getAllBookings(authState.token);
      setBookings(data);
    } catch (error) {
      setMessage(error.message);
    }
  }, [authState.token]);

  useEffect(() => {
    if (authState.token) {
      localStorage.setItem('hotel_admin_auth', JSON.stringify(authState));
      loadRooms();
      loadUsers();
      loadBookings();
    } else {
      localStorage.removeItem('hotel_admin_auth');
      setRooms([]);
      setUsers([]);
      setBookings([]);
    }
  }, [authState, loadRooms, loadUsers, loadBookings]);

  const handleAdminLogin = async (payload) => {
    setLoading(true);
    setMessage('');

    try {
      const result = await adminLogin(payload);

      if (result.user.role !== 'admin') {
        setMessage('This account does not have admin access');
        return;
      }

      setAuthState({ token: result.token, user: result.user });
      setMessage('Admin login successful');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRoomSubmit = async (payload) => {
    setLoading(true);
    setMessage('');

    try {
      if (editingRoom) {
        await updateRoom(editingRoom._id, payload, authState.token);
        setMessage('Room updated successfully');
        setEditingRoom(null);
      } else {
        await addRoom(payload, authState.token);
        setMessage('Room added successfully');
      }

      await loadRooms();
      await loadBookings();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setAuthState({ token: '', user: null });
    setEditingRoom(null);
    setMessage('Admin logged out');
  };

  const handleToggleBlock = async (user) => {
    setLoading(true);
    setMessage('');

    try {
      const result = await changeUserBlockStatus(user._id, !user.isBlocked, authState.token);
      setMessage(result.message);
      await loadUsers();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (user) => {
    const shouldDelete = window.confirm(`Delete user ${user.email}? This action cannot be undone.`);
    if (!shouldDelete) {
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const result = await deleteUser(user._id, authState.token);
      setMessage(result.message);
      await loadUsers();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-app-root">
      <main className="admin-shell">
        <header className="admin-header">
          <div>
            <h1>Hotel Admin Dashboard</h1>
            {authState.user ? <p>Logged in as {authState.user.name}</p> : null}
          </div>

          {isAdminLoggedIn ? (
            <div className="admin-actions">
              <button
                type="button"
                onClick={() => {
                  loadRooms();
                  loadUsers();
                  loadBookings();
                }}
              >
                Refresh Data
              </button>
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : null}
        </header>

        {message ? <p className="admin-message">{message}</p> : null}

        {!isAdminLoggedIn ? (
          <AdminLogin onSubmit={handleAdminLogin} loading={loading} />
        ) : (
          <section className="admin-layout">
            <aside className="admin-sidebar">
              <h2>Management</h2>
              <nav className="admin-nav-links">
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/rooms">Room Inventory</NavLink>
                <NavLink to="/users">User Management</NavLink>
                <NavLink to="/bookings">Bookings</NavLink>
              </nav>
            </aside>

            <div className="admin-page-area">
              <Routes>
                <Route
                  path="/dashboard"
                  element={
                    <section className="summary-grid">
                      <article className="summary-card">
                        <h3>Total Rooms</h3>
                        <p>{rooms.length}</p>
                      </article>
                      <article className="summary-card">
                        <h3>Total Users</h3>
                        <p>{users.length}</p>
                      </article>
                      <article className="summary-card">
                        <h3>Total Bookings</h3>
                        <p>{bookings.length}</p>
                      </article>
                    </section>
                  }
                />
                <Route
                  path="/rooms"
                  element={
                    <section className="admin-grid">
                      <RoomForm
                        editingRoom={editingRoom}
                        onSubmit={handleRoomSubmit}
                        loading={loading}
                        onCancelEdit={() => setEditingRoom(null)}
                      />
                      <RoomTable rooms={rooms} onEdit={setEditingRoom} />
                    </section>
                  }
                />
                <Route
                  path="/users"
                  element={
                    <UserTable
                      users={users}
                      loading={loading}
                      onToggleBlock={handleToggleBlock}
                      onDelete={handleDeleteUser}
                    />
                  }
                />
                <Route path="/bookings" element={<BookingTable bookings={bookings} />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
