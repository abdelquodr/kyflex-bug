import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import apiClient, { useAxios } from '../lib/apiClient';
import { useUpdateUser, useUpdateTokens } from '../contexts/UserContext';
import { useLocation } from 'react-router';

const url = window.location.origin;
const googleAuthUrl = `/auth/o/google-oauth2/?redirect_uri=${url}/callback/google`

export const useGetGoogleLogin = () => {
  const history = useHistory()
  // const location = useLocation()
  const updateUser = useUpdateUser();
  const updateTokens = useUpdateTokens();

  const [{ data, error }, getGLogin] = useAxios(
    { url: googleAuthUrl, method: 'GET' },
    { manual: true }
  );

  useEffect(() => {
    if (data) {
      window.location.assign(data.authorizationUrl);
    }
  }, [data]);

  return {
    error,
    getGLogin: useCallback(() => {
      return getGLogin();
    }),
  };
};

export const usePostGoogleLogin = () => {
  const updateUser = useUpdateUser();
  const updateTokens = useUpdateTokens();
  const history = useHistory();

  const [{ data, error }, postGLogin] = useAxios(
    { url: googleAuthUrl, method: 'POST', 'headers': {'Content-Type': 'application/x-www-form-urlencoded'}},
    { manual: true }
  );

  useEffect(() => {
    if (data) {
      updateUser(data.user);
      updateTokens(data.access, data.refresh);
    }
  }, [data]);

  return {
    error,
    postGLogin: useCallback((state, code) => {
      return postGLogin({data: `state=${state}&code=${code}`});
    }),
  };
};
