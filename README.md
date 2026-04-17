# Hotel_Booking

Full stack hotel management and booking system:

- `backend`: Node.js + Express + MongoDB API
- `frontend`: React app for users (register/login, room booking, user bookings)
- `admin`: React app for admin dashboard (add/edit room details)

Both `frontend` and `admin` use the same backend API and the same MongoDB database.

## 1. Backend Setup

1. Go to backend folder: `cd backend`
1. Install packages: `npm install`
1. Create `.env` file in `backend` using this template:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<db_username>:<db_password>@<cluster_name>.mongodb.net/hotel_booking?retryWrites=true&w=majority
JWT_SECRET=replace_with_strong_secret
ADMIN_NAME=Hotel Admin
ADMIN_EMAIL=admin@hotel.com
ADMIN_PASSWORD=admin123
```

1. Create admin user once: `npm run seed-admin`
1. Start API: `npm run dev`

## 2. User Frontend Setup

1. Go to frontend folder: `cd frontend`
1. Install packages: `npm install`
1. Optional: create `.env` in `frontend`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

1. Start frontend: `npm start`

## 3. Admin Frontend Setup

1. Go to admin folder: `cd admin`
1. Install packages: `npm install`
1. Optional: create `.env` in `admin`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

1. Start admin app: `npm start`

## Features

- User registration and login
- Room listing and room booking
- User dashboard with booking history
- Admin login
- Admin add room details
- Admin edit room details
- Separate CSS files for each component in both React apps
