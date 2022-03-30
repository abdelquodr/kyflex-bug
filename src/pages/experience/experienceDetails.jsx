import React, { lazy, useEffect, useState, Suspense } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Carousel } from 'react-bootstrap';
import { Marker } from '@react-google-maps/api';

import { ExperienceCard, ExperienceScheduler, Rating } from '../../components';
import Maps from '../../components/Maps';

import { SampleForSearch, SampleExperienceReviews } from '../../data';

import apiClient, { useAxios } from '../../lib/apiClient';
import { useGeocode } from '../../hooks/useGeocode';
import { BookExperienceDialog } from '../../components/Scheduler/BookExperienceModal';
import { useUser } from '../../contexts';
import { useIsLoggedIn } from '../../hooks/useIsLoggedIn';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { isEmptyObject } from '../../lib/utils';

const HostDetails = lazy(() => import('./hostDetails'));
const LazyReviewBlock = lazy(() =>
  import('../../components').then((module) => ({ default: module.ReviewBlock }))
);
/*
    This page is used to show the experience details of a host.
*/

const ExperienceDetails = () => {
  const { experienceId } = useParams();
  const history = useHistory();
  const user = useUser();
  const isLoggedIn = useIsLoggedIn();
  const [openBooking, setOpenBooking] = useState(false);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [fullscreenImg, setFullscreenImg] = useState(false);
  const [availDetails, setAvailDetails] = useState({
    availType: null,
    data: [],
  });

  const [myBookings, setMyBookings] = useState([]);

  const [{ data: experience, loading }] = useAxios(
    `/experiences/${experienceId}/`
  );

  const [{ data: reviews, loadingReviews }] = useAxios(
    `/reviews/${experienceId}/`
  );

  const hostBookingEndpoint = `/bookings/?mode=host&experience_id=${experience?.id}`;
  const custBookingEndpoint = `/bookings/`;

  const { coordinates, setAddress } = useGeocode();
  useEffect(() => {
    if (!isEmptyObject(experience)) {
      setAddress(
        `${experience.street}, ${experience.apt}, ${experience.city}, ${experience.state}, ${experience.country}`
      );
    }
    if (!isEmptyObject(user)) {
      if (user?.customerProfile?.isHost) {
        apiClient
          .get(hostBookingEndpoint)
          .then((res) => {
            // setMyBookings(res.data.results);
            let myBookingSlots = [];
            res.data.results.map((eachBooking) => {
              // myBookingSlots.push(eachBooking.timeslots);
              eachBooking.timeslots.map((eachSlot) =>
                myBookingSlots.push(eachSlot)
              );
            });
            setMyBookings(myBookingSlots);
          })
          .catch((err) => console.log(err));
      } else {
        apiClient
          .get(custBookingEndpoint)
          .then((res) => {
            // setMyBookings(res.data.results);
            let myBookingSlots = [];
            res.data.results.map((eachBooking) => {
              // myBookingSlots.push(eachBooking.timeslots);
              eachBooking.timeslots.map((eachSlot) =>
                myBookingSlots.push(eachSlot)
              );
            });
            setMyBookings(myBookingSlots);
          })
          .catch((err) => console.log(err));
      }
    }
  }, [experience, user]);

  useEffect(() => {
    if (experience) {
      ['regular', 'onDemand', 'unavailable'].forEach((availType) => {
        if (experience.availability[0][`${availType}`].length > 0) {
          setAvailDetails({
            availType: availType,
            data: experience.availability[0][`${availType}`],
          });
        }
      });
    }
  }, [experience?.availability]);

  if (loading) return 'loading...';
  // TODO: create placeholder content for error

  if (!experience) return 'no experience';

  const RenderExperience = (data) =>
    data.map((datum) => {
      const { id } = datum;
      return (
        <ExperienceCard
          key={id}
          experience={datum}
          rating={true}
          author={true}
        />
      );
    });

  const RenderReviews = (data) =>
    data.map((datum) => {
      const { id } = datum;
      return <LazyReviewBlock key={id} review={datum} />;
    });

  const handleOpenBooking = () => {
    if (!isLoggedIn) {
      history.push('/signin');
    }
    if (user) {
      setOpenBooking(true);
    }
  };
  const handleCloseBooking = () => setOpenBooking(false);
  const handleSelectImage = (selectedIndex, e) => {
    setActiveImgIndex(selectedIndex);
  };
  const handleFullscreenImg = () => setFullscreenImg(true);
  const handleExitFullscreenImg = () => setFullscreenImg(!fullscreenImg);

  return (
    <div id="experience-details" className="p-2">
      {user &&
        experience &&
        user.customerProfile &&
        experience.host &&
        user.customerProfile.pk != experience.host.pk && (
          <BookExperienceDialog
            availability={availDetails.data}
            bookings={myBookings || []}
            open={openBooking}
            onClose={handleCloseBooking}
          />
        )}
      <div className="main-content">
        <section id="experience-carousel" className="experience-pics">
          <Carousel
            className="carousel-size"
            indicators={true}
            activeIndex={activeImgIndex}
            onSelect={handleSelectImage}
            interval={fullscreenImg ? null : 1000}
            // interval={null}
          >
            {experience.pictures &&
              experience.pictures.map(({ image, idx }) => (
                <Carousel.Item
                  key={`${idx}-${image}`}
                  onClick={handleFullscreenImg}
                >
                  <img
                    className="cropped"
                    src={image}
                    loading="lazy"
                    alt={image}
                  />
                </Carousel.Item>
              ))}
          </Carousel>
        </section>

        {fullscreenImg && (
          <section>
            <div
              className={fullscreenImg ? 'modal-show' : 'modal-hide'}
              onClick={handleExitFullscreenImg}
            >
              <button className="btn-exit" onClick={handleExitFullscreenImg}>
                <CloseIcon />
              </button>
              <img
                src={experience?.pictures[activeImgIndex]?.image}
                className="modal-content"
              />
            </div>
          </section>
        )}

        <section id="experience-header">
          <Grid container className="my-4" spacing={2}>
            <Grid item xs={12} sm={12}>
              <h2 className="">{experience.title}</h2>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <h4>
                <Rating rating={4.5} /> {4.5} / 5.0 (
                {reviews && reviews.results.length})
              </h4>
              <h4>
                <span className="experience-price">${experience.price}</span> /
                person • {experience.duration} hrs
              </h4>
              <h4 className="mb-5">Max. size: {experience.maxGroupSize}</h4>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <h4>Categories: {experience.category}</h4>

              <Button
                className="btnExperience my-4 w-100"
                size="block"
                onClick={handleOpenBooking}
              >
                Book Now
              </Button>
            </Grid>
          </Grid>
        </section>
        <Suspense fallback={<div>Loading host information...</div>}>
          <section id="experience-host">
            <HostDetails host={experience.host} />
          </section>
        </Suspense>

        <section id="experience-description">
          <h3>Description</h3>
          <Grid container spacing={2} className="ml-2">
            <Grid item xs={12} sm={12} md={12}>
              <p>{experience.description}</p>
            </Grid>
          </Grid>
        </section>

        <section id="experience-requirements">
          <h3>Requirments</h3>
          <Grid container spacing={2} className="ml-2">
            <Grid item xs={12} sm={12} md={12}>
              <p>{experience.requirements}</p>
            </Grid>
          </Grid>
        </section>

        <section id="experience-availability">
          <div className="my-4 pb-4">
            <h3>Availibility</h3>
            <ExperienceScheduler
              schedulerData={availDetails.data}
              experienceLengthInMinutes={30}
              experienceName={experience.title}
              bookings={myBookings || []}
              height={400}
              editable
            />
          </div>
        </section>

        <section id="experience-location">
          <div className="my-4 pb-4">
            <h3>Meeting location</h3>
            <h5 className="ml-3">{`${experience.street}, ${
              experience.apt ? experience.apt + ',' : ''
            } ${experience.city}, ${experience.state}, ${
              experience.country
            }`}</h5>
            <Maps className="w-70 h-40" center={coordinates}>
              <Marker position={coordinates} />
            </Maps>
          </div>
        </section>

        <section id="related-experience">
          <h3>Related experience</h3>
          <div className="related-experience-body">
            {RenderExperience(SampleForSearch)}
          </div>
        </section>

        <section id="experience-reviews">
          <div className="mt-4 mb-2">
            <h3>Reviews</h3>
            {!loadingReviews && (
              <Suspense fallback={<div>Loading reviews...</div>}>
                <div className="experience-reviews-content">
                  {reviews &&
                    !isEmptyObject(reviews.results) &&
                    RenderReviews(reviews.results)}
                  {!reviews ||
                    (isEmptyObject(reviews.results) && (
                      <div>No review found</div>
                    ))}
                </div>
              </Suspense>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export { ExperienceDetails };
