import React from 'react';
import LandingBg from '../../assets/images/landingbg.jpg';
import { Grid } from '@material-ui/core';
import './Careers.styles.scss';
import InfoCard from '../../components/InfoCard/InfoCard';
import Mitchell from '../../assets/team/Mitchell.jpg';
import Joshua from '../../assets/team/Joshua.png';
import { CareersInfo, OpenPositions } from '../../data';
import { HeaderContainer } from '../../components/HeaderContainer/HeaderContainer';



const Careers = () => {
  return (
    <div id="careersPage">
      <HeaderContainer
        background={LandingBg}
        title="KyFlex Careers"
        hasButton
        url='/positions'
      />

      <Grid className="careers">

        {/* Section Why Kyflex? */}
        <Grid item container className="careers-WhyKyFlex mb-5">
          <Grid item xs={12} lg={4} md={4} >
            <h1>Why KyFlex?</h1>
          </Grid>
          <Grid item xs={12} lg={8} md={8} className="careers-WhyKyFlex_details mb-4">
            <p>“ We are seeking talented and highly motivated individuals who are passionate about making a great contribution to the tech industry. Mostly, we are looking for candidates who are self- starters, independent and clear thinkers, and are able to pick up new skills at a high speed ”</p>
          </Grid>
        </Grid>

        {/* Section: About Kyflex? */}
        <Grid item container className="mb-5">
          {
            CareersInfo.map((datum, index) => <InfoCard data={datum} key={index} />)
          }
        </Grid>


        {/* Section: Employers quotes */}
        <Grid item container className="mb-5 careers-employee-review">
          <Grid item xs={12}>
            <h2>Hear from our employees</h2>
          </Grid>

          {/* first employee  */}
          <Grid item container xs={12} className="careers-employee-quotes mt-2">
            <Grid item xs={4}>
              <img src={Mitchell} alt="team" width="246px" />
            </Grid>
            <Grid item xs={8} className="p-4">
              <p>“ At KyFlex, we build a future community. We design and deploy a better user experience“</p>
              <p className="text-right">- Mitchell, Front End Developer</p>
            </Grid>
          </Grid>

          {/* secound employee */}
          <Grid item container xs={12} className="careers-employee-quotes mt-5">
            <Grid item xs={8} className="p-4">
              <p>“ Our team is driven by ideas. You are encouraged to be creative. Your ideas matter! “</p>
              <p className="text-right">- Joshua, COO</p>
            </Grid>
            <Grid item xs={4} className="d-flex justify-content-end">
              <img src={Joshua} alt="team" width="246px" />
            </Grid>
          </Grid>

        </Grid>

        {/* Section: Opens at KyFlex */}

        <Grid item container className="mb-5 careers-working-at-kyflex">
          <Grid item xs={12} >
            <h2>Working at KyFlex</h2>
          </Grid>
          <Grid item container >
            {
              OpenPositions.map((datum, index) => <InfoCard data={datum} key={index} />)
            }
          </Grid>
        </Grid>


      </Grid>
    </div>
  )
};

export { Careers };
