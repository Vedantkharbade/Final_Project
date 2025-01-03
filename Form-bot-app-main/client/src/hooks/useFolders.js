import { useState, useEffect, useCallback } from 'react';
import { getFoldersApi } from '../api/folder';

const useFolders = () => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchFolders = useCallback(async () => {
    try {
      const response = await getFoldersApi();
      setFolders(response.folders);
    } catch (err) {
      setError('Failed to fetch folders');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFolders();
  }, [fetchFolders]);

  return { folders, loading, error, fetchFolders };
};

export default useFolders;

