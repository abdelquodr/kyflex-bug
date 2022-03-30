import React, { useState, useEffect, useContext } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import StarRating from '../../pages/LeaveAReview/StarRating';
import { useTranslation } from 'react-i18next';
import Maps from '../../components/Maps';
import { useGeocode } from '../../hooks/useGeocode';
import { Marker } from '@react-google-maps/api';
import {
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
  Paper,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { ReviewFormContext } from '../../contexts';

export const RatingCategories = () => {
  const [rating, setRating] = useState({
    overallRating: 0,
    communicationRating: 0,
    locationRating: 0,
    valueRating: 0,
    priceRating: 0,
  });
  const { errors, watch } = useFormContext();
  const {updateRatings} = useContext(ReviewFormContext);
  const watchRatings = watch('ratings');

//   useEffect(() => {
//     if (
//       watchRatings &&
//       watchRatings.overallRating &&
//       watchRatings.communicationRating &&
//       watchRatings.locationRating &&
//       watchRatings.valueRating &&
//       watchRatings.priceRating
//     ) {
      
//     }
//   }, [watchRatings]);

  useEffect(()=>{
      if (rating) {
        updateRatings(rating);
      }

  },[rating]);

  return (
    <>
      <div className="my-4">
        <h5>
          Overall <br />
          <Controller
            name="ratings.overallRating"
            render={(props) => (
              <StarRating
                type="overallRating"
                allRating={rating}
                handleRatingChange={setRating}
                {...props}
              />
            )}
        
          />
        </h5>
      </div>
      <div className="my-4">
        <h5>Service rating</h5>
        <p>
          Communication
          <br />
          <Controller
            name="ratings.communicationRating"
            render={(props) => (
              <StarRating
                type="communicationRating"
                allRating={rating}
                handleRatingChange={setRating}
                {...props}
              />
            )}
          />
        </p>
        <p className="my-4">
          Location
          <br />
          <Controller
            name="ratings.locationRating"
            render={(props) => (
              <StarRating
                type="locationRating"
                allRating={rating}
                handleRatingChange={setRating}
                {...props}
              />
            )}
          />
        </p>
        <p className="my-4">
          Value
          <br />
          <Controller
            name="ratings.valueRating"
            render={(props) => (
              <StarRating
                type="valueRating"
                allRating={rating}
                handleRatingChange={setRating}
                {...props}
              />
            )}
          />
        </p>
        <p>
          Price
          <br />
          <Controller
            name="ratings.priceRating"
            render={(props) => (
              <StarRating
                type="priceRating"
                allRating={rating}
                handleRatingChange={setRating}
                {...props}
              />
            )}
          />
        </p>
      </div>
    </>
  );
};
