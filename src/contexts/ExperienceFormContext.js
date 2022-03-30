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
import axios from 'axios'


const initialValues = {
  title: '',
  description: '',
  requirements: '',
  price: 0,
  address: {
    street: '',
    apt: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
  },
  category: '',
  maxGroupSize: 0,
  duration: 0,
  availability: [],
  images: [],
};

export const ExperienceFormContext = createContext({
  form: initialValues,
  setUploadImage: () => {},
  submit: () => {},
  useAvailabilityType: () => {},
  loading: false,
  data: {},
});

export const ExperienceFormProvider = ({ children }) => {

  // state
  const [ errorMessage, setErrorMessage ] = useState(null)

  const { t } = useTranslation();
  const history = useHistory();
  const [availType, setAvailType] = useState('');
  nProgress.configure({ showSpinner: true });

  const schemaValidation = Yup.object().shape({
    title: Yup.string()
      .max(255, t('Max_n_chars', { max: 255 }))
      .required(t('Required')),
    description: Yup.string()
      .max(255, t('Max_n_chars', { max: 255 }))
      .required(t('Required')),
    requirements: Yup.string()
      .max(255, t('Max_n_chars', { max: 255 }))
      .required(t('Required')),
    category: Yup.string()
      .required(t('Required'))
      .max(50, t('Max_n_chars', { max: 255 }))
      .oneOf(['Travel', 'Beauty', 'Food', 'Fashion']),
    // price: Yup.number().required(t('Required')),
    address: Yup.object({
      street: Yup.string()
        .max(255, t('Max_n_chars', { max: 255 }))
        .required(t('Required')),
      apt: Yup.string().max(255, t('Max_n_chars', { max: 255 })),
      city: Yup.string()
        .max(255, t('Max_n_chars', { max: 255 }))
        .required(t('Required')),
      state: Yup.string()
        .max(255, t('Max_n_chars', { max: 255 }))
        .required(t('Required')),
      country: Yup.string()
        .max(255, t('Max_n_chars', { max: 255 }))
        .required(t('Required')),
      zipCode: Yup.string()
        .max(255, t('Max_n_chars', { max: 255 }))
        .required(t('Required')),
    }),
    availability: Yup.array().of(Yup.object()),
    images: Yup.array().max(6),
    duration: Yup.number(),
    price: Yup.number().required(),
  })

  const useAvailabilityType = useCallback(
    (defaultAvailType) => {
      if (!availType) setAvailType(defaultAvailType);
      return [availType, setAvailType];
    },
    [availType, setAvailType]
  );

  const methods = useForm({
    defaultValues:  initialValues,
    resolver: yupResolver(schemaValidation),
  });

  const [{ data: experience, error, loading }, postExperience] = useAxios(
    { url: '/experiences/', method: 'POST' },
    { manual: true }
  )

  const { postExperienceImg } = useUploadExperienceImg(
    '/experiences/pictures/'
  );

  useEffect(() => {

    if (experience && !error) {
      nProgress.set(0.2); // 50% task completed
      uploadExperienceImages();
    }
  }, [experience]);


  const uploadExperienceImages = async () => {
    const images = methods.getValues('images');
    
    if (images && images.length) {
      const formData= new FormData();
      formData.append("experience_id",experience.id);
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        formData.append("image", image);
      }
      await postExperienceImg(formData);
      nProgress.done();
      history.push(`/experience/${experience.id}`);
    }
  };

  const submit = (form) => {
    const availability = form.availability.map((a) => {
      let { startDate, endDate } = a;
      startDate = startDate.toISOString();
      endDate = endDate.toISOString();

      return {
        ...a,
        startDate,
        endDate,
        duration: form.duration,
      };
    });
    const data = {
      ...form,
      ...form.address,
      availability: {
        [availType]: availability,
      },
    };
    
    
    nProgress.start();
    apiClient.post(`/experiences/`, data)
      .then(res => {
        if(res.status  === 400) {
          console.log(res)
          setErrorMessage(res?.data?.availability?.non_field_errors[0])
        }
        console.log(res)
      })
      .catch((err) => {
          console.log(err.response, "ERROR FROM EXPERIENCE")
      } );

    // postExperience({ data });
    // delete data['images'];
  };

  const setUploadImage = useCallback(
    (img) => {
      const images = methods.getValues('images') || [];
      images.push(img);
      methods.setValue('images', images);
    },
    [methods]
  );

  const removeImage = useCallback(
    (imageName) => {
      let images = methods.getValues('images');
      images = images.filter((img) => img.name !== imageName);
      methods.setValue('images', images);
    },
    [methods]
  );


  const value = useMemo(
    () => ({
      form: methods.formState,
      submit,
      experience,
      loading,
      setUploadImage,
      removeImage,
      useAvailabilityType,
    }),
    [
      submit,
      experience,
      loading,
      setUploadImage,
      removeImage,
      useAvailabilityType,
    ]
  );

  return (
    <FormProvider {...methods}>
      {
        errorMessage &&   
          <div class="alert alert-danger text-center" role="alert">
            { errorMessage?.non_field_errors[0] }        
          </div>
        // <div class="modal"   style={{  backgroundColor: "red", opacity: 0.6}} tabindex="-1" role="dialog">
        //   <div class="modal-dialog" role="document">
        //     <div class="modal-content">
        //       <div class="modal-header">
        //         <h5 class="modal-title">ERROR</h5>
        //         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        //           <span aria-hidden="true">&times;</span>
        //         </button>
        //       </div>
        //       <div class="modal-body">
        //         <p className="text-danger text-center">{ errorMessage?.non_field_errors[0]}</p>
        //       </div>
        //       <div class="modal-footer">
        //           <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        //       </div>
        //     </div>
        //   </div>
        // </div>
      }

      <ExperienceFormContext.Provider value={value}>
        <form onSubmit={methods.handleSubmit(submit)}>{children}</form>
      </ExperienceFormContext.Provider>
    </FormProvider>
  );
};
