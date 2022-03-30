import React from 'react';
import SearchIconAsset from '../../assets/icons/search.svg';
import './SearchIcon.styles.scss';

function SearchIcon({ toggleSearchDropdown, setToggleSearchDropdown }) {
  function handleSearchIconClick() {
    if (toggleSearchDropdown) {
      setToggleSearchDropdown(false);
    } else {
      setToggleSearchDropdown(true);
    }
  }

  return (
    <div onClick={handleSearchIconClick}>
      <img id="search-icon" src={SearchIconAsset} alt="search-icon" />
    </div>
  );
}

export { SearchIcon };
