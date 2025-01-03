import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAllFoldersApi } from '../api/folder';
import { getFormsApi } from '../api/formService';

const useForms = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const folderId = useSelector((state) => state.workspace.folderId);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        if (folderId) {
          // Fetch folders with forms
          const response = await getAllFoldersApi(folderId);
          console.log('Fetched folders with forms:', response); // Debug line

          // Find the folder with the matching folderId
          const folder = response.find(folder => folder.id === folderId);
          console.log(folder)
          if (folder) {
            // Set forms from the selected folder
            setForms(folder.forms || []);
          } else {
            setForms([]);
          }
        } else {
          // Fetch all forms
          const response = await getFormsApi();
          console.log('Fetched all forms:', response); // Debug line
          setForms(response.data || []);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, [folderId]);

  return { forms, setForms, loading, error };
};

export default useForms;

