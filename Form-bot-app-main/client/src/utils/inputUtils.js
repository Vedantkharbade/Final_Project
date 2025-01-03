// inputUtils.js
import { saveResponses, completeSubmission } from './formUtils';

export const handleInputSubmitUtil = async (
  formDetails,
  currentIndex,
  userResponse,
  sessionId,
  shareableLink,
  chatHistory,
  setChatHistory,
  allResponses,
  setAllResponses,
  setCurrentIndex,
  setUserResponse
) => {
  const currentField = formDetails.fields[currentIndex];
  const newResponses = [
    ...chatHistory,
    { type: 'user', content: userResponse, contentType: currentField.label },
  ];
  setChatHistory(newResponses);
  const updatedResponses = [
    ...allResponses,
    { label: currentField.label, response: userResponse },
  ];
  setAllResponses(updatedResponses);
  setUserResponse('');
  setCurrentIndex((prevIndex) => prevIndex + 1);

  await saveResponses(sessionId, shareableLink, updatedResponses);

  const allFieldsAnswered = formDetails.fields.every((field) =>
    updatedResponses.some((response) => response.label === field.label)
  );

  if (allFieldsAnswered) {
    await completeSubmission({ sessionId, shareableLink });
  }
};
