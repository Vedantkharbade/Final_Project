import React, { useState } from 'react';
import styles from './FolderContainer.module.css';
import { delete_icon } from '../data/useImportAssets';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFolderApi } from '../api/folder';
import { setFolderId, clearFolderId } from '../configureslice/workspaceSlice';
import ModalPage from './ModalPage';

const FolderContainer = ({ folders, fetchFolders }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const dispatch = useDispatch();
  const currentFolderId = useSelector((state) => state.workspace.folderId);

  const handleDeleteClick = (folderId) => {
    setSelectedFolderId(folderId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteFolderApi(selectedFolderId);
      toast.success('Folder deleted successfully');
      setIsModalOpen(false);
      fetchFolders();
      if (currentFolderId === selectedFolderId) {
        dispatch(clearFolderId());
      }
    } catch (error) {
      toast.error('Failed to delete folder');
      console.error('Error deleting folder:', error);
    }
  };

  const handleFolderClick = (folderId) => {
    if (currentFolderId === folderId) {
      dispatch(clearFolderId());
    } else {
      dispatch(setFolderId(folderId));
    }
  };

  if (!folders.length) {
    return <div>No folders found</div>;
  }

  return (
    <div className={styles.folder_div}>
      
      {folders.map(folder => (
        <div
          key={folder.id}
          className={`${styles.folder} ${currentFolderId === folder.id ? styles.active : ''}`}
          onClick={() => handleFolderClick(folder.id)}
        >
          <span className={styles.folderName}>{folder.name}</span>
          <span className={styles.image} onClick={(e) => {
            e.stopPropagation();
            handleDeleteClick(folder.id);
          }}>
            <img src={delete_icon} alt="delete" />
          </span>
        </div>
      ))}
      <div className={styles.modal}>
        <ModalPage
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          handleConfirm={handleConfirmDelete}
          message="Are you sure you want to delete this folder?"
          confirmButtonText="Confirm"
          showInput={false}
        />
      </div>
    </div>
  );
};

export default FolderContainer;









