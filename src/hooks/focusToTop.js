import { useEffect } from 'react';

/*
    This hook sets focus to the top of the page when entering.
*/

const FocusToTop = () => {
  useEffect(() => window.scrollTo(0, 0));
};

export { FocusToTop };
