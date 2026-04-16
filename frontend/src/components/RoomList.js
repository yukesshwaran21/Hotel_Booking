import './RoomList.css';

function RoomList({ rooms, selectedRoomId, onSelectRoom }) {
  return (
    <section className="room-list-wrapper">
      <h2 className="room-list-title">Available Rooms</h2>
      {rooms.length === 0 ? (
        <p className="room-list-empty">No rooms added yet.</p>
      ) : (
        <div className="room-grid">
          {rooms.map((room) => (
            <article
              key={room._id}
              className={`room-card ${selectedRoomId === room._id ? 'room-card-selected' : ''}`}
            >
              {room.imageUrl ? <img src={room.imageUrl} alt={room.title} /> : <div className="room-image-fallback">No Image</div>}
              <h3>{room.title}</h3>
              <p>{room.description}</p>
              <ul>
                <li>Room Number: {room.roomNumber}</li>
                <li>Type: {room.type}</li>
                <li>Capacity: {room.capacity}</li>
                <li>Price / night: Rs. {room.pricePerNight}</li>
              </ul>
              <button type="button" onClick={() => onSelectRoom(room._id)}>
                {selectedRoomId === room._id ? 'Selected' : 'Select Room'}
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default RoomList;
