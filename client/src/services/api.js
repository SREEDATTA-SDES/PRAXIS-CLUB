// Centralized API Client with Offline / In-Memory Fallback

const BASE_URL = import.meta.env.VITE_API_URL || '';

export const getAuthToken = () => localStorage.getItem('praxis_token');
export const setAuthToken = (token) => localStorage.setItem('praxis_token', token);
export const removeAuthToken = () => {
  localStorage.removeItem('praxis_token');
  localStorage.removeItem('praxis_user');
};

export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem('praxis_user');
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
};

export const setStoredUser = (user) => {
  localStorage.setItem('praxis_user', JSON.stringify(user));
};

// Generic fetch with error handling and fallback
export async function apiRequest(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const url = `${BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }
    return data;
  } catch (error) {
    // If backend is offline or unreachable, log warning and let caller handle fallback
    console.warn(`[API] Notice on ${endpoint}:`, error.message);
    throw error;
  }
}
