import makeThunkAction from './make-thunk-action';
import { experienceActionTypes } from '../action.types/experience.action.types';
import ExperienceAPIService from '../../api.services/experience.api.service';


const experienceService = new ExperienceAPIService();

export const createExperience = (dto) => {
  return makeThunkAction(
    experienceActionTypes.CREATE_EXPERIENCE_REQUEST,
    experienceActionTypes.CREATE_EXPERIENCE_SUCCESS,
    experienceActionTypes.CREATE_EXPERIENCE_FAILURE,
    () => experienceService.create(dto),
  );
};

export const fetchExperiences = (params) => {
  return makeThunkAction(
    experienceActionTypes.FETCH_EXPERIENCES_REQUEST,
    experienceActionTypes.FETCH_EXPERIENCES_SUCCESS,
    experienceActionTypes.FETCH_EXPERIENCES_SUCCESS,
    () => experienceService.fetch(params),
  );
};

export const getExperience = (id) => {
  return makeThunkAction(
    experienceActionTypes.GET_EXPERIENCE_REQUEST,
    experienceActionTypes.GET_EXPERIENCE_SUCCESS,
    experienceActionTypes.GET_EXPERIENCE_SUCCESS,
    () => experienceService.get(id),
  );
};

export const updateExperience = (id, dto) => {
  return makeThunkAction(
    experienceActionTypes.UPDATE_EXPERIENCE_REQUEST,
    experienceActionTypes.UPDATE_EXPERIENCE_SUCCESS,
    experienceActionTypes.UPDATE_EXPERIENCE_SUCCESS,
    () => experienceService.update(id, dto),
  );
};

export const deleteExperience = (id) => {
  return makeThunkAction(
    experienceActionTypes.DELETE_EXPERIENCE_REQUEST,
    experienceActionTypes.DELETE_EXPERIENCE_SUCCESS,
    experienceActionTypes.DELETE_EXPERIENCE_SUCCESS,
    () => experienceService.delete(id),
  );
};

export const bookEvent = (dto) => {
  return makeThunkAction(
    experienceActionTypes.BOOK_EVENT_REQUEST,
    experienceActionTypes.BOOK_EVENT_SUCCESS,
    experienceActionTypes.BOOK_EVENT_FAILURE,
    () => experienceService.bookEvent(dto),
  );
};

export const getBookings = (mode) => {
  return makeThunkAction(
    experienceActionTypes.GET_BOOKINGS_REQUEST,
    experienceActionTypes.GET_BOOKINGS_SUCCESS,
    experienceActionTypes.GET_BOOKINGS_FAILURE,
    () => experienceService.getBookings(mode),
  );
};

export const payForBooking = (bookingId) => {
  return makeThunkAction(
    experienceActionTypes.PAY_FOR_BOOKING_REQUEST,
    experienceActionTypes.PAY_FOR_BOOKING_SUCCESS,
    experienceActionTypes.PAY_FOR_BOOKING_FAILURE,
    () => experienceService.payForBooking(bookingId),
  );
};

export const cancelBookingAsCustomer = (bookingId) => {
  return makeThunkAction(
    experienceActionTypes.CANCEL_BOOKING_AS_CUSTOMER_REQUEST,
    experienceActionTypes.CANCEL_BOOKING_AS_CUSTOMER_SUCCESS,
    experienceActionTypes.CANCEL_BOOKING_AS_CUSTOMER_FAILURE,
    () => experienceService.cancelBookingAsCustomer(bookingId),
  );
}

export const updateBookingAsHost = (bookingId, status) => {
  return makeThunkAction(
    experienceActionTypes.UPDATE_BOOKING_AS_HOST_REQUEST,
    experienceActionTypes.UPDATE_BOOKING_AS_HOST_SUCCESS,
    experienceActionTypes.UPDATE_BOOKING_AS_HOST_FAILURE,
    () => experienceService.updateBookingAsHost(bookingId, status),
  );
}
