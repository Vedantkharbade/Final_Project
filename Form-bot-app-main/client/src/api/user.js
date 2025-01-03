
import axios from 'axios';

import {jwtDecode} from 'jwt-decode';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/user`;

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Server error');
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Server error');
  }
};

export const ValidateExitToken = async (token) => {
  if (!token) {
    return false;
  }
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      localStorage.removeItem(token);
      return false;
    }
    return true;
  } catch (error) {
    localStorage.removeItem(token);
    return false;
  }
};

export const updateUser = async (email, oldPassword, newPassword) => {
  const token = localStorage.getItem('token');
  try {
      const response = await axios.put(`${API_URL}/update`, {
          email,
          oldPassword,
          newPassword
      }, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
      return response.data;
  } catch (error) {
      console.error('Error updating user:', error);
      throw error;
  }
};