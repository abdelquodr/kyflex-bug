import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
  PrimaryButton,
  SuccessButton,
  DangerButton,
  PayButton,
} from '../../components/buttons';
import SampleImg from '../../assets/images/6609308.jpg';
import apiClient, { useAxios } from '../../lib/apiClient';
import { useUser } from '../../contexts/UserContext';
import { useBookingStatus, useDeleteBooking } from '../../hooks/useBooking';
import { Payment } from '../payment';
import { usePaymentIntentDetail } from '../../hooks/usePayment';
import { useStripe } from '@stripe/react-stripe-js';
import BOOKING_STATUS from '../../components/Status/BookingStatus';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useBookingContext } from '../../contexts/BookingContext';

const useStyles = makeStyles({
  root: {
    width: 'auto',
    height: '100%',
    marginBottom: '1rem',
    marginRight: '1rem',
    padding: '0',
  },
  media: {
    height: 140,
  },
  description: {
    height: 20,
  },
  mediaLoading: {
    height: 140,
    backgroundColor: '#818181',
    opacity: '50%',
  },
  fabProgress: {
    color: '#FC781C',
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: '#FC781C',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

export const MediaCard = ({ experience, setShow }) => {
  const classes = useStyles();
  const {
    pk,
    img,
    user,
    description,
    startDate,
    endDate,
    onDemandStatus,
    groupSize,
    bookingStatus,
  } = experience;
  const timer = React.useRef();
  const history = useHistory();
  const stripe = useStripe();
  const currentUser = useUser();
  const [experienceId, setExperienceId] = useState('');
  const [userId, setUserId] = useState('');

  const [newStatus, setNewStatus] = useState(bookingStatus);
  const [isHost, setIsHost] = useState(true);
  const [loading, setLoading] = useState(false);

  const {
    setSuccessBooking,
    successPayment,
    setSuccessPayment,
  } = useBookingContext();

  const [{ data: experienceObj, loadingExperience }] = useAxios(
    `/api-experience/experiences/${experienceId}/`
  );
  
  const [{ data: customerInfo, loadingCustomerInfo }] = useAxios(
    `/api-users/protected-customer/${user}`
  );

  const [userInfoId, setUserInfoId] = useState('');

  const [{ data: userInfo, loadingUserInfo }] = useAxios(
    `/api-users/protected-customer/${userInfoId}`
  );

  let [{ data: paymentIntentObj, loadingPaymentIntent }] = useAxios(
    `/payment/payment-intent/?booking=${pk}`
  );
  const { updateBookingStatus } = useBookingStatus(pk);
  const { getPaymentIntentDetail } = usePaymentIntentDetail();
  const { deleteBooking } = useDeleteBooking(pk);

  const [onShow, setOnShow] = useState(true);
  const [cancelled, setCancelled] = useState(false);

  const handleDecline = async () => {
    const piResponse = await getPaymentIntentDetail({ bookingId: pk });
    const response = await updateBookingStatus({
      bookingStatus: BOOKING_STATUS.REJECTED,
    });
    if (response && response.data) {
      setNewStatus(response.data.bookingStatus);
    }
  };
  const handleAccept = async () => {
    setLoading(true);
    const piResponse = await getPaymentIntentDetail({ bookingId: pk });
    if (piResponse.data.paymentMethod.status == 'succeeded') return;

    const confirmCardResponse = await stripe.confirmCardPayment(
      piResponse.data.paymentMethod.clientSecret,
      {
        payment_method: piResponse.data.paymentMethod.paymentMethod,
      }
    );

    const response = await updateBookingStatus({
      bookingStatus: BOOKING_STATUS.ACCEPTED,
    });
    if (response && response.data) {
      setNewStatus(response.data.bookingStatus);
      setLoading(false);
    }
  };

  const onPayNow = () => {
    history.push('/payment');
  };
  const handleCancelBooking = async () => {
    const deleteResponse = await deleteBooking();
    if (deleteResponse.status == 204) {
      setCancelled(true);
    }
  };

  const [experienceTitle, setExperienceTitle] = useState('');
  const [hostId, setHostId] = useState('');
  const [customerName, setCustomer] = useState('');
  const [hostName, setHostName] = useState('');
  const [paymentRequired, setPaymentRequired] = useState(false);

  useEffect(() => {
    // user booked but did not pay (not paymentIntent found in the DB)
    if (successPayment) {
      // fetch data
      apiClient
        .get(`/payment/payment-intent/?booking=${pk}`)
        .then((response) => {
          if (response.data.count != 0) setPaymentRequired(false);
          paymentIntentObj = response.data.results[0];
        })
        .catch((error) => {
          setSuccessPayment(false);
        });
    } else if (
      experienceObj &&
      paymentIntentObj &&
      paymentIntentObj.count == 0
    ) {
      setSuccessBooking(experience);
      setPaymentRequired(true);
    }
    if (experience) setExperienceId(experience.experience);
    if (!isHost && experienceObj) setUserInfoId(experienceObj.host.pk);
    if (userInfo) {
      setHostName(userInfo.user.firstName);
    }
    if (customerInfo) {
      if (
        currentUser.customerProfiles &&
        !currentUser.customerProfiles.isHost
      ) {
        setIsHost(false);
      }
      setCustomer(customerInfo.user.firstName);
    }
    if (experienceObj) {
      setExperienceTitle(experienceObj.title);
      const { host } = experienceObj;
      if (host) setHostId(host.id);
    }

    if (currentUser.customerProfiles) {
      setUserId(currentUser.customerProfiles.id);
    }
    // display bookings for host
    if (isHost && userId && hostId && userId == hostId) {
      setOnShow(false);
      setShow(false);
    }
    // display bookings for customer
    if (experience && !isHost && user == userId) {
      setOnShow(false);
      setShow(false);
    }
  });

  return (
    !cancelled && (
      <Card className={classes.root} hidden={onShow}>
        <CardMedia
          className={loading ? classes.mediaLoading : classes.media}
          image={SampleImg}
        />
        <CardContent disabled={loading}>
          {/* <Typography
          gutterBottom
          variant="h5"
          component="h2"
          style={{ textAlign: 'center' }}
        >
          {isHost?customerName : ''}
        </Typography> */}
          <Typography style={{ fontSize: '1.1rem' }}>
            {!isHost ? `HOST: ${hostName}` : `CUSTOMER: ${customerName}`}
          </Typography>

          <Typography style={{ fontSize: '1.1rem' }}>
            EXPERIENCE:{' '}
            <Link to={`/experience/${experienceId}`}>{experienceTitle}</Link>
          </Typography>
          <Typography className="mt-1" style={{ fontSize: '1.1rem' }}>
            STATUS:{' '}
            <span
              style={{
                color:
                  newStatus == BOOKING_STATUS.REJECTED
                    ? 'red'
                    : newStatus == BOOKING_STATUS.ACCEPTED
                    ? 'green'
                    : 'gray',
                fontWeight: 800,
                backgroundColor: '#F9F9F9',
                padding: '8px',
              }}
            >
              {newStatus}{' '}
            </span>
          </Typography>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}

          {isHost &&
          newStatus != BOOKING_STATUS.REJECTED &&
          newStatus != BOOKING_STATUS.ACCEPTED ? (
            <>
              <CardActions
                style={{ justifyContent: 'center' }}
                className="mt-2"
              >
                <DangerButton
                  onClick={handleDecline}
                  className="mr-3"
                  disabled={loading}
                >
                  Decline
                </DangerButton>
                <SuccessButton onClick={handleAccept} disabled={loading}>
                  Accept
                </SuccessButton>
              </CardActions>
            </>
          ) : (
            <>
              <CardActions
                style={{ justifyContent: 'center' }}
                className="mt-2"
              >
                <DangerButton onClick={handleCancelBooking} disabled={loading}>
                  Cancel
                </DangerButton>
                {paymentRequired && (
                  <PayButton onClick={onPayNow} disabled={loading}>
                    Pay
                  </PayButton>
                )}
              </CardActions>
            </>
          )}
        </CardContent>
      </Card>
    )
  );
};
