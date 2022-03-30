import React, { useEffect, useState } from 'react';
import { ExperienceFormProvider } from '../../contexts';
import { Schedule } from './schedule';
import { MeetingLocations } from './meetingLocations';
import { ActivitiesDescription } from './activitiesDesc';
import { DisplayImages } from './displayImages';
import { StyledBtn } from '../../components/buttons';
import colorVars from '../../sass/colors.scss';
import { AlertMessage } from '../../components/InformationElement/';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidV4 } from 'uuid';
import { getRequiredBooleanValidator, getRequiredStringValidator, minNumberValidator } from '../../validators';
import { useDispatch } from 'react-redux';
import { createExperience, getExperience, updateExperience } from '../../store/actions/experience.actions';

const ExperienceForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [initialFormDetail, setInitialFormDetail] = useState(null);
  const [accountUpdateUrl, setAccountUpdateUrl] = useState(null);
  const { experienceId } = useParams();

  const convertServerAvailabilityToLocalFormat = (value) => ({
    id: uuidV4(),
    startDate: new Date(value.start_date),
    endDate: new Date(value.end_date),
    allDay: value.all_day,
    title: value.title,
    duration: value.duration,
    isRecurring: value.is_recurring,
  });


  const convertLocalAvailabilityToServerFormat = (value) => ({
    start_date: value.startDate,
    end_date: value.endDate,
    all_day: value.allDay,
    title: value.title,
    duration: value.duration,
    is_recurring: value.isRecurring,
  });

  const availabilityItemValidator = Yup.array(Yup.object().shape({
    title: getRequiredStringValidator('Title'),
    allDay: getRequiredBooleanValidator('All day'),
    duration: minNumberValidator(true, 'duration', 1),
    endDate: Yup.date().min(new Date(), 'End date cannot be less than now').required('End date is required'),
    isRecurring: getRequiredBooleanValidator('Recurring'),
    startDate: Yup.date().min(new Date(), 'End date cannot be less than now').required('End date is required'),
  }))
  useEffect(() => {
    if (experienceId) {
      (async () => {
        try {
          // refetch to refill the input form
          const data = await dispatch(getExperience(experienceId));
          const availability = (data.availability || [])[0];
          setInitialFormDetail({
            title: data.title,
            description: data.description,
            requirements: data.requirements,
            price: data.price,
            street: data.street,
            apt: data.apt,
            city: data.city,
            state: data.state,
            country: data.country,
            zip_code: data.zip_code,
            category: data.category,
            max_group_size: data.max_group_size,
            duration: data.duration,
            availability: {
              regular: availability?.regular?.map(convertServerAvailabilityToLocalFormat),
              on_demand: availability?.on_demand?.map(convertServerAvailabilityToLocalFormat)
              // unavailable: availability?.unavailable?.map(convertServerAvailabilityToLocalFormat),
            },
            // images: data?.images,
          });
        } catch (error) {
          console.log(error?.response, 'ERROR FROM EXPERIENCE');
        }
      })();
    }

    // window.scrollTo(0, 0);
    // apiClient
    //   .get(`/payments/stripe/`)
    //   .then((res) => {
    //     if (res.data.length > 0) {
    //       let stripeInfo = res.data[0];
    //       setStripeReady(stripeInfo.setupCompleted);
    //       setAccountUpdateUrl(stripeInfo.accountUpdateUrl);
    //     }
    //   })
    //   .catch((error) => console.log(error));
  }, [experienceId]);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   // console.log('stripeReady', stripeReady);
  //   // console.log('accountUpdateUrl', accountUpdateUrl)
  // }, [stripeReady, accountUpdateUrl]);

  console.log({ initialFormDetail })

  const onSubmit = async (values) => {
    

    const newValues = {
      ...values,
      availability: {  }
    }   
    
    

    if(values.availability.regular.length){
      newValues.availability.regular = values.availability.regular.map(convertLocalAvailabilityToServerFormat);
    }
    
    if(values.availability.on_demand.length){
      newValues.availability.on_demand = values.availability.on_demand.map(convertLocalAvailabilityToServerFormat);
    }

    console.log( values.availability.on_demand[0].startDate.toISOString().substring(0, 19), " ================================== cheking thingss out")
    
    // check if regular and on_demand experience are st on the same time of the same day
    if(values.availability.on_demand[0].startDate.toISOString().substring(0, 19) === values.availability.regular[0]?.startDate.toISOString().substring(0, 19) && values.availability.on_demand[0].endDate.toISOString().substring(0, 19) === String(values.availability.regular[0]?.endDate.toISOString().substring(0, 19))){
      // alert the user that  its not possible to set the same date for both
      window.alert("time set for regular and on_demand can not be the same")
      return
    }
      
   
    try {
      const res = await dispatch(
        experienceId ? updateExperience(experienceId, newValues) : createExperience(newValues)
      );
      console.log({ res });
      history.push('/home');
    } catch (error) { 
      // TODO: handle error
    }
  };

  return (
    <div>
      {accountUpdateUrl && (
        <AlertMessage>
          <span>
            ACTION REQUIRED! You must{' '}
            <Link to={{ pathname: accountUpdateUrl }} target="_blank">
              set up your payment
            </Link>{' '}
            before hosting experiences{' '}
          </span>
        </AlertMessage>
      )}
      <h1
        style={{ marginTop: '2rem', marginBottom: '2rem' }}
        className="header"
      >
        Create your new experience
      </h1>
      <ExperienceFormProvider>
        <Formik
          enableReinitialize
          onSubmit={onSubmit}
          initialValues={{
            apt: initialFormDetail?.apt || "",
            title: initialFormDetail?.title || "",
            country: initialFormDetail?.country || "",
            category: initialFormDetail?.category || "",
            description: initialFormDetail?.description || "",
            street: initialFormDetail?.street || "",
            city: initialFormDetail?.city || "",
            state: initialFormDetail?.state || "",
            zip_code: initialFormDetail?.zip_code || "",
            price: initialFormDetail?.price || 0,
            max_group_size: initialFormDetail?.max_group_size || 1,
            duration: initialFormDetail?.duration || 0,
            availability: {
              regular: initialFormDetail?.availability?.regular || [],
              on_demand: initialFormDetail?.availability?.on_demand || [],
              // unavailable: initialFormDetail?.availability?.unavailable || [],
            },
            images: [],
            requirements: initialFormDetail?.requirements || '',
          }}
          validationSchema={Yup.object().shape({
            apt: getRequiredStringValidator('Apartment'),
            title: getRequiredStringValidator('Title'),
            category: getRequiredStringValidator('Category'),
            requirements: getRequiredStringValidator('Requirements'),
            price: minNumberValidator(true, 'Price', 1),
            max_group_size: minNumberValidator(true, 'Max Group Size', 1),
            duration: minNumberValidator(true, 'Duration', 1).when('availability', (availability, schema) => {
              return schema.test({
                test: (duration) => {
                  const invalid = Object.values(availability).find((fieldValue) => {
                    return fieldValue.find((item) => item.duration !== duration);
                  });
                  return !invalid;
                },
                message: 'Duration value must match duration of all appointments',
              });
            }),
            country: getRequiredStringValidator('Country'),
            description: getRequiredStringValidator('Description'),
            street: getRequiredStringValidator('Street'),
            city: getRequiredStringValidator('City'),
            state: getRequiredStringValidator('State'),
            zip_code: getRequiredStringValidator('Zip Code'),
            availability: Yup.object().shape({
              regular: availabilityItemValidator.when('on_demand',(on_demand, schema) => { 
                return on_demand.length ? schema : schema.min(1, 'One calendar slot should be provided');
              }),
              on_demand: availabilityItemValidator
              // unavailable: availabilityItemValidator,
            })
          })}
        >
          {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => {
            return (
              <Form>
                <>
                  <DisplayImages
                    images={values.images}
                    setImage={(file, index) => {
                      const images = [...values.images];
                      images[index] = file;
                      setFieldValue('images', images);
                    }}
                  />
                  <ActivitiesDescription {...{ values, errors, touched, handleChange }} />
                  <MeetingLocations {...{ values, errors, touched, handleChange }} />
                  <Schedule {...{ values, errors, touched, setFieldValue, handleChange }} />
                  <div className="submitGroup">
                    <StyledBtn
                      type="reset"
                      title="reset"
                      width="100px"
                      textTransform="uppercase"
                      backgroundColor={colorVars.lightGray}
                      color={colorVars.textBlackColor}
                    />
                    <StyledBtn
                      onClick={handleSubmit}
                      id="btn-next"
                      title={experienceId ? "update" : "create"}
                      width="120px"
                      backgroundColor={colorVars.mainKyflexColor}
                      textTransform="uppercase"
                    />
                  </div>
                </>
              </Form>
            );
          }}
        </Formik>
      </ExperienceFormProvider>
    </div>
  );
};
export { ExperienceForm };
