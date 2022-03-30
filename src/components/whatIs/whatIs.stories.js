import React from 'react';

import { WhatIsSection } from '.';
import { WhatIsKyFlexContents } from '../../data';

export default {
  title: 'components/WhatIsSection',
  component: WhatIsSection,
};

export const Default = () => <WhatIsSection data={WhatIsKyFlexContents} />;
