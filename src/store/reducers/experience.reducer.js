import { experienceActionTypes } from "../action.types/experience.action.types";

const initialState = {
  loading: false,
};

const experienceReducer = (state = initialState, { type }) => {
  switch (type) {
    case experienceActionTypes.GET_EXPERIENCE_REQUEST:

    case experienceActionTypes.BOOK_EVENT_REQUEST:
    case experienceActionTypes.GET_BOOKINGS_REQUEST:
    case experienceActionTypes.PAY_FOR_BOOKING_REQUEST:
    case experienceActionTypes.CREATE_EXPERIENCE_REQUEST:
    case experienceActionTypes.FETCH_EXPERIENCES_REQUEST:
    case experienceActionTypes.DELETE_EXPERIENCE_REQUEST:
    case experienceActionTypes.UPDATE_EXPERIENCE_REQUEST:
    case experienceActionTypes.UPDATE_BOOKING_AS_HOST_REQUEST:
    case experienceActionTypes.CANCEL_BOOKING_AS_CUSTOMER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case experienceActionTypes.GET_EXPERIENCE_SUCCESS:
    case experienceActionTypes.GET_EXPERIENCE_FAILURE:
    case experienceActionTypes.CREATE_EXPERIENCE_SUCCESS:
    case experienceActionTypes.CREATE_EXPERIENCE_FAILURE:
    case experienceActionTypes.FETCH_EXPERIENCES_SUCCESS:
    case experienceActionTypes.FETCH_EXPERIENCES_FAILURE:
    case experienceActionTypes.DELETE_EXPERIENCE_SUCCESS:
    case experienceActionTypes.DELETE_EXPERIENCE_FAILURE:
    case experienceActionTypes.UPDATE_EXPERIENCE_SUCCESS:
    case experienceActionTypes.UPDATE_EXPERIENCE_FAILURE:
    case experienceActionTypes.BOOK_EVENT_SUCCESS:
    case experienceActionTypes.GET_BOOKINGS_SUCCESS:
    case experienceActionTypes.BOOK_EVENT_FAILURE:
    case experienceActionTypes.GET_BOOKINGS_FAILURE:
    case experienceActionTypes.PAY_FOR_BOOKING_FAILURE:
    case experienceActionTypes.PAY_FOR_BOOKING_SUCCESS:
    case experienceActionTypes.UPDATE_BOOKING_AS_HOST_SUCCESS:
    case experienceActionTypes.CANCEL_BOOKING_AS_CUSTOMER_SUCCESS:
    case experienceActionTypes.UPDATE_BOOKING_AS_HOST_FAILURE:
    case experienceActionTypes.CANCEL_BOOKING_AS_CUSTOMER_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default experienceReducer;
