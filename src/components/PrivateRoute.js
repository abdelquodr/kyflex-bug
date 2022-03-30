import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';


export const PrivateRoute = ({ children, ...rest }) => {
  const history = useHistory()
  const profile = useSelector(state => state.accounts.profile);

  useEffect(() => {
    if (!profile) {
      history.push(`/signin?next=${history.location.pathname}`);
    }
  }, [profile]);

  return profile && (
    <Route
      {...rest}
      render={() => children}
    />
  );
};
