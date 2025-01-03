// File: src/components/Theme.jsx

import React, { useEffect, useState } from 'react';
import styles from './Theme.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { handleSave } from '../utils/FormSaveHandler';
import { handleShare } from '../utils/FormShareHandler';
import { bot, close, theme1, theme2, theme3 } from '../data/useImportAssets';
import { resetForm, setFormDetails, setTheme, updateWorkspaceFields } from '../configureslice/workspaceSlice'; // Import the new action
import { getForm, getFormData } from '../api/formService';
import { handleUpdate } from '../utils/FormUpdate';

const themeClasses = {
  theme1: styles.theme1,
  theme2: styles.theme2,
  theme3: styles.theme3,
};

export const Theme = () => {
  const { id } = useParams();
  const [formId, setFormId] = useState(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const fields = useSelector((state) => state.workspace.fields);
  const formDetails = useSelector((state) => state.workspace.formDetails);
  const navigate = useNavigate();
  const folderId = useSelector((state) => state.workspace.folderId);

  useEffect(() => {
    const fetchFormData = async () => {
      setLoading(true);
      try {
        const data = await getFormData(id);
        setFormId(data.formId);
        dispatch(setFormDetails({
          title: data.title,
          background: data.background,
        }));
        dispatch(updateWorkspaceFields(data.fields));
      } catch (error) {
        console.error('Error fetching form data:', error);
        setError('Form not found or not public');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFormData();
    } else {
      dispatch(resetForm());
    }
  }, [id, dispatch]);

  if (loading) {
    return <div>Loading.......</div>;
  }

  const handleThemeChange = async (theme) => {
    dispatch(setTheme(theme));
    const updatedFormDetails = { ...formDetails, background: theme };
    console.log(formDetails)
    handleUpdate(updatedFormDetails, fields, folderId, setFormId, formId, dispatch);
  };
 

  return (
    <div className={`${styles.layout} ${themeClasses[formDetails.background]}`}>
      <header className={styles.header}>
        <div className={styles.button_container}>
          <button className={`${styles.button} ${styles.active}`} >Flow</button>
          <button className={styles.button}>Theme</button>
          <button className={styles.button}>Response</button>
        </div>
        <div className={styles.button_disk}>
          <button className={styles.share} onClick={() => handleShare(formId, setLinkCopied)}>Share</button>
          <button className={styles.save} onClick={() => handleUpdate(formDetails, fields, folderId, setFormId, formId, dispatch)}>Save</button>
          <img src={close} alt="close image" onClick={() => navigate(`/form/${id}`)} />
        </div>
      </header>
      <div className={styles.theme_container}>
        <section className={styles.customize_theme}>
         <div className={styles.theme_container_title}>
           customize theme page
         </div>
          <div className={styles.theme_image_one} onClick={() => handleThemeChange('theme1')}>
            <img src={theme1} alt="Theme 1" />
          </div>
          <div className={styles.theme_image_one} onClick={() => handleThemeChange('theme2')}>
            <img src={theme2} alt="Theme 2" />
          </div>
          <div className={styles.theme_image_one} onClick={() => handleThemeChange('theme3')}>
            <img src={theme3} alt="Theme 3" />
          </div>
        </section>
        <main className={`${styles.theme_workspace} ${themeClasses[formDetails.background]}`}>
          <div className={styles.bot_interface}>
            <img src={bot} alt="Bot" />
            <span className={styles.bot}>Hello</span>
          </div>
          <div className={styles.user_interface}>
            <button className={styles.bot}>Hi</button>
          </div>
        </main>
      </div>
    </div>
  );
};






