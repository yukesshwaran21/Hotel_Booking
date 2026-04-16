import './RoomTable.css';

function RoomTable({ rooms, onEdit }) {
  return (
    <section className="room-table-wrapper">
      <h2>Room Inventory</h2>
      {rooms.length === 0 ? (
        <p className="room-table-empty">No rooms available.</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Room No.</th>
                <th>Title</th>
                <th>Type</th>
                <th>Capacity</th>
                <th>Price</th>
                <th>Available</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room._id}>
                  <td>{room.roomNumber}</td>
                  <td>{room.title}</td>
                  <td>{room.type}</td>
                  <td>{room.capacity}</td>
                  <td>Rs. {room.pricePerNight}</td>
                  <td>{room.isAvailable ? 'Yes' : 'No'}</td>
                  <td>
                    <button type="button" onClick={() => onEdit(room)}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default RoomTable;
