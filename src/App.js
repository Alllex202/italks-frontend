import React, { useState } from 'react';
import { Route, Redirect, useLocation, Switch, useHistory } from 'react-router-dom';
import { Header, Main, Sidebar, Test } from './components';
import { LogRegRes } from './pages';

import { Context } from './components/Context/index';
import { checkAuth } from './auth/checkAuth';

const App = (props) => {
  const [auth, setAuth] = useState(false);
  const [infoUser, setInfoUser] = useState({
    notifications: [1, 2, 3, 1, 1, 1, 1, 1,],
  });
  let location = useLocation();

  React.useEffect(() => {
    checkAuth(setAuth);
  }, []);

  return (
    <React.Fragment>
      <Context.Provider value={{
        auth, setAuth, infoUser, setInfoUser
      }}>
        <Switch>
          <Route exact path='/test'>
            <Test />
          </Route>
          <Route exact path={['/login', '/register', '/restore']}>
            {
              !auth
                ? (
                  <LogRegRes
                  />
                )
                : <Redirect to='/' />
            }
          </Route>
          <Route>
            <Header
            />
            <Sidebar
            />
            <Main
              text={location.pathname}
            />
          </Route>
        </Switch>
        {/* <Header />
      <Sidebar />
      <Main
        text={location.pathname}
      /> */}
      </Context.Provider>
    </React.Fragment>
  );
}

export default App;
