import { useEffect, useState } from 'react';
import './RoomForm.css';

const defaultForm = {
  roomNumber: '',
  title: '',
  description: '',
  type: '',
  capacity: 1,
  pricePerNight: 0,
  imageUrl: '',
  isAvailable: true
};

function RoomForm({ editingRoom, onSubmit, loading, onCancelEdit }) {
  const [formData, setFormData] = useState(defaultForm);

  useEffect(() => {
    if (editingRoom) {
      setFormData({
        roomNumber: editingRoom.roomNumber,
        title: editingRoom.title,
        description: editingRoom.description,
        type: editingRoom.type,
        capacity: editingRoom.capacity,
        pricePerNight: editingRoom.pricePerNight,
        imageUrl: editingRoom.imageUrl || '',
        isAvailable: editingRoom.isAvailable
      });
    } else {
      setFormData(defaultForm);
    }
  }, [editingRoom]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : ['capacity', 'pricePerNight'].includes(name) ? Number(value) : value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <section className="room-form-wrapper">
      <h2>{editingRoom ? 'Edit Room' : 'Add New Room'}</h2>
      <form className="room-form" onSubmit={handleSubmit}>
        <label>
          Room Number
          <input type="text" name="roomNumber" value={formData.roomNumber} onChange={handleChange} required />
        </label>

        <label>
          Title
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </label>

        <label>
          Description
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </label>

        <label>
          Type
          <input type="text" name="type" value={formData.type} onChange={handleChange} required />
        </label>

        <label>
          Capacity
          <input type="number" name="capacity" min={1} value={formData.capacity} onChange={handleChange} required />
        </label>

        <label>
          Price Per Night
          <input
            type="number"
            name="pricePerNight"
            min={0}
            value={formData.pricePerNight}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Image URL
          <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
        </label>

        <label className="checkbox-label">
          <input type="checkbox" name="isAvailable" checked={formData.isAvailable} onChange={handleChange} />
          Available
        </label>

        <div className="room-form-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : editingRoom ? 'Update Room' : 'Add Room'}
          </button>
          {editingRoom ? (
            <button type="button" className="secondary-btn" onClick={onCancelEdit}>
              Cancel Edit
            </button>
          ) : null}
        </div>
      </form>
    </section>
  );
}

export default RoomForm;
