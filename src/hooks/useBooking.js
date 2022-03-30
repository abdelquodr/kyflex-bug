import React from 'react';
import { useAxios } from '../lib/apiClient';
import { useCallback, useEffect, useState } from 'react';
import { Booking } from '../components';

export const useBookingStatus = (bookingId, callback) => {
  const [{ data, error }, updateBookingStatus] = useAxios(
    {
      url: `/api-booking/${bookingId}/`,
      method: 'PATCH',
    },
    { manual: true }
  );
  useEffect(() => {
    if (data) {
      // console.log(data);
    }
  }, [data]);

  return {
    error,
    updateBookingStatus: useCallback((formData) => {
      return updateBookingStatus({ data: formData });
    }),
  };
};

export const usePostBooking = () => {
  const url = '/bookings/';
  const [{ data, error, loading }, postBooking] = useAxios(
    { url, method: 'POST' },
    {
      manual: true,
    }
  );
  return {
    data,
    error,
    loading,
    postBooking: useCallback((formData) => {
      return postBooking({ data: formData });
    }),
  };
};

export const useDeleteBooking = (bookingId) => {
  const url = `/api-booking/${bookingId}`;
  const [{ error, loading }, deleteBooking] = useAxios(
    { url, method: 'DELETE' },
    {
      manual: true,
    }
  );
  return {
    error,
    loading,
    deleteBooking: useCallback(() => {
      return deleteBooking();
    }),
  };
};
