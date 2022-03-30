import React from 'react';
import { Grid } from '@material-ui/core';
import { StyledLinkBtn } from '../buttons';
import './HeaderContainer.styles.scss';

const HeaderContainer = (props) => {
  const { background, title, hasButton } = props;
  return (
    <section
      className="header-container"
      id="headerContainer"
      style={{ backgroundImage: `url(${background})` }}
    >
      <Grid container className="header-container__content">
        <Grid item xs={12} className="text-center d-inline">
          <h2>{title}</h2>
        </Grid>

        {hasButton && (
          <Grid item xs={12} className="d-flex justify-content-center header-container__button">
            <StyledLinkBtn
              className="font-weight-bold"
              title="Join KyFlex Talent →"
              href="/home"
              backgroundColor="white"
              color="#FC781C"
            />
          </Grid>
        )}
      </Grid>
    </section>
  );
}

export { HeaderContainer };
