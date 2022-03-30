import { useEffect } from 'react';
// import { useCookies } from 'react-cookie';

import { useLogout } from '.';
import apiClient, { useAxios } from '../lib/apiClient';
import { useTokens, useUpdateTokens } from '../contexts/UserContext';

const useAxiosTokens = () => {
  const logout = useLogout();
  const [accessToken, refreshToken] = useTokens();
  const updateTokens = useUpdateTokens();

  useEffect(() => {
    if (accessToken) {
      apiClient.defaults.headers = {
        ...apiClient.defaults.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    } else {
      delete apiClient.defaults.headers.Authorization;
    }

    const response = apiClient.interceptors.response.use(
      (response) => response,
      (error) => {
        const originalRequest = error.config;
        const refreshUrl = '/auth/jwt/refresh/';

        if (
          error &&
          error.response &&
          error.response.status === 401 &&
          error.config.url !== 'auth/logout/'
        ) {
          if (
            !originalRequest._retry &&
            refreshToken &&
            originalRequest.url !== refreshUrl
          ) {
            originalRequest._retry = true;

            return apiClient
              .post(refreshUrl, { refresh: refreshToken })
              .then((res) => {
                if (res.status === 200) {
                  updateTokens(res.data.access, res.data.refresh);

                  return apiClient(originalRequest);
                }
                return res;
              })
              .catch((error) => {
                return error;
              });
          } else {
            logout();
          }
        }

        return Promise.reject(error);
      }
    );

    useAxios.configure({ axios: apiClient });

    return () => {
      apiClient.interceptors.response.eject(response);
    };
  }, [accessToken, refreshToken, updateTokens]);
};

export { useAxiosTokens };
