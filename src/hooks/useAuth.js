import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../store/authSlice';

export const useAuth = () => {
  const { user, loading, isAuthenticated, initialized } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Only fetch if not already initialized
    if (!initialized && !loading) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, initialized, loading]);

  const logout = async () => {
    await dispatch(logoutUser());
    navigate('/login');
  };

  return {
    user,
    loading,
    isAuthenticated,
    initialized,
    logout,
  };
};