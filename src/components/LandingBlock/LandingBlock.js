import React from 'react';
import { SearchBar } from '../../components';
import { Grid } from '@material-ui/core';

const LandingBlock = React.forwardRef(function LandingBlock(props, ref) {
  const { title, hasSearchBar} = props;
  return (
    <section
      className="landing-block"
      id="landing"
    >
      <Grid container className="landing-block__container">
        <Grid item xs={12} className="text-center d-inline">
          <h2>{title}</h2>
        </Grid>

        {hasSearchBar && (
          <Grid item xs={12} className="d-flex justify-content-center">
            <SearchBar ref={ref} landing={true} />
          </Grid>
        )}
      </Grid>
    </section>
  );
});

export { LandingBlock };
