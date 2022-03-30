import React, { useEffect } from 'react';
import { useQueryParams } from '../../hooks/useQueryParams';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import nProgress from 'nprogress';
import '../../components/nprogress.scss';
import './styles.scss';
import LoadingDots from './loadingDots';
import { StyledBtn } from '../../components/buttons';
import { useDispatch, useSelector } from 'react-redux';
import { socialLogin } from '../../store/actions/accounts.actions';

export const Callbacks = () => {
  const dispatch = useDispatch();
  nProgress.configure({ showSpinner: false, minimum: 0.75 });
  const { authStrategy } = useParams();
  const queryParams = useQueryParams();
  const state = queryParams.get('state');
  const code = queryParams.get('code');
  const requestDto = new URLSearchParams();
  requestDto.append('code', code);
  requestDto.append('state', state);
  const loading = useSelector(state => state.accounts.loading);
  const history = useHistory();

  const logUserIn = async (isHost) => {
    try {
      await dispatch(socialLogin(authStrategy, requestDto, isHost));
      history.push('/home');
    } catch (error) {
      // TODO: handle error
    }
  };

  useEffect(() => {
    if (loading) nProgress.start();
    else nProgress.done();
  }, [loading]);

  return (
    <div className="loading">
      {loading && (
        <>
          <h4 className="loading-msg">One moment, we are logging you in</h4>
          <h4 style={{ textAlign: 'center', fontSize: '5rem' }}>
            <LoadingDots />
          </h4>
        </>
      )}

      <div className="loginRoles">
        <h3 className="loginRoles-caption">I want to login as</h3>
        <StyledBtn
          className="mx-4"
          title="Host User"
          width="180px"
          onClick={() => logUserIn(true)}
        />
        <StyledBtn
          className="mx-4"
          title="Customer User"
          width="180px"
          onClick={() => logUserIn(false)}
        />
      </div>
    </div>
  );
};
