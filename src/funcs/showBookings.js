import React from 'react';
import { Booking } from '../components';

/*
	THis function renders an array of bookings
	utilizing booking component.
*/

const ShowBookings = (type = 'pending', data) => {
  const renderRequests = () => {
    return data.map((each) => {
      const { id, from, to, target, status } = each;
      return (
        <Booking
          type={type}
          key={id}
          from={from}
          to={to}
          target={target}
          status={status}
          toAccept={() => alert(`request form ${from} accepted`)}
          toDecline={() => alert(`request form ${from} rejected`)}
        />
      );
    });
  };

  return <>{renderRequests()}</>;
};

export { ShowBookings };
