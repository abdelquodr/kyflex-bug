import React, { useEffect, useState, useCallback } from 'react';
import { Grid, Container } from '@material-ui/core';
import { useParams } from 'react-router';
import { useAxios } from '../../lib/apiClient';
import { PublicProfileSidebar } from './Sidebar';
import { ExperienceCard } from '../../components';
import { StyledLinkBtn } from '../../components/buttons';
import { PageNotFound } from '../PageNotFound/PageNotFound';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, getReviews } from '../../store/actions/accounts.actions';


export const PublicProfile = () => {
  const dispatch = useDispatch();
  const { profileId } = useParams();
  const { loading, profile } = useSelector(state => state.accounts);
  const [profileData, setProfileData] = useState({});
  const [experienceData, setExperienceData] = useState([]);
  const [windowWidth, setWindowWidth] = useState();
  const [dataNotFound, setDataNotFound] = useState(false);

  const handleWindowWidth = useCallback(function (event) {
    setWindowWidth(window.innerWidth);
  }, [windowWidth]);

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener('resize', handleWindowWidth);
    setWindowWidth(window.innerWidth);

    return () => {
      window.removeEventListener('resize', handleWindowWidth);
    };
  }, [handleWindowWidth]);

  useEffect(() => {
    (async () => {
      try {
        const data = await (dispatch(getReviews(profile?.id)));
        console.log('REVIEWS', {data});
      } catch (error) {
        // TODO: handle error, API not working as expected
      }
    })();
  }, []);

  const Sidebar_Data = {
    lastName: profile?.last_name,
    firstName: profile?.first_name,
    city: profile?.customer_profile?.city,
    rating: profile?.customer_profile?.rating,
    country: profile?.customer_profile?.country,
    numOfReviews: profile?.customer_profile?.num_of_reviews,
  };
  return (
    <>
      {dataNotFound ? (
        <PageNotFound />
      ) : (
        <Container className="w-90 public-profile">
          <Grid container spacing={4}>
            <Grid
              item
              xs={12}
              sm={12}
              md={5}
              className={windowWidth <= 960 ? 'text-center' : ''}
            >
              <PublicProfileSidebar {...Sidebar_Data} />
            </Grid>
            <Grid item xs={12} sm={12} md={7} className="text-center">
              <div className="about">
                <h4>About</h4>
                <p className="about-details">
                  {profileData.description
                    ? profileData.description
                    : 'No description found ...'}
                </p>
              </div>
              <hr />
              <div className="text-center">
                <StyledLinkBtn
                  href="#"
                  title="Contact me"
                  size="md"
                  width="25%"
                  style={{
                    margin: '0.5rem 1.5rem',
                    maxWidth: '200px',
                    minWidth: '150px',
                  }}
                />
                <StyledLinkBtn
                  href="#"
                  size="md"
                  width="25%"
                  backgroundColor="lightgray"
                  color="black"
                  title="Report"
                  style={{
                    margin: '0.5rem 1.5rem',
                    maxWidth: '200px',
                    minWidth: '150px',
                  }}
                />
              </div>
            </Grid>
            <Grid item container xs={12} sm={12} className="mt-4 pt-4">
              <h3 className="experiences">
                {profile?.first_name}'s experiences
              </h3>
              <Grid
                item
                container
                className={windowWidth <= 768 ? 'justify-content-center' : ''}
              >
                {experienceData.map((each) => {
                  return (
                    <Grid item key={each.id}>
                      <ExperienceCard experience={each} />
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
            <Grid item xs={12} className="my-2">
              <hr />
            </Grid>
            <Grid item container xs={12} sm={12}>
              <div id="reviews" className="reviews">
                <h3>Reviews</h3>
                <div>No review found ...</div>
              </div>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};
