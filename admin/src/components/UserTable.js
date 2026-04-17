import './UserTable.css';

function UserTable({ users, loading, onToggleBlock, onDelete }) {
  return (
    <section className="user-table-wrapper">
      <h2>Registered Users</h2>

      {users.length === 0 ? (
        <p className="user-table-empty">No users found.</p>
      ) : (
        <div className="user-table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <span className={`status-pill ${user.isBlocked ? 'blocked' : 'active'}`}>
                      {user.isBlocked ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td>
                    <div className="user-actions">
                      <button
                        type="button"
                        className={user.isBlocked ? 'success-btn' : 'warning-btn'}
                        onClick={() => onToggleBlock(user)}
                        disabled={loading}
                      >
                        {user.isBlocked ? 'Unblock' : 'Block'}
                      </button>
                      <button type="button" className="danger-btn" onClick={() => onDelete(user)} disabled={loading}>
                        Delete
                      </button>
                    </div>
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

export default UserTable;
