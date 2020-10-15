import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  main: {
    height: 3000,
    width: '100%',
  }
});

const Main = () => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      
    </div>
  )
};

export default Main;
