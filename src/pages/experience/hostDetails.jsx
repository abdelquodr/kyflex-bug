import React from 'react';
import AnonynousUser from '../../assets/images/anonymous_user.png';
import { Grid } from '@material-ui/core';
import { Link } from '@material-ui/core';
import { SingleRating } from '../../components';
import { Typography } from '@material-ui/core';

const HostDetails = ({ host }) => {
  const {
    firstName,
    lastName,
    picture,
    uploadedPicture,
    customerProfile: { description },
  } = host;
  return (
    <Grid container className="experience_host mb-4">
      <h3>About Your Host</h3>
      <Grid item container className="experience_host-body">
        <Grid item xs={12} sm={3} md={2} className="mx-auto text-center">
          <Link href={`/profile/${host.id}`}>
            <img
              className="experience_host-body-img"
              src={uploadedPicture || picture || AnonynousUser}
              loading="lazy"
            />
          </Link>
          <h4>
            {firstName} {lastName}
          </h4>
        </Grid>

        <Grid
          item
          container
          xs={12}
          sm={9}
          md={10}
          className="experience_host-body-desc"
        >
          <p>{description ? description : 'No description found ...'}</p>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HostDetails;
