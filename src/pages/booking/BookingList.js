import React, { useEffect, useState } from 'react';
import { Container, Row} from 'react-bootstrap';
import BookingsCard from './BookingsCard';
import { isEmptyObject } from '../../lib/utils';
import BOOKING_STATUS from '../../components/Status/BookingStatus';
import BookingsExperienceCard from './BookingsExperienceCard';
import { useDispatch, useSelector } from 'react-redux';
import { cancelBookingAsCustomer, getBookings, updateBookingAsHost } from '../../store/actions/experience.actions';

const ActiveBookingList = () => {
  const dispatch = useDispatch();
  const [bookings, setBookings] = useState([]);
  const [pendingBookings, setPendingBookings] = useState([]);
  const [acceptedBookings, setAcceptedBookings] = useState([]);
  const { loading: experienceLoading } = useSelector(state => state.experience);
  const { loading: profileLoading, profile: user, isHost } = useSelector(state => state.accounts);

  useEffect(() => {
    let mode;
    if (isHost) mode = 'host';
    (async () => {
      try {
        const data = await dispatch(getBookings(mode));
        if (data.count > 0) setBookings(data.results);
      } catch (error) {
        // TODO: handle error
      }
    })();
  }, []);

  useEffect(() => {
    if (bookings.length > 0) {
      let allPendingBookings = [];
      let allAcceptedBookings = [];
      bookings.map((booking, idx) => {
        if (booking.status === BOOKING_STATUS.PENDING) {
          allPendingBookings.push(booking);
        } else if (booking.status === BOOKING_STATUS.ACCEPTED) {
          allAcceptedBookings.push(booking);
        }
      });

      if (!isEmptyObject(allPendingBookings))
        setPendingBookings(allPendingBookings);
      if (!isEmptyObject(allAcceptedBookings))
        setAcceptedBookings(allAcceptedBookings);
    }
  }, [bookings]);

  const updateBooking = (bookingId, newStatus) => {
    (async () => {
      try {
        if (isHost) await dispatch(updateBookingAsHost(bookingId, newStatus));
        else await dispatch(cancelBookingAsCustomer(bookingId));
      } catch (error) {
        // TODO: handle error
      }
    })();
  };

  const handleAccept = (acceptId) => {
    let bookingObjectToAccept = pendingBookings.find(
      (booking) => booking.id === acceptId
    );
    bookingObjectToAccept = { ...bookingObjectToAccept, status: 'ACCEPTED' };
    let newPendingBookings = pendingBookings.filter(
      (booking) => booking.id !== acceptId
    );
    let newAcceptedBookings = [...acceptedBookings, bookingObjectToAccept];
    setPendingBookings(newPendingBookings);
    setAcceptedBookings(newAcceptedBookings);
    updateBooking(acceptId, { status: 'ACCEPTED' });
  };
  const handleDecline = (declId) => {
    let newPendingBookings = pendingBookings.filter(
      (booking) => booking.id !== declId
    );
    setPendingBookings(newPendingBookings);
    updateBooking(declId, { status: 'REJECTED' });
  };

  const handleRemove = (removeId) => {
    let newAcceptedBookings = acceptedBookings.filter(
      (booking) => booking.id !== removeId
    );
    setAcceptedBookings(newAcceptedBookings);
    updateBooking(removeId, { status: 'CANCELED' });
  };

  const handleCancelAccepted = (cancelId) => {
    let newAcceptedBookings = acceptedBookings.filter(
      (booking) => booking.id !== cancelId
    );
    setAcceptedBookings(newAcceptedBookings);
    updateBooking(cancelId, { status: 'CANCELED' });
  };

  const handleCancelPending = (cancelId) => {
    let newPendingBookings = pendingBookings.filter(
      (booking) => booking.id !== cancelId
    );
    setPendingBookings(newPendingBookings);
    updateBooking(cancelId, { status: 'CANCELED' });
  };

  const handleReport = (booking) => {
    alert('Incoming feature!');
  };
  const handleContact = (booking) => {
    alert('Incoming feature!');
  };

  // console.log('pending bookings', pendingBookings);

  // console.log('accepted bookings', acceptedBookings);

  return (
    <Container>
      <Row>
        <h5>PENDING BOOKINGS</h5>
      </Row>
      {!isEmptyObject(pendingBookings) ? (
        isHost ? (
          <Row>
            {pendingBookings?.map((booking, index) => (
              <BookingsCard
                key={index}
                bookingId={booking.id}
                status={booking.status}
                experience={{
                  title: booking.experience.title,
                  id: booking.experience.id,
                }}
                customer={booking.customer}
                onAccept={handleAccept}
                onDecline={handleDecline}
              />
            ))}
          </Row>
        ) : (
          <Row>
            {pendingBookings?.map((booking, index) => (
              <BookingsExperienceCard
                key={booking.id}
                bookingId={booking.id}
                experience={booking.experience}
                onCancel={handleCancelPending}
                onContact={handleContact}
              />
            ))}
          </Row>
        )
      ) : (
        <small>No booking found...</small>
      )}

      <Row className="mt-4">
        <h5>ACCEPTED BOOKINGS</h5>
      </Row>
      {!isEmptyObject(acceptedBookings) ? (
        isHost ? (
          <Row>
            {acceptedBookings?.map((booking, index) => (
              <BookingsCard
                key={index}
                bookingId={booking.id}
                status={booking.status}
                experience={{
                  title: booking.experience.title,
                  id: booking.experience.id,
                }}
                customer={booking.customer}
                onRemove={handleRemove}
                onReport={handleReport}
              />
            ))}
          </Row>
        ) : (
          <Row>
            {acceptedBookings?.map((booking, index) => (
              <BookingsExperienceCard
                key={booking.id}
                status={booking.status}
                bookingId={booking.id}
                experience={booking.experience}
                onCancel={handleCancelAccepted}
                onContact={handleContact}
              />
            ))}
          </Row>
        )
      ) : (
        <small>No booking found...</small>
      )}
    </Container>
  );
};

export { ActiveBookingList };
