import React from 'react';
import {
  useLocation,
} from 'react-router-dom';
import { Header, Main, Sidebar } from './components';

const App = (props) => {

  let location = useLocation();

  return (
    <React.Fragment>
      <Header />
      <Sidebar />
      <Main
        text={location.pathname}
      />
    </React.Fragment>
  );
}

export default App;
