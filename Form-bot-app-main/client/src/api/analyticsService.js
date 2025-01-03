import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const getToken = () => localStorage.getItem('token');

export const saveUserResponses = async (sessionId, shareableLink, userResponses) => {
  const response = await axios.post(`${API_URL}/submissions`, {
    sessionId,
    shareableLink,
    userResponses,
  });
  return response.data;
};

export const getUserResponses = async (sessionId) => {
  const response = await axios.get(`${API_URL}/submissions/${sessionId}`);
  return response.data.userResponses;
};

export const getFormAnalytics = async (shareableLink) => {
  try {
    const response = await axios.get(`${API_URL}/analytics/${shareableLink}`);
    return response.data;
  } catch (error) {
    console.error('Error getting form analytics:', error);
    throw error;
  }
};

export const markSubmissionComplete = async (sessionId, shareableLink) => {
  await axios.post(`${API_URL}/submissions/complete`, { sessionId, shareableLink });
};

export const incrementViewCount = async (sessionId, shareableLink) => {
  await axios.post(`${API_URL}/views`, { sessionId, shareableLink });
};

