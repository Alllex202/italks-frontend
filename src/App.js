import React from 'react';
import { Route, useLocation, Switch } from 'react-router-dom';
import { Header, Main, Sidebar } from './components';
import axios from 'axios';

const App = (props) => {

  let location = useLocation();

  const [textHref, setTextHref] = React.useState('');

  const handleChangeInputText = (value) => {
    setTextHref(value);
  };

  const handleGET = () => {
    axios
        .get(`http://127.0.0.1:8000${textHref}`)
        .then((response) => {          
          console.log(response);
        })
  };

  const handlePOST = () => {
    axios
        .post(`http://127.0.0.1:8000${textHref}`)
        .then((response) => {          
          console.log(response);
        })
  };

  return (
    <React.Fragment>
      <Switch>
        <Route path='/test'>
          Вводить адрес в формате "/something" (со слешом в начале)<br />
          <input type='text' value={textHref} onChange={e => handleChangeInputText(e.target.value)} />
          <button onClick={handleGET}>GET</button>
          <button onClick={handlePOST}>POST</button>
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
