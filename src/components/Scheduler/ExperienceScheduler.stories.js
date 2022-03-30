import React from 'react';

import { ExperienceScheduler } from './ExperienceScheduler';

export default {
  title: 'components/ExperienceScheduler',
  component: ExperienceScheduler,
};

const currentDate = new Date();

const todayString = `${currentDate.getFullYear()}-${
  currentDate.getMonth() + 1
}-${currentDate.getDate()}`;

const schedulerData = [
  {
    startDate: `${todayString}T09:45`,
    endDate: `${todayString}T11:00`,
    title: 'Meeting',
  },
  {
    startDate: `${todayString}T12:00`,
    endDate: `${todayString}T13:30`,
    title: 'Go to a gym',
  },
];

export const _default = () => (
  <ExperienceScheduler
    schedulerData={schedulerData}
    experienceName={'Experience'}
    experienceLengthInMinutes={30}
    height={600}
  />
);
