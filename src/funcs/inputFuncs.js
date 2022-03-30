/*
    ClearWhiteSpace -> clear white space in the input
    ProperizeInput -> clear the white space and change upper to lower case.
    IsEmtpyInput -> checks if input is empty
*/

const ClearWhiteSpace = (text) => text.replace(' ', '');

const ProperizeInput = (text) => ClearWhiteSpace(text).toLowerCase();

const IsEmptyInput = (text) => {
  return text.length === 0 ? true : false;
};

const ValidateInputs = (inputs) => {
  if (inputs.some((each) => each === '')) {
    return false;
  } else return true;
};

const ValidateBirthday = (birthday) => {
  if (birthday === '1901-01-01') return false;
  else return true;
};

export {
  ProperizeInput,
  ClearWhiteSpace,
  IsEmptyInput,
  ValidateInputs,
  ValidateBirthday,
};
