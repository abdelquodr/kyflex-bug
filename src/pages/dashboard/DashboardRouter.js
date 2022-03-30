import React, { useCallback, useEffect, useState } from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
  useHistory,
  useLocation,
  Redirect,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../contexts/UserContext';
import { SideMenu } from '../../components';
import { ProfileSectionWithData } from './ProfileSection';
import { ActiveExperiencesSectionWithData } from './ActiveExperiencesSection';
import { ActiveBookingList } from '../booking/BookingList';
import { Grid, Container } from '@material-ui/core';
import { isEmptyObject } from '../../lib/utils';

const MenuItem = ({ to, children }) => {
  const location = useLocation();
  const history = useHistory();
  const active = location.pathname === to;

  const go = useCallback(
    (e) => {
      e.preventDefault();
      history.push(to);
    },
    [history]
  );

  return (
    <SideMenu.Item active={active} onClick={go} href={to}>
      {children}
    </SideMenu.Item>
  );
};

export const DashboardRouter = () => {
  const match = useRouteMatch();

  const { t } = useTranslation();
  const user = useUser();
  const [isHost, setIsHost] = useState();
  useEffect(()=>{
    if (!isEmptyObject(user)) setIsHost(user.customerProfile.isHost);
  },[user]);
  return (
    <>
      <Container>
        <Grid container spacing={2} style={{minHeight: '80vh'}}>
          <Grid item xs={12} sm={12} md={3}>
            <SideMenu>
              <MenuItem to={`${match.path}/profile`}>
                {t('Profile_Settings')}
              </MenuItem>
              <MenuItem to={`${match.path}/bookings`}>Bookings</MenuItem>
              {/* <MenuItem to={`${match.path}/active-experiences`}>
                Active-experiences
              </MenuItem>
              <MenuItem to={`${match.path}/total-reviews`}>
                Total-reviews
              </MenuItem> */}
              <MenuItem to={`${match.path}/transactions`}>
              {t('Transactions')}
              </MenuItem>
              {isHost && <MenuItem to={`${match.path}/myexperiences`}>
              {t('My_experiences')}
              </MenuItem>}
              {/* <MenuItem to={`/payment`}>Checkout</MenuItem> */}
            </SideMenu>
          </Grid>
          <Grid item container xs={12} sm={12} md={9} className="p-4">
            <Switch>
              <Route path={`${match.path}/profile`}>
                <ProfileSectionWithData />
              </Route>
              <Route path={`${match.path}/bookings`}>
                <ActiveBookingList />
              </Route>
              <Route path={`${match.path}/myexperiences`}>
                <ActiveExperiencesSectionWithData />
              </Route>
              {/* <Route path={`${match.path}/total-reviews`}>total-reviews</Route> */}
              <Route path={`${match.path}/transactions`}>
                Transactions
              </Route>
              {/* <Route path={`${match.path}/payment`}>
                <Payment />
              </Route> */}
              <Redirect to={`${match.path}/profile`} />
            </Switch>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
