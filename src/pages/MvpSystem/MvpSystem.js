import React, { useEffect } from 'react';
import MvpSystemPDF from '../../assets/pdfs/MvpSystem.pdf';
import { Grid } from '@material-ui/core';
import './MvpSystem.styles.scss';

const MvpSystem = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Grid container className="mvp-system">
      <Grid item xs={12}>
        <h1>MVP System</h1>
      </Grid>
      <Grid item xs={12}>
        <iframe src={`${MvpSystemPDF}`} loading="lazy" title="MVP Doc"/>
      </Grid>
    </Grid>
  );
};

export { MvpSystem };
