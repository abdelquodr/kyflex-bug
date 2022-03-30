import React, {useEffect} from 'react';
import LandingBg from '../../assets/images/news_bg.jpg';
import {LandingBlock} from '../../components/LandingBlock/LandingBlock';
import {Grid, Container} from '@material-ui/core';
import {PostBlock} from './PostBlock';
import {pressData} from '../../data/press';
import logos from '../../assets/images/logos.png';

const renderPressPosts = (data) => {
  return data.map(post => {
    return <PostBlock data={post} />
    
    
  });
};

export const Press = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="press">
      <LandingBlock searchBar={false} title="Press" background={LandingBg}/>
      <Grid container xs={10} className="mx-auto my-4 px-4">
        {renderPressPosts(pressData)}   
      </Grid>
      <Grid container xs={10} className="mx-auto my-4 px-4">
        <h3>Our partners</h3>
        <img src={logos} width="100%" />
      </Grid>

    </div>

  );
};


