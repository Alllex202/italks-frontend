import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  main: {
    height: 'auto',
    width: '100%',
    // padding: '90px 36px 100px 268px',
    padding: '65px 0 0 232px',
  },
  '@media (min-width: 1600px) and (max-width: 1919px)': {
  },
  '@media (min-width: 1920px)': {
  }
});

const ContentWrapper = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      {children}
    </div>
  )
};

export default ContentWrapper;