// GUIDES: https://stripe.com/docs/connect/collect-then-transfer-guide

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import { FocusToTop } from '../hooks';
import * as Yup from 'yup';
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ExperienceCard, Icon } from '../components';
import {
  Form,
  Col,
  Button,
  Modal,
} from 'react-bootstrap';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../contexts/UserContext';
import { useTranslation } from 'react-i18next';
import {
  usePayExternalAccount,
} from '../hooks/usePayment';
import { CardSection } from './payment/CardSection';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useBookingContext } from '../contexts/BookingContext';
import { StyledBtn } from '../components/buttons';
import { moneyFormatter, sanitizeNumber } from '../lib/numberFormatter';
import { useDispatch, useSelector } from 'react-redux';
import { payForBooking } from '../store/actions/experience.actions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
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
}));

const { Row, Control, Group, Label } = Form;
const { Header, Title, Body, Footer } = Modal;
const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18));

const CheckoutForm = ({
  user,
  device,
  setSuccess,
  booking,
  successPayment,
  setSuccessPayment,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { title, host, date, time, price } = booking;
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [sameRegisterAddr, setSameRegisterAddr] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [addr1, setAddr1] = useState('');
  const [addr2, setAddr2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const [userAgreement, setUserAgreement] = useState(false);

  const [extAccountName, setExtAccountName] = useState('');
  const [extAccountNumber, setExtAccountNumber] = useState('');
  const [extRoutingNumber, setExtRoutingNumber] = useState('');
  const [extLastFourSSN, setExtLastFourSSN] = useState('');
  const [extBankBrand, setExtBankBrand] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(null);
  const { loading: experienceLoading } = useSelector(state => state.experience);
  const { loading: profileLoading, isHost } = useSelector(state => state.accounts);

  const ToggleShow = () => setShow(!show);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { t } = useTranslation();
  const timer = React.useRef();

  useEffect(() => {
    if (sameRegisterAddr) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      if (user.customerProfiles && user.customerProfiles) {
        setAddr1(user.customerProfiles.address);
        setCity(user.customerProfiles.city);
        setState(user.customerProfiles.state);
        setPostalCode(user.customerProfiles.zipCode);
      }
    }
    return () => {
      clearTimeout(timer.current);
    };
  });

  const handleSameRegisteredAddr = (e) => {
    setSameRegisterAddr(!sameRegisterAddr);
  };

  const { payExternalAccount } = usePayExternalAccount();

  const stripe = useStripe();
  const elements = useElements();

  const PayWithNewCard = async (event) => {
    if (!experienceLoading) {
      setSuccess(false);
      // setLoading(true);

      const billing_address = {
        address: {
          city: city,
          country: 'us',
          line1: addr1,
          line2: addr2,
          postal_code: postalCode,
          state: state,
        },
        name: `${firstName} ${lastName}`,
      };

      const card = elements.getElement(CardElement);

      const paymentIntent = await dispatch(payForBooking(booking.id));
      const confirmedPayment = await stripe.confirmCardPayment(
        paymentIntent.clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              name: `${user.firstName} ${user.lastName}`,
            },
          },
        }
      );

      if (confirmedPayment && confirmedPayment.error) {
        closeSnackbar();
        setSuccess(false);
        // setLoading(false);
        enqueueSnackbar(`\u2717 ${confirmedPayment.error.message}`);
        setSuccessPayment(false);
      } else {
        // The payment has been processed successfully
        if (
          confirmedPayment &&
          confirmedPayment.paymentIntent.status === 'succeeded'
        ) {
          closeSnackbar();
          setSuccess(true);
          // setLoading(false);
          // enqueueSnackbar('\u2713 Payment Success !');
          card.clear();
          setUserAgreement(!userAgreement);
          setSuccessPayment(true);

          // await new Promise((resolve) => setTimeout(resolve, 5000)); // 5 sec

          // history.push('/dashboard/bookings');
        }
      }
    }
  };

  //styling for the form and cart
  const CSS_form =
    device === 'browser'
      ? 'payment-customer-form browser'
      : `payment-customer-form tablet ${show ? 'hidden' : ''}`;
  const CSS_cart =
    device === 'browser'
      ? 'payment-customer-cart browser'
      : `payment-customer-cart tablet ${show ? '' : 'hidden'}`;

  const handleAgreement = () => {
    setUserAgreement(!userAgreement);
  };
  const classes = useStyles();
  return (
    <div>
      <Form id="payment-customer">
        <header style={{ borderBottom: 'none' }}>
          <h2 onClick={ToggleShow} className="tablet">
            <Icon icon={faShoppingCart} color="#D63B03" />
          </h2>
        </header>
        <section className="main-content">
          <Col className={CSS_form}>
            <>
              <CardSection />
              <div className="text-left" onClick={handleAgreement}>
                <input
                  type="checkbox"
                  style={{ transform: 'scale(1.5)', width: '1.5em' }}
                  checked={userAgreement}
                />
                By clicking this button, I have reviewed my information and
                agree to the Cancellation Policy given by KyFlex.
              </div>
              <br />
              <div className="right-text">
                <Button
                  style={{ background: '#fb5012', border: 'none' }}
                  size="lg"
                  disabled={userAgreement === false || profileLoading} // disable when disagree or loading
                  onClick={(e) => PayWithNewCard(e)}
                >
                  Review and Pay
                </Button>
                {profileLoading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>

              <br />
            </>
          </Col>

          {!isHost ? (
            <>
              <Col className={CSS_cart}>
                <h3 className="center-text browser">
                  <Icon icon={faShoppingCart} color="#D63B03" />
                </h3>
                <div className="payment-customer-info">
                  {/* <img
                    src={SampleActivity}
                    className="payment-customer-cart-image"
                    alt="activity-image"
                  /> */}
                  <ExperienceCard experience={booking?.experience || {}} />
                  <h2 className="center-text">{title}</h2>
                  <hr />
                  {/* <ul className="no-li-style">
                    <li>Host: {booking?.experience?.host?.firstName} {booking?.experience?.host?.lastName}</li>
                    <li>Booked: {booking?.addedAt}</li>
                    <li>Scheduled at: {time}</li>
                  </ul> */}
                  <h4>
                    Price{' '}
                    <span className="float-right">
                      {sanitizeNumber(
                        moneyFormatter(booking?.experience?.price)
                      )}
                    </span>
                  </h4>
                  <h4>
                    Tax{' '}
                    <span className="float-right">
                      {sanitizeNumber(
                        moneyFormatter((booking?.experience?.price * 7.5) / 100)
                      )}
                    </span>
                  </h4>
                  <hr />
                  <h3>
                    Total{' '}
                    <span className="float-right">
                      {sanitizeNumber(
                        moneyFormatter(
                          (booking?.experience?.price * 107.5) / 100
                        )
                      )}
                    </span>
                  </h3>
                  <br />
                </div>
                <div className="payment-customer-refund-policy">
                  <h3 className="center-text">Cancellation Policy</h3>
                  <ul>
                    <li>
                      The host fails to show up for the booked experience or
                      arrives more than 15 minutes past the appointed start
                      time, causing you to give up the experience.
                    </li>
                    <li>
                      The host makes significant changes to the experience after
                      your booking is finalized.
                    </li>
                    <li>
                      The experience poses a safety or health hazard to your
                      participation.
                    </li>
                    <li>
                      KyFlex reserves the right to intervene if and when issues
                      escalate beyond the standard guidelines.
                    </li>
                  </ul>
                </div>
                <div className="payment-customer-refund-total-price">
                  <h2>
                    Total {moneyFormatter(booking?.experience?.price)} USD
                  </h2>
                </div>
              </Col>
            </>
          ) : (
            <></>
          )}
        </section>

        <footer>
          <Modal show={successPayment} backdrop="static" keyboard={false}>
            <Header>
              <Title>
                <h3>Thank you for your purchase!</h3>
              </Title>
            </Header>
            <Body style={{ height: '120px' }}>
              Your ordered has been placed successfully. Please wait for host's
              approval{' '}
            </Body>
            <Footer>
              <StyledBtn width="100%" href="/" className="mb-2">
                Continue Shopping
              </StyledBtn>

              <StyledBtn width="100%" href="/dashboard/bookings">
                My orders
              </StyledBtn>
            </Footer>
          </Modal>
        </footer>
      </Form>
    </div>
  );
};

/*global process*/
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Payment = ({ cookies, auth }) => {
  FocusToTop(); //Setting focus to top of the page when loading.
  const { successBooking, successPayment, setSuccessPayment } =
    useBookingContext();
  const product = {
    title: 'Football and Cookout',
    host: 'Sylvester Amponsah',
    date: 'August 20th, 2020',
    time: '16:30 - 19:30',
    price: 120,
  };
  // console.log(successBooking);
  const { profile: user } = useSelector(state => state.accounts);
  const device = window.innerWidth > 1199 ? 'browser' : 'mobile';
  const [success, setSuccess] = useState(false);

  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      autoHideDuration={5000}
      style={{
        background: success ? 'green' : 'red',
        color: 'white',
        fontSize: '1rem',
        justifyContent: 'center',
      }}
    >
      <Elements stripe={stripePromise}>
        <CheckoutForm
          user={user}
          device={device}
          booking={successBooking}
          successPayment={successPayment}
          setSuccessPayment={setSuccessPayment}
          setSuccess={setSuccess}
        />
      </Elements>
      {/* <Prompt
      when={true}
      message={location =>
        `Are you sure you want to go to ${location.pathname}`
      }
    /> */}
    </SnackbarProvider>
  );
};

export { Payment };
