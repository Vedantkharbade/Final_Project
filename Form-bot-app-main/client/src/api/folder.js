import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

const getConfig = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const createFolderApi = async ({ name, parentFolderId }) => {
  try {
    const config = getConfig();
    const response = await axios.post(`${API_URL}/create-folder`, {
      name,
      parentFolderId
    }, config);
    return response.data;
  } catch (error) {
    let errorMessage = 'An unexpected error occurred';
    if (error.response) {
      errorMessage = error.response.data.error || 'Server error';
    } else if (error.request) {
      errorMessage = 'Network error: Please try again later.';
    } else {
      errorMessage = error.message;
    }
    throw new Error(errorMessage);
  }
};

export const getFoldersApi = async () => {
  try {
    const config = getConfig();
    const response = await axios.get(`${API_URL}/getfolders`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching folders:', error);
    throw error;
  }
};

export const deleteFolderApi = async (folderId) => {
  try {
    const config = getConfig();
    const response = await axios.delete(`${API_URL}/folders/${folderId}`, config);
    return response;
  } catch (error) {
    console.error('Error deleting folder:', error);
    throw error;
  }
};

export const getAllFoldersApi = async (folderId) => {
  try {
    const config = getConfig();
    const response = await axios.get(`${API_URL}/allfolders`, {
      params: { folderId },
      ...config
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching all folders:', error);
    throw error;
  }
};
