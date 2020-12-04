import React from 'react';

import classNames from 'classnames';

import { stylesDictionary as SD } from '../../settings/styles';

import { Link as RLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core';
import VideoItem from '../VideoItem';

const useStyles = makeStyles({
  previewsBlock: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 52,
    marginBottom: 24,
    borderBottom: `1px solid ${SD.basic.colors.main.greyLight}`,
    '&:last-child': {
      marginBottom: 0,
    },
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
  videoItem: {
    position: 'absolute',
  },
  previewsBody: {
    position: 'relative',
    height: 185,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 226px)',
    gridAutoFlow: 'column',
    columnGap: 24,
    '& > $videoItem:nth-child(n + 5)': {
      display: 'none',
    },
    '& > $videoItem:nth-child(1)': {
      gridArea: '1 / 1',
    },
    '& > $videoItem:nth-child(2)': {
      gridArea: '1 / 2',
    },
    '& > $videoItem:nth-child(3)': {
      gridArea: '1 / 3',
    },
    '& > $videoItem:nth-child(4)': {
      gridArea: '1 / 4',
    },
    '& > $videoItem:nth-child(5)': {
      gridArea: '1 / 5',
    },
    '& > $videoItem:nth-child(6)': {
      gridArea: '1 / 6',
    },
  },
  '@media (min-width: 1600px) and (max-width: 1919px)': {
    previewsBody: {
      '& > $videoItem:nth-child(5)': {
        display: 'flex',
      },
      '& > $videoItem:nth-child(n + 6)': {
        display: 'none',
      },
    },
  },
  '@media (min-width: 1920px)': {
    previewsBody: {
      '& > $videoItem:nth-child(5), & > $videoItem:nth-child(6)': {
        display: 'flex',
      },
      '& > $videoItem:nth-child(n + 7)': {
        display: 'none',
      },
    },
  },
});

const PreviewsBlock = ({ titleName, url, videos }) => {
  const classes = useStyles();
  return (
    <div className={classes.previewsBlock}>
      <div className={classes.previewsHead}>
        <span className={classes.previewsTitle}>{titleName}</span>
        <RLink className={classes.previewsMore} to={url}>См. все</RLink>
      </div>
      <div className={classes.previewsBody}>
        {
          videos.map(videoData => (
            <VideoItem
              key={videoData.id}
              className={classes.videoItem}
              videoData={videoData}
            />
          ))
        }
      </div>
    </div>
  )
};

export default PreviewsBlock;
