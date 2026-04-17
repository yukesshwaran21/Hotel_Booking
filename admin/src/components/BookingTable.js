import './BookingTable.css';

const formatDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '-';
  }

  return date.toLocaleDateString();
};

function BookingTable({ bookings }) {
  return (
    <section className="booking-table-wrapper">
      <h2>Room Bookings</h2>

      {bookings.length === 0 ? (
        <p className="booking-table-empty">No bookings found.</p>
      ) : (
        <div className="booking-table-container">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Room</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Guests</th>
                <th>Total Price</th>
                <th>Booked On</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.user?.name || '-'}</td>
                  <td>{booking.user?.email || '-'}</td>
                  <td>{booking.room?.roomNumber || '-'}</td>
                  <td>{formatDate(booking.checkInDate)}</td>
                  <td>{formatDate(booking.checkOutDate)}</td>
                  <td>{booking.guests}</td>
                  <td>Rs. {booking.totalPrice}</td>
                  <td>{formatDate(booking.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default BookingTable;
