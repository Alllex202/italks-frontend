import React from 'react';
import { Switch, Route, useParams, useLocation, Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Category, Overview, Search } from '../../pages';
import { VideoList } from '..';
import { Settings } from '../../settings/settings';

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
          <Route exact path="/overview">
            <Overview />
          </Route>

          
          <Route exact path="/favourites">
            <PageFavourite />
          </Route>

          <Route exact path={[
            "/category/:categoryId/subcategory/:subcategoryId",
            "/category/:categoryId",
          ]}>
            <Category />
          </Route>

          <Route exact path={[
            "/overview/:period",
          ]}>
            <PageOverviewPeriod />
          </Route>

          <Route exact path={[
            "/:period/category/:categoryId/subcategory/:subcategoryId",
            "/:period/category/:categoryId",
          ]}>
            <PageCategoryPeriod />
          </Route>

          <Route exact path={'/results'}>
            <PageSearch />
          </Route>

          <Route>
            <PageNotFind />
          </Route>

        </Switch>
      </div>
    </div>
  )
};

const PageOverviewPeriod = (props) => {
  const { period } = useParams();
  return (period === 'week' || period === 'month' || period === 'year') && (
    <VideoList
      url={`${Settings.serverUrl}/video/`}
      title={(period === 'week' && 'На этой неделе')
        || (period === 'month' && 'В этом месяце')
        || (period === 'year' && 'В этом году')}
      period={period}
    />
  )
};

const PageCategoryPeriod = (props) => {
  const { period, categoryId, subcategoryId } = useParams();
  return (period === 'week' || period === 'month' || period === 'year') && (
    <VideoList
      url={`${Settings.serverUrl}/video/sorted/${categoryId}/`}
      title={(period === 'week' && 'На этой неделе')
        || (period === 'month' && 'В этом месяце')
        || (period === 'year' && 'В этом году')}
      categoryId={categoryId}
      subcategoryId={subcategoryId}
      period={period}
    />
  )
};

const PageSearch = (props) => {
  const location = useLocation();
  const searchQuery = location.search.split('?search_query=');
  const key = Math.floor(Math.random() * Math.floor(9999999));
  return (
    !(searchQuery.length === 2 && searchQuery[1] !== '')
      ? <Redirect to='/' />
      : <Search
        key={key}
        searchQuery={searchQuery[1]}
      />
  )
};

const PageFavourite = () => {
  return (
    <VideoList
      url={`${Settings.serverUrl}/favorites/video/`}
      title={'Избранное'}
    />
  )
};

const PageNotFind = () => {
  return (
    <>Страница не найдена</>
  )
};

export default Main;
