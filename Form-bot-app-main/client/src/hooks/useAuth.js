import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ValidateExitToken } from '../api/user';
import { setCurrentUser, setIsAuthenticated } from '../configureslice/reduxSlice';

const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const username = localStorage.getItem('username');

      if (token) {
        try {
          const isValid = await ValidateExitToken(token);
          if (isValid) {
            dispatch(setCurrentUser({ userId, username }));
            dispatch(setIsAuthenticated(true));
          } else {
            localStorage.clear();
            dispatch(setIsAuthenticated(false));
          }
        } catch (error) {
          console.error('Token validation error:', error);
          localStorage.clear();
          dispatch(setIsAuthenticated(false));
        }
      } else {
        dispatch(setIsAuthenticated(false));
      }
      setLoading(false);
    };

    checkAuth();
  }, [dispatch]);

  return { isAuthenticated, loading };
};

export default useAuth;
