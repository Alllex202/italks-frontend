import React from 'react';
import { Button } from './components';

function App() {
  return (
    <div>
      <Button
        text='Тестовая кнопка'
        classes={['btn-rounded', 'btn--red']}
      />
      <br />
      <Button
        href='http://google.com'
        text='Тестовая кнопка 2'
        classes={['btn-rounded', 'btn--red']}
      />
    </div>
  );
}

export default App;
