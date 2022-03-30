import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { useLocalStorage } from '@rehooks/local-storage';

import apiClient from '../lib/apiClient';
import { useIsLoggedIn } from '../hooks/useIsLoggedIn';

export const UserContext = createContext({
  user: null,
  updateUser: () => {},
  removeUser: () => {},
  updateTokens: () => {},
  getTokens: () => {},
  tokens: ['', ''],
  sessionInfo: null,
  updateSessionInfo: () => {},
});

export const useUser = () => {
  const updateUser = useUpdateUser();
  const user = useContext(UserContext).user;
  useEffect(() => {
    if (!user) {
      return updateUser(null);
    }
  }, [user, updateUser]);

  return user;
};
export const useUserContext = () => useContext(UserContext);
export const useUpdateUser = () => useContext(UserContext).updateUser;
export const useRemoveUser = () => useContext(UserContext).removeUser;
export const useTokens = () => {
  const { tokens, getTokens } = useContext(UserContext);

  const [accessToken, refreshToken] = tokens;
  useEffect(() => {
    if (!accessToken || !refreshToken) {
      getTokens();
    }
  }, [accessToken, refreshToken, getTokens]);

  return tokens;
};
export const useUpdateTokens = () => useContext(UserContext).updateTokens;
export const useUpdateSessionInfo = () =>
  useContext(UserContext).updateSessionInfo;

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [storedTokens, setStoredTokens] = useLocalStorage('ky-tokens', {
    accessToken: '',
    refreshToken: '',
  });
  const [sessionInfo, setSessionInfo] = useLocalStorage('ky-session', {
    isHost: false,
  });
  const [loginAsHost, setLoginAsHost] = useState(sessionInfo.isHost);
  const [accessToken, setAccessToken] = useState(storedTokens.accessToken);
  const [refreshToken, setRefreshToken] = useState(storedTokens.refreshToken);

  const isLoggedIn = useIsLoggedIn();

  const safelySetUser = useCallback(
    (user) => {
      setUser({
        ...user,
      });
    },
    [setUser]
  );

  const fetchUser = useCallback(() => {
    const endpoint = `/users/me/?is_host=${loginAsHost}`;

    apiClient
      .get(endpoint)
      .then((res) => {
        if (res.status === 200) {
          safelySetUser(res.data);
        }
      })
      .catch((err) => console.log(err.response));
  }, [loginAsHost, safelySetUser]);

  useEffect(() => {
    if (!user?.pk && isLoggedIn) {
      apiClient
        .get(`/users/me/?is_host=${loginAsHost}`)
        .then((res) => {
          if (res.status === 200) {
            safelySetUser(res.data);
          } else {
            setUser(null);
          }
        })
        .catch((err) => console.log(err.response));
    }
  }, [user?.pk, isLoggedIn, safelySetUser]);

  useEffect(() => {
    if (user?.pk && !user?.profile) {
      fetchUser();
    }
  }, [user?.pk, !user?.profile, fetchUser]);

  const updateUser = useCallback(
    (user) => {
      if (user) {
        return safelySetUser(user);
      }
      fetchUser();
    },
    [fetchUser, safelySetUser]
  );

  const removeUser = useCallback(() => {
    setUser({});
    setSessionInfo({});
  }, [setUser, setSessionInfo]);

  const updateTokens = useCallback(
    (accessToken = '', refreshToken = '') => {
      setStoredTokens({ accessToken, refreshToken });
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      return [accessToken, refreshToken];
    },
    [setAccessToken, setRefreshToken, setStoredTokens]
  );

  const getTokens = useCallback(() => {
    if (storedTokens.accessToken && storedTokens.refreshToken) {
      updateTokens(storedTokens.accessToken, storedTokens.refreshToken);
    }
  }, [storedTokens.accessToken, storedTokens.refreshToken, updateTokens]);

  const updateSessionInfo = useCallback(
    (newSessionInfo) => {
      if (newSessionInfo) {
        setSessionInfo({ ...sessionInfo, ...newSessionInfo });
        setLoginAsHost(newSessionInfo.isHost);
      }
    },
    [sessionInfo, setSessionInfo, setLoginAsHost]
  );

  const tokens = useMemo(
    () => [accessToken, refreshToken],
    [accessToken, refreshToken]
  );

  const value = useMemo(
    () => ({
      user,
      updateUser,
      removeUser,
      getTokens,
      updateTokens,
      tokens,
      sessionInfo,
      updateSessionInfo,
    }),
    [
      user,
      updateUser,
      removeUser,
      getTokens,
      updateTokens,
      tokens,
      sessionInfo,
      updateSessionInfo,
    ]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
