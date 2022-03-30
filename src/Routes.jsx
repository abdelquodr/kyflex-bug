import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { PrivateRoute } from './components';
import {
  Home,
  Team,
  Payment,
  DashboardRouter,
  Register,
  ResetPassword,
  ResetPassword2,
  ExperienceDetails,
  ExperienceDetailsPlaceholder,
  ContactUs,
  About,
  MvpSystem,
  Press,
  FindExperience,
  SiteMap,
  Help,
  Careers,
  Blog,
  Community,
  InviteFriends,
  Callbacks,
  PublicProfile,
  ReviewBooking
} from './pages';
import { useAxiosTokens } from './hooks';
import { ExperienceForm } from './pages/ExperienceForm';
import SearchResults from './pages/SearchResults/SearchResults';

import { Verify as EmailVerificationStep } from './pages/registration/Verify';
import { SignInModal } from './pages';
import OpeningPositions from './pages/OpeningPositions/OpeningPositions';
import CareerDetails from './pages/OpeningPositions/CareerDetails';
import Apply from './pages/OpeningPositions/Apply';

const Routes = ({ searchRef }) => {
  useAxiosTokens();

  return (
    <div>
      <Switch>
        <Route path="/home/verify/:code">
          <EmailVerificationStep />
        </Route>

        <Route path="/signin">
          <SignInModal />
        </Route>
        <Route path="/callback/:authStrategy">
          <Callbacks />
        </Route>
        <Route path="/home">
          <Home searchRef={searchRef} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/mvpsystem">
          <MvpSystem />
        </Route>
        <Route path="/team">
          <Team />
        </Route>
        <Route path="/press">
          <Press />
        </Route>
        <Route path="/findexperience">
          <FindExperience />
        </Route>
        <Route path="/sitemap">
          <SiteMap />
        </Route>
        <Route path="/help">
          <Help />
        </Route>
        <Route path="/contact">
          <ContactUs />
        </Route>
        <Route path="/careers">
          <Careers />
        </Route>
        <Route path="/opening-positions">
          <OpeningPositions />
        </Route>
        <Route path="/career-details/:id">
          <CareerDetails />
        </Route>
        <Route path="/apply/:id">
          <Apply />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/searchresults/">
          <SearchResults />
        </Route>
        <Route path="/blog">
          <Blog />
        </Route>

        <Route path="/community">
          <Community />
        </Route>

        <Route path="/invite-friends">
          <InviteFriends />
        </Route>
        <Route path="/profile/:profileId">
          <PublicProfile/>
        </Route>
        <PrivateRoute path="/dashboard">
          <DashboardRouter />
        </PrivateRoute>

        <PrivateRoute path="/payment">
          <Payment />
        </PrivateRoute>

        <PrivateRoute path="/review/:bookingId">
          <ReviewBooking />
        </PrivateRoute>

        <Route path="/reset">
          <ResetPassword />
        </Route>
        <Route path="/password-reset/confirm/:uid/:token">
          <ResetPassword2 />
        </Route>
        <PrivateRoute path="/experience/new">
          <ExperienceForm />
        </PrivateRoute>
        <PrivateRoute path="/experience/:experienceId/edit">
          <ExperienceForm />
        </PrivateRoute>
        <Route path="/experience/:experienceId" component={ExperienceDetails} />
        <PrivateRoute path="/experience">
          <ExperienceDetailsPlaceholder />
        </PrivateRoute>
        <Redirect to="/home" />

      </Switch>
    </div>
  );
};

export default Routes;
