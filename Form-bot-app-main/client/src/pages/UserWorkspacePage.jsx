import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createFolderApi } from '../api/folder';
import useFolders from '../hooks/useFolders';
import useForms from '../hooks/useForms';
import FolderContainer from '../components/FolderContainer';
import ModalPage from '../components/ModalPage';
import FormList from '../components/FormList';
import styles from './UserWorkspace.module.css';
import { img_folder, add_symbol, arrow_down, arrow_up } from '../data/useImportAssets';
import { clearFolderId } from '../configureslice/workspaceSlice';
import { setIsAuthenticated, setCurrentUser } from '../configureslice/reduxSlice';


const UserWorkspacePage = () => {
  const { currentUser} = useSelector((state) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { folders, fetchFolders } = useFolders();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { forms, loading, error } = useForms();

  const handleSelectChange = (event) => {
    const value = event.target.getAttribute('data-value');
    if (value === 'settings') {
      navigate('/settings');
    } else if (value === 'logout') {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      dispatch(setIsAuthenticated(false));
      dispatch(setCurrentUser(null));
      // navigate('/');
    }
    setIsDropdownOpen(false);
  };

  const handleCreateFolder = async (name) => {
    if (!name.trim()) {
      toast.error('Folder name is required');
      return;
    }
    try {
      await createFolderApi({ name });
      toast.success('Folder created successfully');
      setIsModalOpen(false);
      await fetchFolders(); // Ensure folders are refetched after creation
    } catch (error) {
      toast.error('Failed to create folder');
      console.error('Error creating folder:', error);
    }
  };

  const handleClearFolder = () => {
    dispatch(clearFolderId());
  };

  return (
    <div className={styles.workspace_body}>
      <header className={styles.header}>
        <div
          className={`${styles.user_title} ${styles.dropdown}`}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>{currentUser.username}'s workspace</span>
          <span style={{ marginLeft: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {isDropdownOpen ? <img src={arrow_up} alt="arrow_up" /> : <img src={arrow_down} alt="arrow_down" />}
          </span>

          <div
            className={`${styles.dropdownMenu} ${isDropdownOpen ? styles.show : ''}`}
          >
            <div
              className={styles.dropdownItem}
              data-value="settings"
              onClick={handleSelectChange}
            >
              Settings
            </div>
            <div
              className={`${styles.dropdownItem} ${styles.logout}`}
              data-value="logout"
              onClick={handleSelectChange}
            >
              Log Out
            </div>
          </div>
        </div>
      </header>

      <section className={styles.container}>
        <div className={styles.folder_div}>
          <div className={styles.folder_container} onClick={() => setIsModalOpen(true)}>
            <div className={styles.folder_img}>
            <img src={img_folder} alt="folder"/>
            </div>
            <div className={styles.folder_title}>
            <span className={styles.typography}>Create a folder</span>
            </div>
          </div>
          <div >
            <FolderContainer folders={folders} fetchFolders={fetchFolders} />
          </div>
        </div>
        <div className={styles.formList}>
           <section className={styles.formListContainer}>
              {loading ? (
               <p>Loading...</p>
                ) : error ? (
                  <p>Error: {error.message}</p>
                ) : (
                  <FormList forms={forms} onClearFolder={handleClearFolder} />
                )}
              </section>
           <div className={styles.modal}>
           <ModalPage
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleConfirm={handleCreateFolder}
            message="Create a new folder"
            confirmButtonText="Add"
            showInput={true}
          />
           </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default UserWorkspacePage;








