import React from 'react';
import WarningIcon from '@material-ui/icons/ReportProblemOutlined';

export const AlertMessage = ({ message, children }) => {
  return (
    <div className="alertMsg">
      <span>
        <WarningIcon className="danger-icon" />
        {message}
      </span>
      <div className="children">{children}</div>

    </div>
  );
};
