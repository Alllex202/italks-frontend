import React from 'react';

import classNames from 'classnames';

import { stylesDictionary as SD } from '../../settings/styles';

import { makeStyles } from '@material-ui/core';
import VideoItem from '../VideoItem';

const useStyles = makeStyles({
  previewsBlock: {
    display: 'flex',
    flexDirection: 'column',

  },
  previewsHead: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  previewsTitle: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '16px',
    color: SD.basic.colors.main.grey,
  },
  previewsMore: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',    
    color: SD.basic.colors.main.blue,    
  },
  previewsBody: {

  },
  '@media (min-width: 1600px) and (max-width: 1919px)': {

  },
  '@media (min-width: 1920px)': {

  }
});

const PreviewsBlock = () => {
  const classes = useStyles();
  return (
    <div className={classes.previewsBlock}>
      <div className={classes.previewsHead}>
        <span className={classes.previewsTitle}>На этой неделе</span>
        <a className={classes.previewsMore} href="#click">См. все</a>
      </div>
      <div className={classes.previewsBody}>
        <VideoItem />
      </div>
    </div>
  )
};

export default PreviewsBlock;
