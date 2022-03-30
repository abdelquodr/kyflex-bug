import { useLocalStorage } from '@rehooks/local-storage';

export const useIsLoggedIn = () => {
  const [storedTokens] = useLocalStorage('ky-tokens');

  return storedTokens && !!storedTokens.accessToken;
};
