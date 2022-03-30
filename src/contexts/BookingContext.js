import React, { useState, createContext, useMemo, useContext } from 'react';

export const BookingContext = createContext({
  successBooking: {},
  successPayment: {},
  setSuccessBooking: () => {},
  setSuccessPayment: () => {},
});

export const useBookingContext = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [successBooking, setSuccessBooking] = useState({});
  const [successPayment, setSuccessPayment] = useState(false);
  const value = useMemo(
    () => ({
      successPayment,
      setSuccessPayment,
      successBooking,
      setSuccessBooking,
    }),
    [successBooking, setSuccessBooking, successPayment, setSuccessPayment]
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};
