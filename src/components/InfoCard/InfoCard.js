import React from 'react';
import '../InfoCard/InfoCard.styles.scss';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

const InfoCard = ({data}) => {
  const {title, url, link, image} = data;
  return (
    <Grid item container xs={12} md={6} className="d-flex justify-content-center align-items-center">
      <div className="info-card" style={{backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.3) 99.99%, rgba(255, 255, 255, 0) 100%), url(${image})`}}>
        <h3>{title}</h3>
        <div className="mb-3"><Link to={url} className="info-card-link">{link} →</Link></div>
      </div>
    </Grid>
  );
};

export default InfoCard;