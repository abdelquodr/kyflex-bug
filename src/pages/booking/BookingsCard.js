import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AnonymousProfilePic from '../../assets/images/anonymous_user.png';
import { ActionConfirm } from './ActionConfirm';

const BookingsCard = ({
  bookingId,
  status,
  customer,
  experience,
  onAccept,
  onDecline,
  onRemove,
  onReport,
}) => {
  const [confirmed, setConfirmed] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState({
    open: false,
    message: '',
  });
  const [postConfirmationAction, setPostConfirmationAction] = useState();
  const confirmAction = () => {
    setConfirmed(true);
    closeConfirmation();
  };
  const closeConfirmation = () => {
    setConfirmationOpen({ ...confirmationOpen, open: false });
  };
  const openConfirmation = (message) => {
    setConfirmationOpen({ message: message, open: true });
  };
  const reconfirmAction = async (message, PostAction) => {
    openConfirmation(message);
    setPostConfirmationAction(() => PostAction);
  };

  useEffect(() => {
    if (confirmed) {
      postConfirmationAction(bookingId);
    }
  }, [confirmed, postConfirmationAction]);

  return (
    <div className="booking-block">
      <div className="booking-block-from">
        <img
          src={
            customer?.uploadedPicture ||
            customer?.picture ||
            AnonymousProfilePic
          }
          alt="customer-photo"
        />
        <p
          style={{ fontWeight: 'bold' }}
        >{`${customer?.firstName} ${customer?.lastName}`}</p>
        <p>
          Request to join <br />
          <span>
            <Link to={`/experience/${experience?.id}`}>
              {experience?.title}
            </Link>
          </span>
        </p>
      </div>

      <div className="booking-block-status">
        <div>
          {status === 'PENDING' && (
            <>
              <button
                className="text-success"
                size="lg"
                onClick={(e) => reconfirmAction('accept booking', onAccept)}
              >
                Accept
              </button>
              <hr />
              <button
                className="text-danger"
                size="lg"
                onClick={(e) => reconfirmAction('decline booking', onDecline)}
              >
                Decline
              </button>
            </>
          )}
          {status === 'ACCEPTED' && (
            <>
              <button
                className="text-danger"
                size="lg"
                onClick={(e) => reconfirmAction('remove booking', onRemove)}
              >
                Remove
              </button>
              <hr />
              <button size="lg" onClick={() => onReport(bookingId)}>
                Report
              </button>
            </>
          )}
        </div>
      </div>
      {confirmationOpen?.open && (
        <ActionConfirm
          message={confirmationOpen.message}
          handleConfirm={confirmAction}
          closeConfirmation={closeConfirmation}
        />
      )}
    </div>
  );
};

export default BookingsCard;
