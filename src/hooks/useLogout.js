import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
  useRemoveUser,
  useUpdateTokens,
  useTokens,
} from '../contexts/UserContext';

import apiClient from '../lib/apiClient';

export const useLogout = () => {
  const history = useHistory();

  const removeUser = useRemoveUser();
  const updateTokens = useUpdateTokens();
  const [accessToken, refresh] = useTokens();

  return useCallback(async () => {
    try {
      await apiClient.post('auth/logout/', { refresh });
    } catch (error) {
      console.error(error);
    }
    updateTokens();
    removeUser();

    history.push('/home');
  }, [updateTokens, history, removeUser]);
};
