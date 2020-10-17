import React from 'react';

import { Link as RLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from '@material-ui/core';
import { HideOnScroll } from '..';
import HeaderSearch from '../HeaderSearch';

import LogoSvg from '../../assets/img/Logo.svg';

const useStyles = makeStyles({
  header: {
    transition: 'background-color .2s',
    backgroundColor: '#EE6002',
    height: 96,
  },
  toolbar: {
    paddingLeft: 32,
    paddingRight: 32,
    height: '100%',
    alignItems: 'center',
  },
  logo: {
    padding: 0,
    margin: 0,
    marginRight: 'auto',
    width: 101,
    height: 32,
    '& img': {
      width: 101,
      height: 32
    }
  },
  login: {
    padding: 0,
    margin: 0,
    marginLeft: 'auto',
    fontSize: 24,
    color: '#000000',
    height: 28,
    textDecoration: 'none',
    cursor: 'pointer',
    textAlign: 'medium',
    display: 'inline-flex',
    transition: 'color .2s',
    '&:hover, &:focus': {
      textDecoration: 'none',
      color: '#6D1EFF',
      '& svg': {
        '& path': {
          fill: '#6D1EFF',
        }
      }
    },
    '& svg': {
      marginLeft: 9,
      marginTop: 'auto',
      marginBottom: 'auto',
      '& path': {
        fill: '#000000',
        transition: 'fill .2s',
      }
    }
  },
  searchOpenButton: {
    padding: 0,
    margin: 0,
    marginLeft: 32,
    cursor: 'pointer',
    display: 'inline-flex',
    '&:hover, &:focus': {
      textDecoration: 'none',
      '& svg': {
        '& path': {
          fill: '#6D1EFF',
        }
      }
    },
    '& svg': {
      marginTop: 'auto',
      marginBottom: 'auto',
      '& path': {
        fill: '#000000',
        transition: 'fill .2s',
      }
    }
  }
});

const Header = (props) => {
  const classes = useStyles();
  const [searchOpened, openSearch] = React.useState(false);
  const [inputSearch, setInputSearch] = React.useState('');

  const handleOpenSearch = () => {
    openSearch(true);
  }

  const handleCloseSearch = () => {
    openSearch(false);
    setInputSearch('');
  }

  return (
    <React.Fragment>
      {
        !searchOpened
          ? (<HideOnScroll {...props}>
            <AppBar className={classes.header}>
              <Toolbar className={classes.toolbar}>
                <RLink className={classes.logo} to='/'>
                  <img src={LogoSvg} alt="logo icon" />
                </RLink>
                <RLink className={classes.login} to='/login'>
                  <span>Войти</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 17L9.6 15.6L12.2 13H2L2 11L12.2 11L9.6 8.4L11 7L16 12L11 17ZM20 5H12V3L20 3C21.1 3 22 3.9 22 5L22 19C22 20.1 21.1 21 20 21L12 21V19L20 19L20 5Z" fill="#828588" />
                  </svg>
                </RLink>
                <Link className={classes.searchOpenButton} onClick={handleOpenSearch}>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.6667 18.6667H19.6133L19.24 18.3067C20.5467 16.7867 21.3333 14.8133 21.3333 12.6667C21.3333 7.88 17.4533 4 12.6667 4C7.88 4 4 7.88 4 12.6667C4 17.4533 7.88 21.3333 12.6667 21.3333C14.8133 21.3333 16.7867 20.5467 18.3067 19.24L18.6667 19.6133V20.6667L25.3333 27.32L27.32 25.3333L20.6667 18.6667ZM12.6667 18.6667C9.34667 18.6667 6.66667 15.9867 6.66667 12.6667C6.66667 9.34667 9.34667 6.66667 12.6667 6.66667C15.9867 6.66667 18.6667 9.34667 18.6667 12.6667C18.6667 15.9867 15.9867 18.6667 12.6667 18.6667Z" fill="#828588" />
                  </svg>
                </Link>
              </Toolbar>
            </AppBar>
          </HideOnScroll>)
          : (<HeaderSearch
            inputSearch={inputSearch}
            handleCloseSearch={handleCloseSearch}
            setInputSearch={setInputSearch}
          />)
      }
    </React.Fragment>
  );
};

export default Header;
