import React from 'react';
import Pagination from '@material-ui/lab/Pagination';

const Paging = ({ setPage, totalData, totalPages }) => {
  const pages = Math.ceil(totalData / totalPages);
  return (
    <Pagination
      count={pages}
      color="primary"
      showFirstButton={true}
      showLastButton={true}
      onChange={(event, value) => setPage(value)}
    />
  );
};

export default Paging;
