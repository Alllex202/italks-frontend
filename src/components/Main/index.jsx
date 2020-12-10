import React from 'react';
import { Switch, Route, useParams, useLocation, Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Category, Overview, Search, Videos } from '../../pages';

const useStyles = makeStyles({
  main: {
    height: 'auto',
    width: '100%',
    padding: '90px 36px 100px 268px',
  },
  mainContainer: {
    height: 'auto',
    width: '976px',
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

const Main = (props) => {
  const classes = useStyles();
  // const 

  return (
    <div className={classes.main}>
      <div className={classes.mainContainer}>
        <Switch>
          <Route exact path="/">
            <Overview />
          </Route>

          <Route exact path={[
            "/category/:categoryId/subcategory/:subcategoryId",
            "/category/:categoryId",
          ]}>
            <Category />
          </Route>

          <Route exact path={[
            "/overview/:period",
            "/:period/category/:categoryId/subcategory/:subcategoryId",
            "/:period/category/:categoryId",
          ]}>
            <PageVideos />
          </Route>

          <Route exact path={'/results'}>
            <PageSearch />
          </Route>

        </Switch>
      </div>
    </div>
  )
};

const PageVideos = (props) => {
  const { period } = useParams();
  return (period === 'week' || period === 'month' || period === 'year') && (
    <Videos />
  )
};

const PageSearch = (props) => {
  const location = useLocation();
  const searchQuery = location.search.split('?search_query=');
  const key = Math.floor(Math.random() * Math.floor(9999999));
  console.log(11)
  // console.log(searchQuery)
  return (
    !(searchQuery.length === 2 && searchQuery[1] !== '')
      ? <Redirect to='/' />
      : <Search
        key={key}
        searchQuery={searchQuery[1]}
      />
  )
};

export default Main;
