import React, { useState } from 'react';
import { Route, Redirect, useLocation, Switch, useHistory } from 'react-router-dom';
import { Header, Main, Sidebar, Test } from './components';
import { LogRegRes } from './pages';


const App = (props) => {
  const [auth, setAuth] = useState(false);
  let location = useLocation();

  return (
    <React.Fragment>
      <Switch>
        <Route exact path='/test'>
          <Test />
        </Route>
        {
          !auth
            ? (
              <Route exact path={['/login', '/register', '/restore']}>
                <LogRegRes
                  auth={auth}
                  setAuth={setAuth}
                />
              </Route>
            )
            : <Redirect to='/' />
        }
        <Route>
          <Header
            auth={auth}
          />
          <Sidebar
            auth={auth}
          />
          <Main
            auth={auth}
            text={location.pathname}
          />
        </Route>
      </Switch>
      {/* <Header />
      <Sidebar />
      <Main
        text={location.pathname}
      /> */}
    </React.Fragment>
  );
}

export default App;
