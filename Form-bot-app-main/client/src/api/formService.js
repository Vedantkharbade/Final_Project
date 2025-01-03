import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const getToken = () => localStorage.getItem('token'); 

export const saveFormToServer = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/createform`, formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`, // Include the token here
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error) {
    console.error('Error saving form:', error);
    throw error; // Re-throw the error for further handling
  }
};

export const shareFormToServer = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/${formData._id}/share`, {}, {
      headers: {
        Authorization: `Bearer ${getToken()}`, // Include the token here
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error) {
    console.error('Error sharing form:', error);
    throw error; // Re-throw the error for further handling
  }
};

export const getFormData = async (shareableLink) => {
  try {
    const response = await axios.get(`${API_URL}/forms/public/${shareableLink}`);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error getting form data:', error);
    throw error; // Re-throw the error for further handling
  }
};

export const getFormsApi = async () => {
  try {
    const response = await axios.get(`${API_URL}/getforms`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteFormApi = async (formId) => {
  try {
    const response = await axios.delete(`${API_URL}/${formId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`, // Include the token here
      },
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error deleting form:', error);
    throw error; // Re-throw the error for further handling
  }
};

export const updateFormApi = async (formId, formData) => {
  try {
    const response = await axios.put(`${API_URL}/forms/${formId}`, formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating form:', error);
    throw error;
  }
};

export const getForm = async (formId) => {
  try {
    const response = await axios.get(`${API_URL}/${formId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting form:', error);
    throw error;
  }
};






