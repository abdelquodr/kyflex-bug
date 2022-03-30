import React from 'react';
import { SearchResultCard } from '..';

const SearchResultsList = ({ data }) => {
  return data.map((datum) => {
    const { id } = datum;
    return <SearchResultCard key={id} experience={datum} />;
  });
};

export { SearchResultsList };
