import React, {useEffect} from 'react';
import { Grid, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {LandingBlock} from '../../components/LandingBlock/LandingBlock';
import { SiteMapLinks } from '../../data/siteMap';
import LandingBg from  '../../assets/images/colors.jpg';

const renderLinks = () => {
  return SiteMapLinks.map((each) => {
    return (
      <Grid item container key={each.id} xs={12} sm={3} md={3} lg={12} className="site_map-block">
        <Grid item xs={12}>
          <h4>{each.subject}</h4>
        </Grid>
        <Grid item container xs={12}>
          {each.links.map((link) => {
            return (
              <Grid item key={link.id} xs={12} sm={12} md={12} lg={3} className="site_map-link">
                <Link to={link.to}>{link.name}</Link>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    );
  });
};

const SiteMap = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section>
      <LandingBlock
        background={LandingBg}
        title="Site Map"
        hasSearchBar={false}
      />
      <Container className="mb-4">
        <Grid container>{renderLinks()}</Grid>
      </Container>
    </section>
  );
};

export { SiteMap };
