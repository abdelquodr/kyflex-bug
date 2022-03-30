import React, { useEffect, useState, createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';

import { ExperienceScheduler } from './ExperienceScheduler';
import { useUser } from '../../contexts/UserContext';
import { usePostBooking } from '../../hooks/useBooking';
import { Payment } from '../../pages/payment';
import { useBookingContext } from '../../contexts/BookingContext';

import {
  Route,
  useParams,
  BrowserRouter,
  Link,
  Switch,
  useHistory,
} from 'react-router-dom';
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export const BookExperienceDialog = ({
  availability,
  bookings,
  onClose,
  selectedValue,
  open,
  duration,
}) => {
  const classes = useStyles();
  const { experienceId } = useParams();
  const user = useUser();
  const [currentBookings, setCurrentBookings] = useState(
    bookings.map((booking, idx) => ({ ...booking, key: `bookings-${idx}` }))
  ); // will be empty or hold the users bookings

  const { postBooking } = usePostBooking();

  const { setSuccessBooking } = useBookingContext();
  const history = useHistory();

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleCommitChanges = ({ added, changed, deleted }) => {
    // can only update current bookings
    let updateBookings = false;
    let bookings = [...currentBookings];
    if (added) {
      const diffMs = added.endDate - added.startDate;
      const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
      added.duration = diffMins;
      added.startDate = added.startDate.toISOString();
      added.endDate = added.endDate.toISOString();

      const startingAddedId =
        bookings.length > 0 ? bookings[bookings.length - 1].id + 1 : 0;
      const isRecurring = !!added.rRule;
      bookings.push({
        ...added,
        id: startingAddedId,
        isRecurring,
        bookingStatus: 'PENDING',
        disableOnClick: false,
        groupSize: 1,
        key: `bookings-${startingAddedId}`,
      });
      updateBookings = true;
    }
    // if (changed) {
    //   currentBookings = currentBookings.map((a) =>
    //     changed[a.id] ? { ...a, ...changed[a.id] } : a
    //   );
    //   updateBookings = true;
    // }
    if (deleted != undefined) {
      bookings = bookings.filter((a) => a.id !== deleted);
      updateBookings = true;
    }
    if (updateBookings) {
      setCurrentBookings([...bookings]);
    }
  };

  const handleBook = async () => {
    // find the bookings to submit
    const bookingsToSubmit = currentBookings
      .filter((booking) => {
        delete booking['key'];
        return !bookings.find((b) => {
          return JSON.stringify(b) == JSON.stringify(booking);
        });
      })
      .map((booking) => ({
        ...booking,
        experience: experienceId,
        user: user.id,
      }));

    // console.log(bookingsToSubmit)
    const response = await postBooking({size: 1, status: 'PENDING', experience: experienceId, timeslots: bookingsToSubmit});
    if (response && response.status === 201) {
      // console.log('here', response.data[0]);
      setSuccessBooking(response.data);
      history.push('/payment');
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth={false}
    >
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <DialogTitle id="simple-dialog-title">
          Choose an available time slot
        </DialogTitle>
        <Button onClick={handleBook}>Book</Button>
      </div>
      <ExperienceScheduler
        schedulerData={availability}
        bookings={currentBookings}
        height={500}
        experienceLengthInMinutes={30}
        onCommitChanges={handleCommitChanges}
        editable
      />
    </Dialog>
  );
};
