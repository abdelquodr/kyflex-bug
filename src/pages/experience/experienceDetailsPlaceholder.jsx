import React from 'react';
import { Button, Carousel, Container } from 'react-bootstrap';
import { SampleForSearch, SampleExperienceReviews } from '../../data';
import { ExperienceCard, Rating, ReviewBlock } from '../../components';
import Soccer from '../../assets/images/soccer-kids.jpg';
import Breakfast from '../../assets/images/introduction.jpg';
import Profile from '../../assets/images/profile1.png';
import DummyMap from '../../assets/images/google-maps.JPG';
import Maps from '../../components/Maps';
import { useGeocode } from '../../hooks/useGeocode';
import { Marker } from '@react-google-maps/api';

/*
    This page is used to show the experience details of a host.

    //instructions:
    Alistaire:
    Joy:
*/

const ExperienceDetailsPlaceholder = (isLoggedIn) => {
  const { coordinates } = useGeocode(
    'T-Mobile Park, 1st Avenue South, Seattle, WA'
  );
  // console.log('coordinates', coordinates);
  const RenderExperience = (data) =>
    data.map((datum) => {
      const { id } = datum;
      return <ExperienceCard key={id} experience={datum} />;
    });

  const RenderReviews = (data) =>
    data.map((datum) => {
      const { id } = datum;
      return <ReviewBlock key={id} reviews={datum} />;
    });

  return (
    <div id="experience-details">
      <div className="main-content">
        <section id="experience-carousel">
          <Carousel className="carousel-size" indicators={false}>
            <Carousel.Item>
              <img className="cropped" src={Soccer} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="cropped" src={Breakfast} alt="Second slide" />
            </Carousel.Item>
          </Carousel>
        </section>

        <section id="experience-header">
          <div className="experience-header-block">
            <h2>Heavy soccer training for kids under 5 years old</h2>
            <h4>
              <Rating rating={4.5} /> {4.5}({123})
            </h4>
            <h4>
              {0.5} hr • ${6} / person
            </h4>
          </div>
          <div className="experience-header-block">
            <h4>Categories: {'Soccer, Hobby, Workout'}</h4>
            <h4 className="mb-5">Maximum Group Size: {6}</h4>
            <Button
              className="btnExperience"
              size="block"
              onClick={() => alert('Booked')}
            >
              Book Now
            </Button>
          </div>
        </section>

        <div className="experience-border" />

        <section id="experience-host">
          <h3>About Your Host</h3>
          <div className="experience-host-body">
            <div className="experience-host-pic">
              <img className="cropped" src={Profile} />
            </div>
            <div className="experience-host-desc">
              <h4>John Doe</h4>
              <p>
                {`
                                    I am a music and sports Enthusiast. I host fun, group sports activities,
                                    ranging from jogging to basketball tournament. My experience does not need
                                    many things. All you have to do is dress up in sports casual and wear sneakers
                                    and join and have fun!
                                    `}
              </p>
              <div className="text-right mt-5">
                <Button
                  className="btnExperience"
                  size="lg"
                  onClick={() => alert('Dashboard')}
                >
                  My Profile
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="experience-border" />

        <section id="experience-description">
          <h3>Description/Requirement(s)</h3>
          <div className="experience-description-body">
            <div className="experience-description-block" alt="Description">
              <p>
                {`
                                    Do you love jogging? Have you ever jogged alone in the morning?
                                    Have you ever thought you might need some company to jog with?
                                    Then this is the perfect experience for you. You will jog central
                                    park with a group of people who join this experience. Please come
                                    and share your passion for execise.
                                    `}
              </p>
            </div>
            <div className="experience-description-block" alt="Requirement">
              <p>
                {`
                                    Please dress in sports casual and wear sneakers. No previous experience
                                    required. Most of all please have some respect for anyone joining for
                                    the experience.
                                    `}
              </p>
            </div>
          </div>
        </section>

        <section id="experience-availibility">
          <h3>Availibility</h3>
        </section>

        <section id="experience-location">
          <h3>Meeting Location</h3>
          <p>{'T-Mobile Park, 1st Avenue South, Seattle, WA'}</p>
          <Maps className="w-70 h-40" center={coordinates}>
            <Marker position={coordinates} />
          </Maps>
        </section>

        <div className="experience-border" />

        <section id="experience-reviews">
          <h3>Review(s)</h3>
          <div className="experience-reviews-content">
            {RenderReviews(SampleExperienceReviews)}
          </div>
        </section>

        <div className="experience-border" />

        <section id="related-experience">
          <h3>Related Experience</h3>
          <div className="related-experience-body">
            {RenderExperience(SampleForSearch)}
          </div>
        </section>
      </div>
    </div>
  );
};

export { ExperienceDetailsPlaceholder };
