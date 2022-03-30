import { useState, useCallback, useEffect } from 'react';
import { useAxios } from '../lib/apiClient';
import {
  useUser,
  useUpdateUser,
  useUpdateTokens,
} from '../contexts/UserContext';
import { useHistory } from 'react-router-dom';

// payment intent (on-session payment)
export const useCreatePaymentIntent = (endpoint, callback) => {
  const [secretKey, setSecretKey] = useState('');
  // POST REQUEST
  const [{ data, error }, createPaymentIntent] = useAxios(
    {
      url: endpoint,
      method: 'GET',
    },
    { manual: true }
  );

  useEffect(() => {
    if (data) {
      const { clientSecret } = data;
      setSecretKey(clientSecret);
    }
  }, [data]);
  return {
    error,
    data,
    secretKey,
    createPaymentIntent: useCallback(() => {
      return createPaymentIntent();
    }),
  };
};

export const usePaymentIntentDetail = (callback) => {
  const [{ data, error }, getPaymentIntentDetail] = useAxios(
    {
      url: '/payment/payment-intent-detail',
      method: 'POST',
    },
    { manual: true }
  );

  return {
    error,
    data,
    getPaymentIntentDetail: useCallback((formData) => {
      return getPaymentIntentDetail({ data: formData });
    }),
  };
};

// Pay external account for HOST only
export const usePayExternalAccount = (callback) => {
  const user = useUser();
  const history = useHistory();
  // GET REQUEST
  const [{ data, error }, payExternalAccount] = useAxios(
    {
      url: '/payment/stripe',
      method: 'GET',
    },
    { manual: true }
  );
  return {
    error,
    data,
    payExternalAccount: useCallback((formData) => {
      return payExternalAccount({ data: formData });
    }),
  };
};
