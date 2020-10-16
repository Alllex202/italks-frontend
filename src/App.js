import React from 'react';
import { Header, Main, Sidebar } from './components';

function App(props) {

  return (
    <React.Fragment>
      <Header />
      <Sidebar />
      <Main />
    </React.Fragment>
  );
}

export default App;
