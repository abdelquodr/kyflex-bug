import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, Typography, Grid, Link } from '@material-ui/core';

// images
import AboutUsHeaderImage from '../../assets/images/about_us_header.jpg';
import SylvesterTransparent from '../../assets/images/Sylvester_transparent.png';
import yogaLady from '../../assets/images/yoga_lady.png';
import groupAtSunset from '../../assets/images/group_at_sunset.png';
import backOfMansHead from '../../assets/images/back_of_mans_head.png';
import {StyledLinkBtn} from '../../components/buttons';

const useStyles = makeStyles({
  button: {
    backgroundColor: '#fb5012',
    color: '#FFFFFF',
    fontSize: '1rem',
    border: 'none',
    padding: '0.375rem 0.75rem',
    borderRadius: '0.25rem',
    '&:hover': {
      color: '#FFFFFF',
      textDecoration: 'none',
    },
  },

  aboutUsHeader: {
    color: 'white',
    paddingTop: '1rem',
    textAlign: 'center',
    background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${AboutUsHeaderImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  aboutUsSubHeader: { padding: '3rem', textAlign: 'right' },

  aboutUsSubHeaderTitle: { marginBottom: '1rem' },

  aboutUsContent: {
    margin: '2rem 10rem',
    padding: '0 2rem',
    '@media (max-width: 960px)': {
      margin: '2rem 1rem',
      padding: '0 2rem',
    },
  },
});

const About = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [windowWidth, setWindowWidth] = useState();

  useEffect(() => {
    window.addEventListener('resize', function (event) {
      setWindowWidth(window.innerWidth);
    });
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Grid container id="about-us">
      <Grid item container className={classes.aboutUsHeader}>
        <Grid item xs={12}>
          <Typography variant="h3">About Us</Typography>
        </Grid>
        {windowWidth > 960 && (
          <Grid item md={6}>
            <img
              src={SylvesterTransparent}
              alt="KyFlex's CEO: Sylvester Amponsah"
            />
          </Grid>
        )}
        <Grid item sm={12} md={6} className={classes.aboutUsSubHeader}>
          <div className={classes.aboutUsSubHeaderTitle}>
            <Typography variant="h5">A Brief message from our CEO</Typography>
            <Typography>-Sylvester Amponsah</Typography>
          </div>
          <Typography>
            “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.”
          </Typography>
        </Grid>
      </Grid>

      <Grid item container className={classes.aboutUsContent}>
        <Grid item sm={12}>
          <Typography variant="h4" align="center">
            “Our Vision to Connect the World One Experience at a Time”
          </Typography>
        </Grid>
        <Grid item sm={12} align="center">
          <Typography className="px-4 mt-2 mb-4">
            KyFlex is a web and mobile platform for you to explore your most
            desired experiences. We have made booking and hosting experiences as
            easy as the press of a button. Share your expertise with the world -
            let us build a better place without social barriers.
          </Typography>
        </Grid>
        <Grid item container sm={12} className="my-4">
          <Grid item sm={12} md={6} className="p-4">
            <img src={yogaLady} alt="woman doing yoga" className="w-100 my-2" />
            <Typography variant="h5" gutterBottom={true}>
              Lorem Ipsum dolor
            </Typography>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Grid>
          <Grid item sm={12} md={6} className="p-4">
            <img
              src={groupAtSunset}
              alt="group of people standing in front of sunset"
              className="w-100 my-2"
            />
            <Typography variant="h5" gutterBottom={true}>
              Lorem Ipsum dolor
            </Typography>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Grid>
          <Grid item sm={12} className="p-4">
            <img
              src={backOfMansHead}
              alt="back of man's head"
              className="w-100 my-2"
            />
            <Typography variant="h5" gutterBottom={true}>
              Start Your Career With Us!
            </Typography>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
            <div className="text-right my-4">
              <StyledLinkBtn href="/careers" title="Career Page" size="md"/> 
            </div>            
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export { About };
