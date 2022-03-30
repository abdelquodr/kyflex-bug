import { accountsActionTypes } from "../action.types/accounts.action.types";

const initialState = {
  profile: null,
  isHost: false,
  loading: false,
};

const accountsReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case accountsActionTypes.LOGIN_REQUEST:
    case accountsActionTypes.GET_REVIEWS_REQUEST:
    case accountsActionTypes.GET_PROFILE_REQUEST:
    case accountsActionTypes.SOCIAL_LOGIN_REQUEST:
    case accountsActionTypes.REGISTRATION_REQUEST:
    case accountsActionTypes.VERIFY_TOKEN_REQUEST:
    case accountsActionTypes.VERIFY_EMAIL_REQUEST:
    case accountsActionTypes.REFRESH_TOKEN_REQUEST:
    case accountsActionTypes.UPDATE_PROFILE_REQUEST:
    case accountsActionTypes.RESET_PASSWORD_REQUEST:
    case accountsActionTypes.RESEND_ACTIVATION_REQUEST:
    case accountsActionTypes.GET_SOCIAL_AUTH_URL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case accountsActionTypes.LOGIN_SUCCESS:
    case accountsActionTypes.SOCIAL_LOGIN_SUCCESS:
      const {isHost} = payload;
      delete payload.isHost;

      return {
        ...state,
        isHost,
        loading: false,
        profile: payload,
      };
    case accountsActionTypes.LOGOUT_SUCCESS:
    case accountsActionTypes.GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: payload,
      };
    case accountsActionTypes.UPDATE_IS_HOST_SUCCESS:
      return {
        ...state,
        isHost: payload
      };
    case accountsActionTypes.LOGIN_FAILURE:
    case accountsActionTypes.GET_REVIEWS_SUCCESS:
    case accountsActionTypes.GET_REVIEWS_FAILURE:
    case accountsActionTypes.GET_PROFILE_FAILURE:
    case accountsActionTypes.VERIFY_EMAIL_SUCCESS:
    case accountsActionTypes.VERIFY_EMAIL_FAILURE:
    case accountsActionTypes.SOCIAL_LOGIN_FAILURE:
    case accountsActionTypes.REGISTRATION_SUCCESS:
    case accountsActionTypes.REGISTRATION_FAILURE:
    case accountsActionTypes.VERIFY_TOKEN_SUCCESS:
    case accountsActionTypes.VERIFY_TOKEN_FAILURE:
    case accountsActionTypes.REFRESH_TOKEN_SUCCESS:
    case accountsActionTypes.REFRESH_TOKEN_FAILURE:
    case accountsActionTypes.RESET_PASSWORD_SUCCESS:
    case accountsActionTypes.RESET_PASSWORD_FAILURE:
    case accountsActionTypes.UPDATE_PROFILE_SUCCESS:
    case accountsActionTypes.UPDATE_PROFILE_FAILURE:
    case accountsActionTypes.RESEND_ACTIVATION_SUCCESS:
    case accountsActionTypes.RESEND_ACTIVATION_FAILURE:
    case accountsActionTypes.GET_SOCIAL_AUTH_URL_SUCCESS:
    case accountsActionTypes.GET_SOCIAL_AUTH_URL_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default: return state;
  }
};

export default accountsReducer;
