import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import './DashboardOverview.css';

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 0
});

const formatDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric'
  });
};

const formatDateTime = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '-';
  }

  return date.toLocaleString();
};

const StatCard = ({ label, value, accent }) => (
  <article className="dashboard-stat-card" style={{ borderTopColor: accent }}>
    <h3>{label}</h3>
    <p>{value}</p>
  </article>
);

function DashboardOverview({ analytics, loading }) {
  if (!analytics && loading) {
    return <p className="dashboard-loading">Loading dashboard analytics...</p>;
  }

  if (!analytics) {
    return <p className="dashboard-loading">No analytics data available.</p>;
  }

  const { stats, trends, recentBookings, recentLogins, generatedAt } = analytics;

  return (
    <section className="dashboard-overview">
      <header className="dashboard-overview-header">
        <div>
          <h2>Live Admin Insights</h2>
          <p>Auto-refreshes from the database every 15 seconds.</p>
        </div>
        <span>Updated: {formatDateTime(generatedAt)}</span>
      </header>

      <div className="dashboard-stat-grid">
        <StatCard label="Total Users" value={stats.totalUsers} accent="#0f4c81" />
        <StatCard label="Active Users" value={stats.activeUsers} accent="#2a9d8f" />
        <StatCard label="Blocked Users" value={stats.blockedUsers} accent="#e76f51" />
        <StatCard label="Total Bookings" value={stats.totalBookings} accent="#3f37c9" />
        <StatCard label="Total Revenue" value={`Rs. ${currencyFormatter.format(stats.totalRevenue)}`} accent="#1d3557" />
        <StatCard label="Room Occupancy" value={`${stats.occupancyRate}%`} accent="#6a4c93" />
      </div>

      <div className="dashboard-chart-grid">
        <article className="dashboard-chart-card">
          <h3>Bookings in Last 7 Days</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={trends.bookingTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={formatDate} />
              <YAxis allowDecimals={false} />
              <Tooltip labelFormatter={formatDate} />
              <Bar dataKey="value" fill="#1d4e89" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </article>

        <article className="dashboard-chart-card">
          <h3>User Logins in Last 7 Days</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={trends.loginTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={formatDate} />
              <YAxis allowDecimals={false} />
              <Tooltip labelFormatter={formatDate} />
              <Line type="monotone" dataKey="value" stroke="#2a9d8f" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </article>
      </div>

      <div className="dashboard-activity-grid">
        <article className="dashboard-activity-card">
          <h3>Recent Bookings</h3>
          {recentBookings.length === 0 ? (
            <p className="dashboard-empty">No bookings yet.</p>
          ) : (
            <ul>
              {recentBookings.map((booking) => (
                <li key={booking._id}>
                  <strong>{booking.user?.name || 'Unknown user'}</strong>
                  <span>
                    Room {booking.room?.roomNumber || '-'} | Rs. {currencyFormatter.format(booking.totalPrice)} |{' '}
                    {formatDateTime(booking.createdAt)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </article>

        <article className="dashboard-activity-card">
          <h3>Recent User Logins</h3>
          {recentLogins.length === 0 ? (
            <p className="dashboard-empty">No login activity yet.</p>
          ) : (
            <ul>
              {recentLogins.map((login) => (
                <li key={login._id}>
                  <strong>{login.user?.name || 'Unknown user'}</strong>
                  <span>{login.user?.email || '-'} | {formatDateTime(login.createdAt)}</span>
                </li>
              ))}
            </ul>
          )}
        </article>
      </div>
    </section>
  );
}

export default DashboardOverview;
