import React from 'react';

const ButtonText = ({ onClick, text, style, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {text}
    </button>
  )
}

export default ButtonText