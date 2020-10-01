import React, { useState } from 'react'
import axios from 'axios';

const ButtonText = () => {
  const [statusGet, setStatusGet] = useState(false);
  const [loadingGet, setLoadingGet] = useState(null);

  const handlerClick = () => {
    setLoadingGet(true);
    setStatusGet(false);
    setTimeout(() => {
      axios
        .get('http://127.0.0.1:8000/') // url
        .then((response) => {
          console.log('====== Output started ======');
          console.log(response.data);
          setStatusGet(true);
        })
        .catch((error) => {
          console.log(error);
          setStatusGet(false);
        })
        .finally(() => {
          console.log('====== Output completed ======');
          setLoadingGet(false);
        });
    }, 1000);
  };

  return (
    <div>
      <button
        onClick={handlerClick}
        disabled={loadingGet}
        style={statusGet ? { backgroundColor: '#a1ffa4' } : {}}
      >
        {loadingGet ? 'Загрузка...' : statusGet ? 'Данные получены' : 'Получить данные'}
      </button>
    </div>
  )
}

export default ButtonText