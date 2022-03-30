import React, {
  useContext,
  useState,
  useEffect,
  createContext,
  useMemo,
  useCallback,
} from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import apiClient, { useAxios } from '../lib/apiClient';
import { useTranslation } from 'react-i18next';
import { useUploadExperienceImg } from '../hooks/images/useUploadImage';
import { useHistory } from 'react-router-dom';
import nProgress from 'nprogress';
import '../components/nprogress.scss';
import { useTokens, useUser } from './UserContext';
import { usePostReview } from '../hooks/useReview';
import axios from 'axios';
import { GetAccessToken } from '../funcs';

const initialValues = {
  name: '',
  ratings: {
    overallRating: 0,
    communicationRating: 0,
    locationRating: 0,
    valueRating: 0,
    priceRating: 0,
  },
  reviewDetails: {
    reviewHeadline: '',
    reviewBody: '',
  },
  media: [],
};

export const ReviewFormContext = createContext({
  form: initialValues,
  setUploadImage: () => {},
  submit: () => {},
  loading: false,
  data: {},
});

export const ReviewFormProvider = ({ children }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const user = useUser();
  const [reviewer, setReviewer] = useState('');
  const [bookingId, setBookingId] = useState('');
  const { postReview } = usePostReview();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) setReviewer(`${user.firstName} ${user.lastName}`);
  }, [user]);

  nProgress.configure({ showSpinner: true, speed: 200 });
  const schemaValidation = Yup.object().shape({
    name: Yup.string().max(255, t('Max_n_chars', { max: 255 })),
    ratings: Yup.object({
      overallRating: Yup.number().required(t('Required')),
      communicationRating: Yup.number(),
      locationRating: Yup.number(),
      valueRating: Yup.number(),
      priceRating: Yup.number(),
    }),
    reviewDetails: Yup.object({
      reviewHeadline: Yup.string().max(255, t('Max_n_chars', { max: 255 })),
      reviewBody: Yup.string().max(255, t('Max_n_chars', { max: 300 })),
    }),
    media: Yup.array().max(6),
  });

  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schemaValidation),
  });

  const submit = async(form) => {
    nProgress.start();
    await setLoading(true);
    const accessToken = JSON.parse(window.localStorage.getItem('ky-tokens')).accessToken;
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${accessToken}`
    );
    let formdata = new FormData();
    formdata.append('booking_id', bookingId);
    formdata.append('overall_rating', form.ratings.overallRating);
    formdata.append('communication_rating', form.ratings.communicationRating);
    formdata.append('location_rating', form.ratings.locationRating);
    formdata.append('value_rating', form.ratings.valueRating);
    formdata.append('review_headline', form.reviewDetails.reviewHeadline);
    formdata.append('review_body', form.reviewDetails.reviewBody);

    for ( let key in form.media ) {
        formdata.append("media", form.media[key]);
    }
    
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    await fetch('http://localhost:8000/reviews/', requestOptions)
      .then(response => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
    setLoading(false);
    methods.reset();
    nProgress.done();
  };

  const setUploadImage = useCallback(
    (img) => {
      const media = methods.getValues('media') || [];
      media.push(img);
      methods.setValue('media', media);
    },
    [methods]
  );

  const removeImage = useCallback(
    (imageName) => {
      let media = methods.getValues('media');
      media = media.filter((img) => img.name !== imageName);
      methods.setValue('media', media);
    },
    [methods]
  );

  const updateRatings = useCallback(
    (NewRatings) => {
      methods.setValue('ratings', NewRatings);
    },
    [methods]
  );

  const updateBookingId = useCallback((id) => {
    setBookingId(id);
  });

  const value = useMemo(
    () => ({
      form: methods.formState,
      loading,
      submit,
      setUploadImage,
      removeImage,
      reviewer,
      setReviewer,
      updateBookingId,
      updateRatings,
    }),
    [
      loading,
      submit,
      setUploadImage,
      removeImage,
      reviewer,
      setReviewer,
      updateBookingId,
      updateRatings,
    ]
  );

  return (
    <FormProvider {...methods}>
      <ReviewFormContext.Provider value={value}>
        <form onSubmit={methods.handleSubmit(submit)}>{children}</form>
      </ReviewFormContext.Provider>
    </FormProvider>
  );
};
