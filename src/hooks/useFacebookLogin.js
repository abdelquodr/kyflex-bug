import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useAxios } from '../lib/apiClient';
import { useUpdateUser, useUpdateTokens } from '../contexts/UserContext';
import { useLocation } from 'react-router';

const url = window.location.origin;
const facebookAuthUrl = `http://localhost:8000/auth/o/facebook/?redirect_uri=http://localhost:3000/callback/facebook`

export const useGetFacebookLogin = () => {
  const history = useHistory()
  // const location = useLocation()
  const updateUser = useUpdateUser();
  const updateTokens = useUpdateTokens();

  const [{ data, error }, getFLogin] = useAxios(
    { url: facebookAuthUrl, method: 'GET' },
    { manual: true }
  );

  useEffect(() => {
    if (data) {
      window.location.assign(data.authorizationUrl);
    }
  }, [data]);

  return {
    error,
    getFLogin: useCallback(() => {
      return getFLogin();
    }),
  };
};

export const usePostFacebookLogin = () => {
  const updateUser = useUpdateUser();
  const updateTokens = useUpdateTokens();
  const history = useHistory();

  const [{ data, error }, postFLogin] = useAxios(
    { url: facebookAuthUrl, method: 'POST', 'headers': {'Content-Type': 'application/x-www-form-urlencoded'}},
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
    postFLogin: useCallback((state, code) => {
      return postFLogin({data: `state=${state}&code=${code}`});
    }),
  };
};
