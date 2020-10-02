import React from 'react'

const List = ({values}) => {


  return (
    <ul>
      {values.map((el, index) => (<li key={index}>{el.name}</li>))}
    </ul>
  )
}

export default List;
