import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PageError, PageFavourite, PageOverview } from '../../pages';

const ContentRouting = () => {
  return (
    <Switch>
      <Route exact path='/overview'>
        <PageOverview />
      </Route>
      <Route exact path='/favourites'>
        <PageFavourite />
      </Route>
      <Route>
        <PageError statusError={404} />
      </Route>
    </Switch>
  )
};

export default ContentRouting;
