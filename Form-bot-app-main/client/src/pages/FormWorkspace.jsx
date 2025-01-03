

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Workspace from '../components/Workspace';
import { resetForm, setFormDetails, updateWorkspaceFields } from '../configureslice/workspaceSlice';
import styles from './FormWorkspace.module.css';
import { getFormData } from '../api/formService';
import { handleSave } from '../utils/FormSaveHandler';
import { handleShare } from '../utils/FormShareHandler';
import { check,close } from '../data/useImportAssets';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormWorkspace = () => {
  const { id } = useParams(); // Get shareable link from URL
  const [formId, setFormId] = useState(id);
  const [linkCopied, setLinkCopied] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state
  const [error, setError] = useState(null); // Added error state
  const dispatch = useDispatch();
  const fields = useSelector((state) => state.workspace.fields);
  const formDetails = useSelector((state) => state.workspace.formDetails);
  const navigate = useNavigate();
  const folderId = useSelector((state) => state.workspace.folderId);

  useEffect(() => {
    const fetchFormData = async () => {
      setLoading(true);
      try {
        // Fetch detailed form data using shareableLink
        const data = await getFormData(formId);

        // Dispatch form details to the store
        dispatch(setFormDetails({
          title: data.title,
          background:data.background,
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
      // If no ID, reset form for a new form creation
      dispatch(resetForm());
    }
  }, [id, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={() => navigate('/')}>Go Back</button> {/* Navigate to another page */}
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.form_name}>
          <input 
            type="text" 
            placeholder="Enter form name" 
            className={styles.formname_input}
            value={formDetails.title || ''} // Ensure value is controlled
            onChange={(e) => dispatch(setFormDetails({ ...formDetails, title: e.target.value }))}
          />
        </div>
        <div className={styles.button_container}>
          <button className={`${styles.button} ${styles.active}`} onClick={() => navigate('/form')}>Flow</button>
          <button className={styles.button} onClick={() => navigate(`/theme/${formId}`)}>Theme</button>
          <button className={styles.button} onClick={()=>navigate(`/analytics/${id}`)}>Response</button>
        </div>
        <div className={styles.button}>
          <button className={styles.share} onClick={() => handleShare(formId, setLinkCopied)}>Share</button>
          <button className={styles.save} onClick={() => handleSave(formDetails, fields, folderId, setFormId, dispatch)}>Save</button>
          <img src={close} alt="close image" onClick={() => navigate('/workspace')}/>
        </div>
      </header>
      {linkCopied && <div className={styles.linkCopied}>
            <img src={check} />
            <p className={styles.link_para}> Link copied!</p>
            </div>}
      <div className={styles.container}>
        <Sidebar />
        <Workspace />
      </div>
      <ToastContainer/>
    </div>
  );
};

export default FormWorkspace;














