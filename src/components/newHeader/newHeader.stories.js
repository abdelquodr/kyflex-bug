import React from 'react';
import dummy from 'dummyjs';

import { NewHeader } from '.';

export default {
  title: 'components/NewHeader',
  component: NewHeader,
};

export const LoggedIn = () => (
  <NewHeader
    fixed={null}
    showSearch={true}
    isLoggedIn={true}
    imgUrl={dummy.img(30, 30)}
  />
);
export const LoggedOut = () => (
  <NewHeader fixed={null} showSearch={true} isLoggedIn={false} />
);
