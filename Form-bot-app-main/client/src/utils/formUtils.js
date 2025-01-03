// formUtils.js
import { saveUserResponses, markSubmissionComplete, incrementViewCount } from '../api/analyticsService';
import { getFormData } from '../api/formService';

export const fetchFormData = async (shareableLink, sessionId) => {
  try {
    const data = await getFormData(shareableLink);
    await incrementViewCount(sessionId, shareableLink);
    return data;
  } catch (error) {
    console.error('Error fetching form data:', error);
    return null;
  }
};

export const saveResponses = async (sessionId, shareableLink, responses) => {
  try {
    await saveUserResponses(sessionId, shareableLink, responses);
  } catch (error) {
    console.error('Error saving user responses:', error);
  }
};

export const completeSubmission = async (sessionId, shareableLink) => {
  try {
    await markSubmissionComplete(sessionId, shareableLink);
  } catch (error) {
    console.error('Error marking submission complete:', error);
  }
};
