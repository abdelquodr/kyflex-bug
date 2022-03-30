import React from 'react';

import { ExperienceCard } from './experienceCard';
import { SampleForSearch } from '../../data';

export default {
  title: 'components/ExperienceCard',
  component: ExperienceCard,
};

export const Default = () => <ExperienceCard experience={SampleForSearch[0]} />;
