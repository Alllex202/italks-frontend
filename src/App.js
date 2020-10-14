import React from 'react';
import {Header} from './components';

function App(props) {
  return (
    <React.Fragment>
      <Header/>
      <div style={{ height: 3000, backgroundColor: 'white', }} />
    </React.Fragment>
  );
}

export default App;
