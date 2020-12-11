import React from 'react';

import { Route, Redirect, useLocation, Switch, useHistory } from 'react-router-dom';
import { Header, Main, Sidebar, Test } from '../../components';
import { Context } from '../../components/Context';
import { ActivateProfile, LogRegRes } from '../../pages';

const SiteRouting = () => {
  const { auth } = React.useContext(Context);
  return (
    <Switch>
      <Route exact path='/activate/:uid/:token'>
        <ActivateProfile />
      </Route>
      <Route exact path='/test'>
        <Test />
      </Route>
      <Route exact path={[
        '/login',
        '/login/from/star',
        '/login/from/like',
        '/register',
        '/restore'
      ]}>
        {
          !auth
            ? (
              <LogRegRes
              />
            )
            : <Redirect to='/' />
        }
      </Route>
      <Route exact path={'/overview'}>
        <Redirect to='/' />
      </Route>
      <Route>
        <Header />
        <Sidebar />
        <Main />
      </Route>
    </Switch>
  )
};

export default SiteRouting;
