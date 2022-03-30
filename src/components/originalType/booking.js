import React from 'react';
import { Profile } from '../../assets/images';
import { Button } from '..';

/*
    This file contains single booking component, my original custom component.
    Parameters:
        type = 30-day, own, or pending
        from = requesters
        to = host of experience
        taret = target experience
        status = pending, accepted, or declined
        toAccept = call back after accepted
        toDecline = cal back after declined
*/

const Booking = (props) => {
  const { type, from, to, target, status, toAccept, toDecline } = props;

  switch (type) {
    case '30-day':
    case 'own':
      return (
        <div className="booking-block">
          <div className="booking-block-from">
            <img src={Profile} alt="booking-photo" />
            <div>
              <h3>{to}</h3>
              <p>
                Request to join <br />
                {from}&apos;s {target}
              </p>
            </div>
          </div>
          <div className="booking-block-status">
            <h4>Request</h4>
            <h5>{status}</h5>
          </div>
        </div>
      );
    case 'pending':
    default:
      return (
        <div className="booking-block">
          <div className="booking-block-from">
            <img src={Profile} alt="booking-photo" />
            <div>
              <h3>{from}</h3>
              <p>
                Request to join <br />
                {to}&apos;s {target}
              </p>
            </div>
          </div>
          <div className="booking-block-status">
            <h4>Request</h4>
            <div>
              <Button size="lg" onClick={toAccept}>
                Accept
              </Button>
              <Button type="danger" size="lg" onClick={toDecline}>
                Decline
              </Button>
            </div>
          </div>
        </div>
      );
  }
};

export { Booking };
