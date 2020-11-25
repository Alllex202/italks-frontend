import React from 'react';

import {stylesDictionary as SD, stylesDictionary} from '../../settings/styles'

import {useHistory} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { IconButton, Input, ClickAwayListener } from '@material-ui/core';

const useStyles = makeStyles({
  searchPanel: {
    transition: 'all .2s',
    backgroundColor: SD.basic.colors.main.whiteSmoke,
    height: 64,
  },
  searchToolbar: {
    paddingLeft: 54,
    paddingRight: 18,   
    height: '100%',
    alignItems: 'center',
    border: `solid 3px ${SD.basic.colors.main.blue}`,
  },
  searchInput: {
    width: '90%',
    color: SD.basic.colors.main.black,
    '& input': {
      padding: 0,
      margin: 0,
      fontSize: 18,
      lineHeight: '21px',
    },
  },
  searchCloseButtonRoot: {
    margin: 0,
    marginLeft: 'auto',
    padding: 0,
    transition: 'all .2s',
    '& svg': {
      width: 18,
      height: 18,
    },
    '& path': {
      fill: SD.basic.colors.main.black,
      transition: 'all .2s',
    },
    '&:hover, &:focus': {
      backgroundColor: SD.basic.colors.translucent.violet,
      '& path': {
        fill: SD.basic.colors.main.violetDark,
      },
    },
    '&:active': {
      backgroundColor: SD.basic.colors.main.violetDark,
      '& svg path': {
        fill: SD.basic.colors.main.white,
      },
    },
  },  
  '@media (max-width: 1599px)': {
    searchPanel: {
      height: 64,
    },
    searchToolbar: {
      paddingLeft: 54,
      paddingRight: 18,   
    },
    searchInput: {
      '& input': {
        fontSize: 18,
        lineHeight: '21px',
      },
    },
    searchCloseButtonRoot: {
      '& svg': {
        width: 18,
        height: 18,
      }
    }
  },
  '@media (min-width: 1600px) and (max-width: 1919px)': {
    
  },
  '@media (min-width: 1920px)': {
    
  }
});

const HeaderSearch = ({inputSearch, handleCloseSearch, setInputSearch}) => {
  const classes = useStyles();
  let history = useHistory();

  const submitSearch = (value) => {
    if (value) {
      console.log(value);
      history.push('/search');
    }
    // TODO
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
          <Input
            className={classes.searchInput}
            placeholder='Поиск'
            autoFocus
            disableUnderline
            onKeyPress={onPressKeyHandler}
            onChange={(event) => setInputSearch(event.target.value)}
            value={inputSearch}
          />
          <IconButton
            color='primary'
            disableRipple
            classes={{
              root: classes.searchCloseButtonRoot,
            }}
            onClick={handleCloseSearch}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.3337 8.54675L23.4537 6.66675L16.0003 14.1201L8.54699 6.66675L6.66699 8.54675L14.1203 16.0001L6.66699 23.4534L8.54699 25.3334L16.0003 17.8801L23.4537 25.3334L25.3337 23.4534L17.8803 16.0001L25.3337 8.54675Z" fill="black" />
            </svg>
          </IconButton>
        </Toolbar>
      </AppBar>
    </ClickAwayListener>
  )
};

export default HeaderSearch;
