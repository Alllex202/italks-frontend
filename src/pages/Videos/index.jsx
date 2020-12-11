import React from 'react';

import classNames from 'classnames';

import axios from 'axios';

import { CSSTransition } from 'react-transition-group';

import { stylesDictionary as SD } from '../../settings/styles';
import { Settings } from '../../settings/settings';

import { ClickAwayListener, makeStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { RoundedButton, VideoItem, VideoList } from '../../components';

const useStyles = makeStyles({  
  '@media (min-width: 1600px) and (max-width: 1919px)': {

  },
  '@media (min-width: 1920px)': {

  }
});

const Videos = (props) => {
  const classes = useStyles();
  const { period, categoryId, subcategoryId } = useParams();
  
  return (
    <VideoList
      title={period}
      categoryId={categoryId}
      subcategoryId={subcategoryId}
      period={period}
    />
  )
};

export default Videos;
