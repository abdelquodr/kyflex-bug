import React, { useState } from 'react';
import { Link, Grid, Container } from '@material-ui/core';
import { StyledLinkBtn } from '../../components/buttons';

const TruncatedText = ({ children, className }) => {
  const text = children;
  return <p>{text.slice(0, 100)} ...</p>;
};

export const PostBlock = ({ data }) => {
  const { id, date, title, description, thumbnail } = data;
  return (
    <Grid
      item
      container
      key={id}
      xs={12}
      sm={6}
      md={10}
      lg={6}
      spacing={2}
      className="post"
    >
      <Grid item xs={12} sm={12} md={4} className="post-thumbnail">
        <img src={thumbnail} alt={`${title}`} />
      </Grid>
      <Grid item container xs={12} sm={12} md={8} className="post-content">
        <div className="post-content-date mb-0 pb-0" spacing={0}>
          {date}
        </div>
        <div>
          <h5>{title}</h5>
        </div>
        <div className="post-content-desc">
          <TruncatedText>{description}</TruncatedText>
        </div>
      </Grid>
    </Grid>
  );
};
