import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { ButtonTest, List } from './components';

function App() {
  const [statusGet, setStatusGet] = useState(false);
  const [loadingGet, setLoadingGet] = useState(false);
  const [statusPost, setStatusPost] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);
  const [valueInput, setValueInput] = useState('');
  const [list, setList] = useState(null);

  const getList = () => {
    setLoadingGet(true);
    setStatusGet(false);
    setTimeout(() => {
      axios
        .get('http://127.0.0.1:8000/api/tests/') // url
        .then((response) => {
          // console.log('====== Output GET started ======');
          // console.log(response.data);
          // console.log('====== Output GET completed ======');
          setList(response.data);
          setStatusGet(true);
        })
        .catch((error) => {
          console.log(error);
          setStatusGet(false);
        })
        .finally(() => {
          setLoadingGet(false);
        });
    }, 0);
  };

  const postMessage = () => {
    if (!valueInput) {
      setTimeout(() => { alert('Пустое поле!'); }, 0);
      return;
    }
    setLoadingPost(true);
    setStatusPost(false);
    setTimeout(() => {
      axios
        .post('http://127.0.0.1:8000/api/tests/', {
          name: valueInput
        })
        .then((response) => {
          // console.log('====== Output POST started ======');
          // console.log(valueInput);
          // console.log('====== Output POST completed ======');
          setValueInput('');
          setTimeout(() => { setStatusPost(true); }, 0);
          setStatusGet(false);
        })
        .catch((error) => {
          console.log(error);
          setStatusPost(false);
        })
        .finally(() => {
          setLoadingPost(false);
        });
    }, 0);
  };

  useEffect(() => {
    setStatusPost(false);
  }, [valueInput]);

  return (
    <div className='main'>
      Тестовая страница
      <div className='get'>
        <ButtonTest
          onClick={getList}
          text={loadingGet ? 'Загрузка...' : statusGet ? 'Данные получены' : 'Получить данные'}
          style={statusGet ? { backgroundColor: '#a1ffa4' } : {}}
          disabled={loadingGet}
        />
        {list &&
          <List
            values={list}
          />}
      </div>
      <div className='post'>
        <input
          onChange={(e) => {
            setValueInput(e.target.value);
          }}
          placeholder='Введите что-нибудь'
          value={valueInput}
        />
        <ButtonTest
          onClick={postMessage}
          text={loadingPost ? 'Отправка...' : statusPost ? 'Данные отправлены' : 'Отправить данные'}
          style={statusPost ? { backgroundColor: '#a1ffa4' } : {}}
          disabled={loadingPost}
        />
      </div>
    </div>
  );
}

export default App;
