import React from 'react';
import axios from 'axios';
import { Settings } from '../../settings/settings';

const Test = () => {
  const [textHref, setTextHref] = React.useState('');

  const handleChangeInputText = (value) => {
    setTextHref(value);
  };

  const handleGET = () => {
    axios
      .get(`${Settings.serverUrl}${textHref}`)
      .then((response) => {
        console.log(response);
      })
  };

  const handlePOST = () => {
    axios
      .post(`${Settings.serverUrl}${textHref}`)
      .then((response) => {
        console.log(response);
      })
  };

  return (
    <div>
      Вводить адрес в формате "/something" (со слешом в начале)<br />
      <input type='text' value={textHref} onChange={e => handleChangeInputText(e.target.value)} />
      <button onClick={handleGET}>GET</button>
      <button onClick={handlePOST}>POST</button>
    </div>
  )
}

export default Test;
