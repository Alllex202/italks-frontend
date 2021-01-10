import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  mainContainer: {
    height: 'auto',
    width: '976px',
    padding: '25px 0 100px 0',
    margin: '0 auto',
  },
  '@media (min-width: 1600px) and (max-width: 1919px)': {
    mainContainer: {
      width: 1226,
    },
  },
  '@media (min-width: 1920px)': {
    mainContainer: {
      width: 1476,
    },
  }
});

const ContentContainer = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.mainContainer}>
      {children}
    </div>
  )
};

export default ContentContainer;