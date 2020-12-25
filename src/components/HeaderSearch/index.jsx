import React from 'react';

import { stylesDictionary as SD, stylesDictionary } from '../../settings/styles'

import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { ClickAwayListener } from '@material-ui/core';

import SearchSvg from '../../assets/img/search-24px.svg';

const useStyles = makeStyles({
  searchPanel: {
    transition: 'all .2s',
    backgroundColor: SD.basic.colors.main.whiteSmoke,
    height: 64,
  },
  searchToolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: 18,
    paddingRight: 18,
    height: '100%',
    alignItems: 'center',
    border: `solid 3px ${SD.basic.colors.main.blue}`,
  },
  searchInput: {
    width: '90%',
    height: '100%',
    padding: 0,
    paddingLeft: 36,
    margin: 0,
    backgroundColor: 'transparent',
    backgroundImage: `url(${SearchSvg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '18px 100%',
    fontSize: 18,
    lineHeight: '21px',
    color: SD.basic.colors.main.black,
    outline: 'none',
    border: 'none',
  },
  imageButton: {
    padding: 0,
    margin: 0,
    marginLeft: 18,
    cursor: 'pointer',
    display: 'inline-flex',
    transition: 'transform .3s',
    '&:hover, &:focus': {
      textDecoration: 'none',
      '& svg': {
        '& path': {
          fill: SD.basic.colors.main.violetDark,
        }
      }
    },
    '& svg': {
      marginTop: 'auto',
      marginBottom: 'auto',
      width: 18,
      height: 18,
      '& path': {
        fill: SD.basic.colors.main.black,
        transition: 'fill .3s',
      }
    },
  },
  // '@media (max-width: 1599px)': {
  //   searchPanel: {
  //     height: 64,
  //   },
  //   searchToolbar: {
  //     paddingLeft: 54,
  //     paddingRight: 18,   
  //   },
  //   searchInput: {
  //     '& input': {
  //       fontSize: 18,
  //       lineHeight: '21px',
  //     },
  //   },
  //   searchCloseButtonRoot: {
  //     '& svg': {
  //       width: 18,
  //       height: 18,
  //     }
  //   }
  // },
  '@media (min-width: 1600px) and (max-width: 1919px)': {

  },
  '@media (min-width: 1920px)': {

  }
});

const HeaderSearch = ({ inputSearch, handleCloseSearch, setInputSearch }) => {
  const classes = useStyles();
  let history = useHistory();

  const submitSearch = (value) => {
    if (value) {
      history.push(`/results?search_query=${encodeURI(value)}`);
    }
  }

  const onPressKeyHandler = (event) => {
    if (event.key === 'Enter') {
      submitSearch(inputSearch);
    }
  }

  return (
    <ClickAwayListener onClickAway={handleCloseSearch}>
      <AppBar className={classes.searchPanel}>
        <Toolbar className={classes.searchToolbar}>
          <input
            className={classes.searchInput}
            placeholder='Поиск'
            autoFocus
            onKeyPress={onPressKeyHandler}
            onChange={(event) => setInputSearch(event.target.value)}
            value={inputSearch}
          />
          <span
            className={classes.imageButton}
            onClick={handleCloseSearch}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.3337 8.54675L23.4537 6.66675L16.0003 14.1201L8.54699 6.66675L6.66699 8.54675L14.1203 16.0001L6.66699 23.4534L8.54699 25.3334L16.0003 17.8801L23.4537 25.3334L25.3337 23.4534L17.8803 16.0001L25.3337 8.54675Z" fill="black" />
            </svg>
          </span>
        </Toolbar>
      </AppBar>
    </ClickAwayListener>
  )
};

export default HeaderSearch;
