import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
export default ({
  children,
  onClick,
  place,
  tip,
  btnClassname,
  tipClassname,
}) => (
  <Tooltip title={tip} className={tipClassname} placement={place}>
    <IconButton onClick={onClick} className={btnClassname}>
      {children}
    </IconButton>
  </Tooltip>
);
