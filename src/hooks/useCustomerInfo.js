import useAxios from 'axios-hooks';
import { useCallback, useEffect } from 'react';

export const useGetCustomerById = (customerId, callback) => {
  const [{ error }, getCustomerById] = useAxios(
    {
      url: `/api-users/customers/${customerId}`,
      method: 'GET',
    },
    { manual: true }
  );

  return {
    error,
    getCustomerById: useCallback(() => {
      return getCustomerById();
    }),
  };
};
