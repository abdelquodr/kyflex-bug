import React from 'react';
import { useAxios } from '../lib/apiClient';
import { useCallback, useEffect, useState } from 'react';

export const usePostReview = () => {
  const [{ data, error }, postReview] = useAxios(
    {
      url: '/reviews/',
      method: 'POST',
      headers: {
        'content-type': 'multipart/form-data',
      },
    },
    { manual: true }
  );
  return {
    data,
    error,
    postReview: useCallback((formData) => {
      return postReview({ data: formData, skipTransform: true });
    }),
  };
};
