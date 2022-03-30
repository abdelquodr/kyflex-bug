import { TextField, Checkbox } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import SoccerKids from '../../assets/images/soccer-kids.jpg';
import { StyledBtn } from '../../components';
import colorVars from '../../sass/colors.scss';
import { ReviewFormContext, ReviewFormProvider, useUser } from '../../contexts';
import { useParams } from 'react-router-dom';
import apiClient, { useAxios } from '../../lib/apiClient';
import { ExperienceCard } from '../../components';
import { DisplayReviewImages } from './displayImages';
import { RatingCategories } from './displayRatings';
import { DisplayReviewer } from './displayReviewer';
import { Controller, useForm } from 'react-hook-form';
import { PageNotFound } from '../PageNotFound/PageNotFound';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const ReviewForm = ({ bookingId }) => {
  const { loading, updateBookingId } = useContext(ReviewFormContext);
  const [confirmed, setConfirmed] = useState(false);

  const [{ data: booking, loadingBooking }] = useAxios(
    `/bookings/${bookingId}/`
  );

  useEffect(() => {
    if (bookingId) updateBookingId(bookingId);
  }, [bookingId]);

  const handleCheckboxChange = (event) => {
    if (event.currentTarget.checked) {
      setConfirmed(true);
    } else {
      setConfirmed(false);
    }
  }

  return (
    <div className="container w-75">
      <h1 className="my-4">Leave A Review</h1>

      {booking && (
        <ExperienceCard
          experience={booking.experience}
          className="mx-auto experienceCard"
        />
      )}

      <DisplayReviewer />

      <RatingCategories />

      {/* Review headline*/}
      <div className="my-4">
        <h5>Review Headline</h5>
        <Controller
          name="reviewDetails.reviewHeadline"
          render={(props) => (
            <TextField
              placeholder="Important to know"
              variant="outlined"
              fullWidth
              {...props}
            />
          )}
        />
      </div>

      <div className="my-4">
        <h5 className="mt-3">Leave a written review</h5>
        <Controller
          name="reviewDetails.reviewBody"

          render={(props) => (
            <TextField
              placeholder="Brief description about your experience. What you like or what can be improved"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              {...props}
            />
          )}
        />
      </div>

      <div className="my-4">
        <h5>Add photos or videos</h5>
        <DisplayReviewImages />
      </div>

      <div className="my-4">
        <FormControlLabel
          control={<Checkbox 
            onChange={handleCheckboxChange} 
             />
          }
          label="Confirm before submit (because it can't be edited)"
        />
      </div>

      <div className="mb-5 d-flex justify-content-end">
        <StyledBtn
          type="submit"
          id="btn-next"
          title="Submit"
          width="120px"
          backgroundColor={colorVars.mainKyflexColor}
          textTransform="uppercase"
          disabled={loading || !confirmed}
        />
      </div>
    </div>
  );
};

export const ReviewBooking = () => {
  const { bookingId } = useParams();
  const user = useUser();
  const [{ data: booking, loadingBooking }] = useAxios(`/bookings/${bookingId}/`);
  const [validCustomer, setValidCustomer] = useState(false);

  useEffect(() => {
    if (booking && user && booking.customer.id === user.id) setValidCustomer(true);
  }, [booking, user]);
  // const [{ data: review, loading }] = useAxios(
  //   `/reviews/?booking=1603b212-3baf-4018-8be1-b4930671a626`
  // );
  // useEffect(()=>{
  //   console.log('check REVIEW', review);
  // },[review])
  return (
    <>
      {validCustomer && booking && booking.status === "ACCEPTED" ? <ReviewFormProvider>
        <ReviewForm bookingId={bookingId} />
      </ReviewFormProvider> : <PageNotFound />}

    </>
  );
};
