import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Overview } from '../../pages';

const useStyles = makeStyles({
  main: {
    height: 'auto',
    width: '100%',
    padding: '90px 36px 100px 268px',
    // paddingLeft: 268,
    // paddingTop: 90,
  }
});

const Main = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Switch>
        <Route exact path="/">
          <Overview />
        </Route>
      </Switch>
    </div>
  )
};

export default Main;
