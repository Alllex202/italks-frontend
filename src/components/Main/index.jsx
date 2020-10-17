import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  main: {
    height: 3000,
    width: '100%',
    paddingLeft: 500,
    paddingTop: 500,
  }
});

const Main = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <span>{props.text}</span>
    </div>
  )
};

export default Main;
