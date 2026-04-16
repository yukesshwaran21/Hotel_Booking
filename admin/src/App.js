import './App.css';
import { useEffect, useState } from 'react';
import AdminLogin from './components/AdminLogin';
import RoomForm from './components/RoomForm';
import RoomTable from './components/RoomTable';
import { addRoom, adminLogin, getRooms, updateRoom } from './services/api';

function App() {
  const [authState, setAuthState] = useState(() => {
    const saved = localStorage.getItem('hotel_admin_auth');
    return saved ? JSON.parse(saved) : { token: '', user: null };
  });

  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const isAdminLoggedIn = Boolean(authState.token);

  const loadRooms = async () => {
    try {
      const data = await getRooms();
      setRooms(data);
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    if (authState.token) {
      localStorage.setItem('hotel_admin_auth', JSON.stringify(authState));
      loadRooms();
    } else {
      localStorage.removeItem('hotel_admin_auth');
      setRooms([]);
    }
  }, [authState]);

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
              <button type="button" onClick={loadRooms}>
                Refresh Rooms
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
          <section className="admin-grid">
            <RoomForm
              editingRoom={editingRoom}
              onSubmit={handleRoomSubmit}
              loading={loading}
              onCancelEdit={() => setEditingRoom(null)}
            />
            <RoomTable rooms={rooms} onEdit={setEditingRoom} />
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
