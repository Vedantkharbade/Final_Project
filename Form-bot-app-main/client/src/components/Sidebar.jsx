// src/components/Sidebar.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { addField } from '../configureslice/workspaceSlice';
import styles from './Sidebar.module.css';
import {button,ratings,date,text,video,atrate,phone,inputtext,hash,image,gif_icon} from '../data/useImportAssets'
const Sidebar = () => {
  const dispatch = useDispatch();

  const handleAddField = (type, label) => {
    const id = Date.now();
    dispatch(addField({
      id,
      label,
      type, // "bubble" or "input"
      required: false,
      options: [],
      errorMessage: '',
      content: '', // For bubbles
      value: '' // For inputs
    }));
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.section_container}>
      <div className={styles.section}>
        <h3 className={styles.title}>Bubbles</h3>
        <div className={styles.grid}>
          <div className={styles.item}>
            <img src={text} alt="" />
          <button className={styles.button} onClick={() => handleAddField('bubble', 'Text')}>Text</button>
          </div>
          <div className={styles.item}>
            <img src={image} alt="" />
          <button className={styles.button} onClick={() => handleAddField('bubble', 'Image')}>Image</button>
          </div>
          <div className={styles.item}>
            <img src={video} alt="" />
          <button className={styles.button} onClick={() => handleAddField('bubble', 'Video')}>Video</button>
          </div>
          <div className={styles.item}>
            <img src={gif_icon} alt="" />
          <button className={styles.button} onClick={() => handleAddField('bubble', 'GIF')}>GIF</button>
          </div>
        </div>
      </div>
      <div className={styles.section}>
        <h3 className={styles.title}>Inputs</h3>
        <div className={styles.grid}>
          <div className={styles.item}>
            <img src={inputtext} alt="" />
            <button className={styles.button} onClick={() => handleAddField('input', 'TextInput')}>Text</button>
          </div>
          <div className={styles.item}>
            <img src={hash} alt="" />
            <button className={styles.button} onClick={() => handleAddField('input', 'NumberInput')}>Number</button>
          </div>
          <div className={styles.item}>
            <img src={atrate} alt="" />
            <button className={styles.button} onClick={() => handleAddField('input', 'EmailInput')}>Email</button>
          </div>
          <div className={styles.item}>
            <img src={phone} alt="" />
            <button className={styles.button} onClick={() => handleAddField('input', 'PhoneInput')}>Phone</button>
          </div>
          <div className={styles.item}>
            <img src={date} alt="" />
            <button className={styles.button} onClick={() => handleAddField('input', 'DateInput')}>Date</button>
          </div>
          <div className={styles.item}>
            <img src={ratings} alt="" />
             <button className={styles.button} onClick={() => handleAddField('input', 'RatingInput')}>Rating</button>
          </div>
          <div className={styles.item}>
            <img src={button} alt="" />
            <button className={styles.button} onClick={() => handleAddField('input', 'ButtonInput')}>Button</button>
          </div>  
        </div>
      </div>
      </div>
    </div>
  );
};

export default Sidebar;



