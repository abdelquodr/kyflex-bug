import React, { useCallback } from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
  useHistory,
  useLocation,
  Redirect,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SideMenu } from '../../components';
import { Grid, Container } from '@material-ui/core';
import JobsList from './JobsList';
import { roles, professionLink } from '../../data';
import './OpeningPositionsRouter.styles.scss';

const MenuItem = ({ to, children }) => {
  const totalRoles = roles.filter(role => role.profession === children || role.jobType === children);
  
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
      {children} ({totalRoles.length})
    </SideMenu.Item>
  );
};

const OpeningPositionsRouter = () => {
  const match = useRouteMatch();
  
  const { t } = useTranslation();
  return (
    <>
      <Container className="pl-5 positions-router">
        <Grid container spacing={2} style={{ minHeight: '80vh' }}>
          <Grid item xs={12} sm={12} md={3}>
            <SideMenu>
              <h3>Job Function</h3>
              {
                professionLink.jobFunction.map((job, index) => <MenuItem to={`${match.path}/${job.link}`} key={index}>{t`(${job.name})`}</MenuItem>)
              }
            </SideMenu>

            <SideMenu>
              <h3>Job Type</h3>
              {
                professionLink.jobType.map((job, index) => <MenuItem to={`${match.path}/${job.link}`} key={index}>{t`(${job.name})`}</MenuItem>)
              }
            </SideMenu>
          </Grid>
          <Grid item container xs={12} sm={12} md={9} className="p-4">
            <Switch>
              {
                professionLink.jobFunction.map((job, index) => <Route path={`${match.path}/${job.link}`} key={index}><JobsList job={job.name} />
                </Route>)
              }

              {
                professionLink.jobType.map((job, index) => <Route path={`${match.path}/${job.link}`} key={index}><JobsList job={job.name} />
                </Route>)
              }
              <Redirect to={`${match.path}/engineering`} />
            </Switch>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export { OpeningPositionsRouter };
