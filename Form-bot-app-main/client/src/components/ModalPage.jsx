// pages/ModalPage.js
import React, { useEffect, useRef, useState } from 'react';
import styles from './ModalPage.module.css';

const ModalPage = ({ message, isModalOpen, setIsModalOpen, handleConfirm, showInput, confirmButtonText }) => {
  const modalRef = useRef();
  const [folderName, setFolderName] = useState('');

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isModalOpen]);

  const handleDone = () => {
    handleConfirm(folderName);
  };

  return (
    <>
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal} ref={modalRef}>
            <h2 className={styles.typography}>{message}</h2>
            {showInput && (
              <input
                type="text"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="Enter folder name"
              />
            )}
            <div className={styles.button_container}>
              <button onClick={handleDone}>{confirmButtonText}</button>
              <div className={styles.divider}></div>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalPage;


