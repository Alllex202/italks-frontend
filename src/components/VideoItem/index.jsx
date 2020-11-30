import React from 'react';

import classNames from 'classnames';

import { stylesDictionary as SD } from '../../settings/styles';

import { makeStyles } from '@material-ui/core';
import TagsBlock from '../TagsBlock';

const useStyles = makeStyles({
  videoItem: {
    width: 226,
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
  },
  videoPreview: {
    width: '100%',
    height: 127,
    position: 'relative',
    marginBottom: 8,
  },
  previewImg: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: SD.basic.colors.translucent.black,
    borderRadius: '4px',
    padding: '1px 2px',
  },
  favouriteIcon: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 24,
    height: 24,
    '& > rect': {
      fill: SD.basic.colors.translucent.black,
    },
    '&:hover': {
      '& > rect': {
        fill: SD.basic.colors.main.black,
      }
    }
  },
  videoTime: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '14px',
    color: SD.basic.colors.main.white,
  },
  videoInfo: {
    marginBottom: 26,
  },
  videoName: {
    display: 'inline-block',
    fontFamily: SD.basic.fontsFamily.Roboto,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '12px',
    lineHeight: '14px',
    color: SD.basic.colors.main.black,
  },
  videoDetails: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '14px',
    color: SD.basic.colors.main.grey,
  },
  videoTags: {

  },
  '@media (min-width: 1600px) and (max-width: 1919px)': {

  },
  '@media (min-width: 1920px)': {

  }
});

const VideoItem = () => {
  const classes = useStyles();

  // const { isFav, fav } = React.useState(false);

  return (
    <div className={classes.videoItem}>
      <div className={classes.videoPreview}>
        <img
          className={classes.previewImg}
          src="https://i.ytimg.com/vi/dyM-1OXdStA/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLDhjzAkVr22LyrPUW_JPUJccUo1sw"
          alt="preview"
        />
        <svg className={classes.favouriteIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="4" fill="black" />
          <path d="M22 9.24L14.81 8.62L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.55 13.97L22 9.24ZM12 15.4L8.24 17.67L9.24 13.39L5.92 10.51L10.3 10.13L12 6.1L13.71 10.14L18.09 10.52L14.77 13.4L15.77 17.68L12 15.4Z" fill="white" />
        </svg>
        <div className={classNames(classes.iconWrapper, classes.videoTime)}>
          <div className={''}>46:13</div>
        </div>
      </div>
      <div className={classes.videoInfo}>
        <span className={classes.videoName}>
          Трое суток без сна / Про безопасность в Тайланде / Приехали на юг к тайскому другу
        </span>
        <span className={classes.videoDetails}>
          {`italks.com • Django Girls • неделю назад`}
        </span>
      </div>
      <div className={classes.videoTags}>
        <TagsBlock videoItem />
      </div>
    </div>
  )
};

export default VideoItem;
