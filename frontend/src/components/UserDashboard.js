import './UserDashboard.css';

function UserDashboard({ user, bookings }) {
  return (
    <section className="user-dashboard-wrapper">
      <h2 className="user-dashboard-title">Welcome, {user.name}</h2>
      <h3>Your Bookings</h3>

      {bookings.length === 0 ? (
        <p className="dashboard-empty">You have no bookings yet.</p>
      ) : (
        <div className="booking-grid">
          {bookings.map((booking) => (
            <article key={booking._id} className="booking-card">
              <h4>{booking.room?.title || 'Room'}</h4>
              <p>Room Number: {booking.room?.roomNumber}</p>
              <p>Guests: {booking.guests}</p>
              <p>Check In: {new Date(booking.checkInDate).toLocaleDateString()}</p>
              <p>Check Out: {new Date(booking.checkOutDate).toLocaleDateString()}</p>
              <p>Total Price: Rs. {booking.totalPrice}</p>
              <span className="booking-status">{booking.status}</span>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default UserDashboard;
