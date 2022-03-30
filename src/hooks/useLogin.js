import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useAxios } from '../lib/apiClient';
import { useUpdateUser, useUpdateTokens } from '../contexts/UserContext';

export const useLogin = () => {
  const history = useHistory();

  const updateUser = useUpdateUser();
  const updateTokens = useUpdateTokens();

  const [{ data, error }, postLogin] = useAxios(
    { url: '/auth/jwt/create', method: 'POST' },
    { manual: true }
  );

  useEffect(() => {
    if (data) {
      updateTokens(data.access, data.refresh);
      updateUser(data.user);
    }
  }, [data]);

  return {
    error,
    postLogin: useCallback((email, password, loginAsHost) =>
      postLogin({ data: { email, password, loginAsHost } })
    ),
  };
};
