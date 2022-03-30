import React from 'react';
import Dummy from 'dummyjs';

import { Avatar } from './Avatar';

export default {
  title: 'components/Avatar',
  component: Avatar,
};

export const Default = () => (
  <Avatar imgUrl={Dummy.img(150, 150)} alt="avatar" />
);
export const Failed = () => <Avatar imgUrl={''} alt="avatar" />;
