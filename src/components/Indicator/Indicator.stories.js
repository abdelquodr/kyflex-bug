import React from 'react';
import { Indicator } from './Indicator';

export default {
  title: 'components/Indicator',
  component: Indicator,
};

const props = {
  steps: [
    'Activity Description',
    'Meeting Location',
    'Schedule',
    'Your Offers',
  ],
};

export const Default = () => <Indicator {...props} />;
