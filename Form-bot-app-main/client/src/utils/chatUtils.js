// chatUtils.js
export const initializeChatHistory = (fields) => {
    const initialField = fields[0];
    return [];
  };
  
  export const addBubbleToChatHistory = (field, setChatHistory, setCurrentIndex) => {
    setChatHistory((prevHistory) => [
      ...prevHistory,
      {
        type: 'bubble',
        content: field.content,
        contentType: field.label || 'text',
      },
    ]);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };
  