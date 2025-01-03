

import { text, delete_icon } from '../data/useImportAssets';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateField, deleteField } from '../configureslice/workspaceSlice';
import styles from './Bubble.module.css';

const Bubble = ({ field }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(field.content);

  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value);
    dispatch(updateField({ id: field.id, updates: { content: value } }));
  };

  const handleDelete = () => {
    dispatch(deleteField({ id: field.id }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const fileUrl = reader.result;
      setValue(fileUrl);
      dispatch(updateField({ id: field.id, updates: { content: fileUrl } }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const renderFileUpload = (label) => (
    <div className={styles.bubble_text}>
      <div className={styles.delete_image}>
        <img src={delete_icon} alt="delete" className={styles.delete} onClick={handleDelete} />
      </div>
      <h3 className={styles.typography}>{label}</h3>
      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileUpload}
        id={`file-upload-${field.id}`}
        className={styles.hidden_file_input}
      />
      <button
        type="button"
        onClick={() => document.getElementById(`file-upload-${field.id}`).click()}
        className={styles.custom_file_button}
      >
        Click here to add {label} Link
      </button>
    </div>
  );

  switch (field.label) {
    case 'Text':
      return (
        <div className={styles.bubble_text}>
          <div className={styles.delete_image}>
            <img src={delete_icon} alt="delete" className={styles.delete} onClick={handleDelete} />
          </div>
          <h3 className={styles.typography}>{field.label}</h3>
          <div className={styles.input}>
            <img src={text} alt="text" className={styles.image} />
            <input
              type="text"
              value={value}
              onChange={handleChange}
              className={styles.textarea}
              placeholder="Click here to edit"
            />
          </div>
          {!value && <p className={styles.para}>Required Field</p>}
        </div>
      );
    case 'Image':
    case 'Video':
    case 'GIF':
      return renderFileUpload(field.label);
    default:
      return null;
  }
};

export default Bubble;

// File: src/components/Bubble.js













