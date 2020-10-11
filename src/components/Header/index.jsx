import React from 'react';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import AppBar from '@material-ui/core/AppBar';
import Slide from '@material-ui/core/Slide';
import {SearchButton} from '../';
import Button from '../Button';
// import { SvgIcon } from '@material-ui/core';

import './Header.scss'

import LogoSvg from '../../assets/img/Logo.svg';
// import LoginSvg from '../../assets/img/login-24px.svg';


function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = (props) => {
  return (
    <React.Fragment>
      <HideOnScroll {...props}>
        <AppBar>
          <div className='header bgc--orange'>
            <a href="/" className='header__logo'>
              <img src={LogoSvg} alt="logo" />
            </a>
            <Button
              text={'Войти'}
              href='/login'
              iconSvgPath='M11 17L9.6 15.6L12.2 13H2L2 11L12.2 11L9.6 8.4L11 
              7L16 12L11 17ZM20 5H12V3L20 3C21.1 3 22 3.9 22 5L22 19C22 20.1
               21.1 21 20 21L12 21V19L20 19L20 5Z'
              iconSize='24'
              classes={['header__login']}
            />
            <SearchButton/>
          </div>
        </AppBar>
      </HideOnScroll>
    </React.Fragment>
  );
};

export default Header;
