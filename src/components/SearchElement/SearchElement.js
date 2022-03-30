import React from 'react';
import { SearchBar, SearchIcon } from '../.';

const SearchElement = ({
  windowWidth,
  headerVisibleClassName,
  toggleSearchDropdown,
  setToggleSearchDropdown,
}) => {
  if (windowWidth > 700) {
    return (
      <SearchBar className={`newheader__search ${headerVisibleClassName}`} />
    );
  }
  return (
    <SearchIcon
      toggleSearchDropdown={toggleSearchDropdown}
      setToggleSearchDropdown={setToggleSearchDropdown}
    />
  );
};

export { SearchElement };
