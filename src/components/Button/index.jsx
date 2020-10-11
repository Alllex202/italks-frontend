import React from 'react';
import ClassNames from 'classnames';

import './Button.scss';

const Button = ({ href, text, classes }) => {
  return (
    <a href={href} className={ClassNames('btn', ...classes)}>{text}</a>
  )
}

export default Button;
