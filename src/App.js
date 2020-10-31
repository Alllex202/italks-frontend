import React from 'react';
import { Route, useLocation, Switch } from 'react-router-dom';
import { Header, Main, Sidebar, Test } from './components';
import { LogRegRes } from './pages';


const App = (props) => {

  let location = useLocation();

  return (
    <React.Fragment>
      <Switch>
        <Route exact path='/test'>
          <Test />
        </Route>
        <Route exact path={['/login', '/register', '/restore']}>
          <LogRegRes />
        </Route>
        <Route>
          <Header />
          <Sidebar />
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
    </React.Fragment>
  );
}

export default App;
