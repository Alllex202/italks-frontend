import React from 'react';

import { Route, Redirect, useLocation, Switch, useHistory, useParams } from 'react-router-dom';
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
        '/password/reset/confirm/:uid/:token',
        '/#/password/reset/confirm/:uid/:token',
        '/login/for/:loginFor',
        '/login',
        '/register',
        '/restore'
      ]}>
        <PagesLogRegRes
          auth={auth}
        />
      </Route>
      <Route path={['/login']}>
        <Redirect to={'/login'} />
      </Route>
      <Route path={['/register']}>
        <Redirect to={'/register'} />
      </Route>
      <Route path={['/restore']}>
        <Redirect to={'/restore'} />
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

const PagesLogRegRes = ({ auth }) => {
  const { loginFor } = useParams();
  return (
    !auth
      ? loginFor === undefined
        ? <LogRegRes />
        : loginFor === 'like'
          || loginFor === 'star'
          ? <LogRegRes loginFor={loginFor} />
          : <Redirect to='/login' />
      : <Redirect to='/' />
  )
};