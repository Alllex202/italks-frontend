import React from 'react';

import {useHistory} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { IconButton, Input, ClickAwayListener } from '@material-ui/core';

const useStyles = makeStyles({
  searchPanel: {
    transition: 'background-color .2s',
    backgroundColor: '#FAFAFA',
    height: 96,
  },
  searchToolbar: {
    paddingLeft: 75,
    paddingRight: 32,
    height: '100%',
    alignItems: 'center',
  },
  searchInput: {
    width: '90%',
    color: '#000000',
    '& input': {
      padding: 0,
      margin: 0,
      fontSize: 36,
      lineHeight: 42,
    }
  },
  searchCloseButtonRoot: {
    margin: 0,
    marginLeft: 'auto',
    padding: 0,
    transition: 'all .2s',
    '& path': {
      fill: '#000000',
      transition: 'all .2s',
    },
    '&:hover, &:focus': {
      backgroundColor: 'rgba(109, 30, 255, 0.15)',
      '& path': {
        fill: '#6D1EFF'
      },
    },
    '&:active': {
      backgroundColor: '#6D1EFF',
      '& svg path': {
        fill: '#ede5fa'
      },
    }
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
