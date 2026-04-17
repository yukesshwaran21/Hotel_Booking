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

export const adminLogin = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify(payload)
  });

  return parseResponse(response);
};

export const getRooms = async () => {
  const response = await fetch(`${API_BASE_URL}/rooms`);
  return parseResponse(response);
};

export const addRoom = async (payload, token) => {
  const response = await fetch(`${API_BASE_URL}/rooms`, {
    method: 'POST',
    headers: withToken(token),
    body: JSON.stringify(payload)
  });

  return parseResponse(response);
};

export const updateRoom = async (id, payload, token) => {
  const response = await fetch(`${API_BASE_URL}/rooms/${id}`, {
    method: 'PUT',
    headers: withToken(token),
    body: JSON.stringify(payload)
  });

  return parseResponse(response);
};

export const getUsers = async (token) => {
  const response = await fetch(`${API_BASE_URL}/admin/users`, {
    headers: withToken(token)
  });

  return parseResponse(response);
};

export const changeUserBlockStatus = async (id, isBlocked, token) => {
  const response = await fetch(`${API_BASE_URL}/admin/users/${id}/block`, {
    method: 'PATCH',
    headers: withToken(token),
    body: JSON.stringify({ isBlocked })
  });

  return parseResponse(response);
};

export const deleteUser = async (id, token) => {
  const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
    method: 'DELETE',
    headers: withToken(token)
  });

  return parseResponse(response);
};

export const getAllBookings = async (token) => {
  const response = await fetch(`${API_BASE_URL}/bookings/all`, {
    headers: withToken(token)
  });

  return parseResponse(response);
};
