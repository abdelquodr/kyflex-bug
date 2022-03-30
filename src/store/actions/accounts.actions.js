import makeThunkAction from './make-thunk-action';
import AccountsAPIService from "../../api.services/accounts.api.service";
import { accountsActionTypes } from "../action.types/accounts.action.types";
import CookiesData from '../../data/cookies.data';


const accountsService = new AccountsAPIService();

const saveAuthCookies = (data) => {
  const {
    access, access_expires_at, refresh, refresh_expires_at
  } = data;
  const accessTokenOptions = {};
  const refreshTokenOptions = {};
  if (access_expires_at) accessTokenOptions.expires = new Date(access_expires_at);
  if (refresh_expires_at) refreshTokenOptions.expires = new Date(refresh_expires_at);
  CookiesData.setAccessToken(access, accessTokenOptions);
  CookiesData.setRefreshToken(refresh, refreshTokenOptions);
};

export const loginWithEmail = (dto) => {
  return makeThunkAction(
    accountsActionTypes.LOGIN_REQUEST,
    accountsActionTypes.LOGIN_SUCCESS,
    accountsActionTypes.LOGIN_FAILURE,
    () => accountsService.signin(dto),
    (data) => {
      saveAuthCookies(data);
      CookiesData.setIsHost(dto.isHost);
      data.user.isHost = dto.isHost;
      return data.user;
    },
  );
};

export const getSocialAuthURL = (provider) => {
  return makeThunkAction(
    accountsActionTypes.GET_SOCIAL_AUTH_URL_REQUEST,
    accountsActionTypes.GET_SOCIAL_AUTH_URL_SUCCESS,
    accountsActionTypes.GET_SOCIAL_AUTH_URL_FAILURE,
    () => accountsService.getSocialAuthURL(provider),
  );
};

export const socialLogin = (provider, dto, isHost) => {
  return makeThunkAction(
    accountsActionTypes.SOCIAL_LOGIN_REQUEST,
    accountsActionTypes.SOCIAL_LOGIN_SUCCESS,
    accountsActionTypes.SOCIAL_LOGIN_FAILURE,
    () => accountsService.socialLogin(provider, dto),
    (data) => {
      saveAuthCookies(data);
      data.user.isHost = isHost;
      return data.user;
    },
  );
};

export const logout = () => {
  CookiesData.purgeCookies();
  return {
    payload: null,
    type: accountsActionTypes.LOGOUT_SUCCESS,
  };
};

export const setIsHost = (isHost = false) => {
  CookiesData.setIsHost(isHost);
  return {
    payload: isHost,
    type: accountsActionTypes.UPDATE_IS_HOST_SUCCESS,
  };
};

export const register = (dto) => {
  return makeThunkAction(
    accountsActionTypes.REGISTRATION_REQUEST,
    accountsActionTypes.REGISTRATION_SUCCESS,
    accountsActionTypes.REGISTRATION_FAILURE,
    () => accountsService.register(dto),
  );
};

export const resendActivation = (email) => {
  return makeThunkAction(
    accountsActionTypes.RESEND_ACTIVATION_REQUEST,
    accountsActionTypes.RESEND_ACTIVATION_SUCCESS,
    accountsActionTypes.RESEND_ACTIVATION_FAILURE,
    () => accountsService.resendActivation(email),
  );
};

export const verifyToken = () => {
  const accessToken = CookiesData.getAccessToken();
  return makeThunkAction(
    accountsActionTypes.VERIFY_TOKEN_REQUEST,
    accountsActionTypes.VERIFY_TOKEN_SUCCESS,
    accountsActionTypes.VERIFY_TOKEN_FAILURE,
    () => accountsService.verifyToken(accessToken),
  )
};

export const refreshToken = () => {
  const refreshToken = CookiesData.getRefreshToken();
  return makeThunkAction(
    accountsActionTypes.REFRESH_TOKEN_REQUEST,
    accountsActionTypes.REFRESH_TOKEN_SUCCESS,
    accountsActionTypes.REFRESH_TOKEN_FAILURE,
    () => accountsService.refreshToken(refreshToken),
    saveAuthCookies,
  );
}

export const getProfile = () => {
  const isHost = CookiesData.getIsHost();
  return makeThunkAction(
    accountsActionTypes.GET_PROFILE_REQUEST,
    accountsActionTypes.GET_PROFILE_SUCCESS,
    accountsActionTypes.GET_PROFILE_FAILURE,
    () => accountsService.getOwnProfile(isHost),
  );
};

export const updateProfile = (dto) => {
  return makeThunkAction(
    accountsActionTypes.UPDATE_PROFILE_REQUEST,
    accountsActionTypes.UPDATE_PROFILE_SUCCESS,
    accountsActionTypes.UPDATE_PROFILE_FAILURE,
    () => accountsService.updateProfile(dto),
  );
};

export const resetPassword = (email) => {
  return makeThunkAction(
    accountsActionTypes.RESET_PASSWORD_REQUEST,
    accountsActionTypes.RESET_PASSWORD_SUCCESS,
    accountsActionTypes.RESET_PASSWORD_FAILURE,
    () => accountsService.resetPassword(email),
  );
};

export const verifyEmail = (code) => {
  return makeThunkAction(
    accountsActionTypes.VERIFY_EMAIL_REQUEST,
    accountsActionTypes.VERIFY_EMAIL_SUCCESS,
    accountsActionTypes.VERIFY_EMAIL_FAILURE,
    () => accountsService.verifyEmail(code),
  )
}

export const getReviews = (id) => {
  return makeThunkAction(
    accountsActionTypes.GET_REVIEWS_REQUEST,
    accountsActionTypes.GET_REVIEWS_SUCCESS,
    accountsActionTypes.GET_REVIEWS_FAILURE,
    () => accountsService.getReviews(id),
  );
}
