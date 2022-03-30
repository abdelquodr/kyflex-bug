import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


const withAuth = (Component) => (props) => {
  const history = useHistory();
  const profile = useSelector(state => state.accounts.profile);

  useEffect(() => {
    if (!profile) {
      history.push(`/signin?next=${history.location.pathname}`);
    }
  }, [profile]);

  return profile && (
    <Component {...props} />
  )
};

export default withAuth;
