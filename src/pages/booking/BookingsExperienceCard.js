import React, { useEffect, useState } from 'react';
import { ActionConfirm } from './ActionConfirm';
import { ExperienceCard } from '../../components';
import { useHistory } from 'react-router-dom';

const BookingsExperienceCard = ({
  status,
  bookingId,
  experience,
  onCancel,
  onContact,
}) => {
  const history = useHistory();
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

  const handleReview = () => {
    history.push(`/review/${bookingId}`);
  };

  return (
    <div className="booking-block">
      <ExperienceCard
        experience={experience}
        className="mx-auto experienceCard"
      >
        <div className="booking-block-status">
          <div>
            <button
              className="text-danger"
              size="lg"
              onClick={(e) => reconfirmAction('cancel booking', onCancel)}
            >
              Cancel
            </button>
            <hr />
            <button size="lg" onClick={() => onContact(bookingId)}>
              Contact
            </button>
            {status === 'ACCEPTED' && (
              <button className="btn-review" size="lg" onClick={handleReview}>
                Review
              </button>
            )}
          </div>
        </div>
      </ExperienceCard>

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

export default BookingsExperienceCard;
