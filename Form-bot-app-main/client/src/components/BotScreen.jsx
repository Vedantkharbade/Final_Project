//==================================================
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { fetchFormData, saveResponses, completeSubmission } from '../utils/formUtils';
import { initializeChatHistory, addBubbleToChatHistory } from '../utils/chatUtils';
import { handleInputSubmitUtil } from '../utils/inputUtils';
import BubbleContent from './PublishDesktop/BubbleContent';
import InputField from '../utils/InputField';
import styles from './BotScreen.module.css';
import { bot, send } from '../data/useImportAssets';
import { saveUserResponses } from '../api/analyticsService';

const FormDisplay = () => {
  const { shareableLink } = useParams();
  const [sessionId, setSessionId] = useState(uuidv4());
  const [formDetails, setFormDetails] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [userResponse, setUserResponse] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [allResponses, setAllResponses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFormData(shareableLink, sessionId);
      setFormDetails(data);
    };

    fetchData();
  }, [shareableLink]);
 console.log(formDetails)
  useEffect(() => {
    if (formDetails && isChatStarted && currentIndex >= 0) {
      const currentField = formDetails.fields[currentIndex];
      if (currentField && currentField.type === 'bubble') {
        const timer = setTimeout(() => {
          addBubbleToChatHistory(currentField, setChatHistory, setCurrentIndex);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [formDetails, isChatStarted, currentIndex]);

  const handleButtonClick = async () => {
    setIsChatStarted(true);
    const initialChatHistory = initializeChatHistory(formDetails.fields);
    setChatHistory(initialChatHistory);
    setCurrentIndex(0);
    // await saveUserResponses(sessionId, shareableLink, [{ label: 'ButtonInput', response: 'start' }]);
    // setCurrentIndex(formDetails.fields.findIndex((field) => field.label === 'ButtonInput') + 1);
    // await saveUserResponses(sessionId, shareableLink, [{ label: 'ButtonInput', response: 'start' }]);
  };

  const handleInputChange = (e) => {
    setUserResponse(e.target.value);
  };

  const handleInputSubmit = async () => {
    await handleInputSubmitUtil(
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
    );
  };

  if (!formDetails) {
    return <div>Loading...</div>;
  }

  const renderField = (field, index) => {
    if (field.type === 'bubble') {
      return <BubbleContent key={index} content={field.content} />;
    } else if (field.label === 'ButtonInput') {
      return (
        <button key={index} onClick={handleButtonClick} className={styles.startButton}>
          {field.content}
        </button>
      );
    }
  };

  const renderChatContent = (entry, index) => {
    const isBubble = entry.type === 'bubble';
    const contentClass = isBubble ? styles.bubble : styles.input;
    const labelClass = !isBubble && styles[entry.contentType]; // Dynamic class based on field label
    console.log(currentField)
    switch (entry.contentType) {
      case 'Image':
        return (
          <div className={`${styles.bubblePlacement} ${contentClass} ${labelClass} ${styles.show}`} key={index}>
            {isBubble && <img src={bot} alt="" className={styles.botImage} />}
            <img src={entry.content} alt="Chat content" className={styles.chatImage} />
          </div>
        );
      case 'Video':
        return (
          <div className={`${styles.bubblePlacement} ${contentClass} ${labelClass} ${styles.show}`} key={index}>
            {isBubble && <img src={bot} alt="" className={styles.botImage} />}
            <video controls className={styles.chatVideo}>
              <source src={entry.content} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      case 'GIF':
        return (
          <div className={`${styles.bubblePlacement} ${contentClass} ${labelClass} ${styles.show}`} key={index}>
            {isBubble && <img src={bot} alt="" className={styles.botImage} />}
            <img src={entry.content} alt="Chat content" className={styles.chatGif} />
          </div>
        );
      default:
        return (
          <div className={`${styles.bubblePlacement} ${contentClass} ${styles.show}`} key={index}>
            {isBubble && <img src={bot} alt="" className={styles.botImage} />}
            <div className={`${labelClass}`}>{entry.content}</div>
            {!isBubble && (
               <div className={`${styles.ChatsubmitButton} ${labelClass}`}>
               <img src={send} className={styles.chat_send_icon} />
               </div>
            )}
          </div>
        );
    }
  };
  

  const currentField = formDetails.fields[currentIndex];
  const shouldDisplayInputField = currentIndex >= 0 && currentField && currentField.type !== 'bubble';

  return (
    <div className={`${styles.formContainer} ${styles[formDetails.background]}`}>
      {!isChatStarted && (
              <div className={styles.initialContainer}>
              <div className={styles.initialGreeting}>
                <img src={bot} alt="Bot" className={styles.botImage} />
                <div className={styles.greetingText}>Hello</div>
              </div>
              <div className={styles.initialGreetingUser}>
                <button onClick={handleButtonClick} className={styles.startButton}>
                  Hi
                </button>
              </div>
            </div>
      )}
      <div className={styles.chatAndForm}>
        <div>
        {isChatStarted && (
          <div className={styles.chatHistory}>
            {chatHistory.map((entry, index) => (
              <div key={index} className={styles.chatContainer}>
                {renderChatContent(entry, index)}
              </div>
            ))}
          </div>
        )}
        </div>
        <div>
        {isChatStarted && (
          <div className={styles.formFields}>
            {shouldDisplayInputField && (
              <div className={styles.fieldContainer}>
                <InputField
                  field={currentField}
                  value={userResponse}
                  onChange={handleInputChange}
                  onSubmit={handleInputSubmit}
                />
                {currentField.label !== 'ButtonInput' && (
                  <div className={styles.submitButton}>
                     <img src={send} onClick={handleInputSubmit} />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default FormDisplay;


















































