import React from 'react';

import { DashboardHeader } from './DashboardHeader';

export default {
  title: 'components/DashboardHeader',
  component: DashboardHeader,
};

const props = {
  imgUrl:
    'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?cs=srgb&dl=pexels-mentatdgt-1024311.jpg&fm=jpg',
  name: 'Mai Van Wagner',
  description:
    'An sports enthusiast. I host fun sports activities.I used to play baseball professionally.',
  rating: 4.2,
  totalReviews: 123,
  balance: 1500,
};

export const Default = () => <DashboardHeader {...props} />;
