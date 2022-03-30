import { useCallback, useEffect } from 'react';
import { useAxios } from '../lib/apiClient';

export const useResetPassword = () => {
  const [{ data, error }, postResetPassword] = useAxios(
    { url: `/users/reset_password_confirm/`, method: 'POST', 'headers': {'Content-Type': 'application/json'}},
    { manual: true }
  );

  useEffect(() => {
    if (data) {
    }
  }, [data]);

  return {
    error,
    postResetPassword: useCallback((formData) => {
      return postResetPassword({data: formData});
    }),
  };
};
