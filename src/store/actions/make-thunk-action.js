const makeThunkAction = (requestType, successType, failureType, apiCall, alterPayload) => async (dispatch) => {
  try {
    dispatch({ type: requestType });
    const { data } = await apiCall();
    dispatch({
      type: successType,
      payload: alterPayload ? alterPayload(data) : data,
    });
    return data;
  } catch (error) {
    dispatch({ type: failureType });
    throw error;
  }
};

export default makeThunkAction;
