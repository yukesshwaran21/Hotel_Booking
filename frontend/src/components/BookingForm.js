import { useState } from 'react';
import './BookingForm.css';

const initialState = {
  checkInDate: '',
  checkOutDate: '',
  guests: 1
};

function BookingForm({ selectedRoomId, onBook, loading }) {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'guests' ? Number(value) : value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedRoomId) {
      return;
    }

    onBook({
      roomId: selectedRoomId,
      ...formData
    });

    setFormData(initialState);
  };

  return (
    <section className="booking-form-wrapper">
      <h2 className="booking-form-title">Book Your Room</h2>
      <form className="booking-form" onSubmit={handleSubmit}>
        <label>
          Check In
          <input type="date" name="checkInDate" value={formData.checkInDate} onChange={handleChange} required />
        </label>

        <label>
          Check Out
          <input type="date" name="checkOutDate" value={formData.checkOutDate} onChange={handleChange} required />
        </label>

        <label>
          Guests
          <input type="number" name="guests" value={formData.guests} min={1} onChange={handleChange} required />
        </label>

        <button type="submit" disabled={loading || !selectedRoomId}>
          {loading ? 'Booking...' : 'Confirm Booking'}
        </button>
      </form>
    </section>
  );
}

export default BookingForm;
