const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const jsonHeaders = {
  'Content-Type': 'application/json'
};

const withToken = (token) => ({
  ...jsonHeaders,
  Authorization: `Bearer ${token}`
});

const parseResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }
  return data;
};

export const registerUser = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify(payload)
  });

  return parseResponse(response);
};

export const loginUser = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify(payload)
  });

  return parseResponse(response);
};

export const fetchRooms = async () => {
  const response = await fetch(`${API_BASE_URL}/rooms`);
  return parseResponse(response);
};

export const createBooking = async (payload, token) => {
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: 'POST',
    headers: withToken(token),
    body: JSON.stringify(payload)
  });

  return parseResponse(response);
};

export const fetchMyBookings = async (token) => {
  const response = await fetch(`${API_BASE_URL}/bookings/my-bookings`, {
    headers: withToken(token)
  });

  return parseResponse(response);
};
