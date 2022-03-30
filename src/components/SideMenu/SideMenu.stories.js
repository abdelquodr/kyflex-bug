import React from 'react';

import { SideMenu } from './SideMenu';

export default {
  title: 'components/SideMenu',
  component: SideMenu,
};

export const Default = () => (
  <SideMenu>
    <SideMenu.Item active>Profile</SideMenu.Item>
    <SideMenu.Item>Rating</SideMenu.Item>
    <SideMenu.Item>Another Example</SideMenu.Item>
  </SideMenu>
);
