import React from 'react';
import ClassNames from 'classnames';

import { SvgIcon } from '@material-ui/core'

import './Button.scss';

const Button = ({ href, text, iconSvgPath, iconColor, classes }) => {
  return (
    <a href={href} className={classes ? ClassNames('btn', ...classes) : 'btn'}>
      {text && <span>{text}</span>}
      {iconSvgPath && (
        <SvgIcon style={{ color: iconColor }}>
          <path d={iconSvgPath} />
        </SvgIcon>
      )}
    </a>
  )
}

export default Button;
