import React from 'react'
import { Link } from 'react-router-dom'

const PageError = ({ statusError }) => {
  return (
    <>
      <div>
        Ошибка {statusError}
      </div>
      <div>
        <Link to='/overview'>На главную</Link>
      </div>
    </>
  )
};

export default PageError;
