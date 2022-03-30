import * as Yup from 'yup';


export const requiredNumberValidator = (fieldName) => Yup.number().required(`${fieldName} is required`);

export const minNumberValidator = (required, fieldName, min) => {
  return (
    required ? requiredNumberValidator(fieldName) : Yup.number()
  ).min(min, `${fieldName} cannot be less than ${min}`);
};

export const emailValidator = Yup
  .string()
  .required('Email is required')
  .email('Invalid email address');

export const getRequiredStringValidator = (fieldName) => Yup.string().required(`${fieldName} is required`);

export const getRequiredBooleanValidator = (fieldName) => Yup.boolean().required(`${fieldName} is required`);

export const passwordValidator = Yup
  .string()
  .required('Password is required');

export const minDateValidator = (required, fieldName, min) => {

}
