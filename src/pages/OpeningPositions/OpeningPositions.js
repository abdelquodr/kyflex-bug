import React from 'react';
import { LandingBlock } from '../../components';
import LandingBg from '../../assets/images/landingbg.jpg';
import { OpeningPositionsRouter } from './OpeningPositionsRouter';

const OpeningPositions = () => {
  return (
    <div id="opening-positions" >
      <LandingBlock
        background={LandingBg}
        title="KyFlex Careers"
        fontSize="2.9rem"
      />
      <OpeningPositionsRouter className="container" />
    </div>
  );
};

export default OpeningPositions;