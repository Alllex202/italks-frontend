import React from 'react';
import { makeStyles } from '@material-ui/core';
import { RoundedButton, VideoItem } from '../../components';
import { stylesDictionary as SD } from '../../settings/styles';
import classNames from 'classnames';

const useStyles = makeStyles({
  recommendedVideoTitle: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '16px',
    color: SD.basic.colors.main.grey,
    margin: '25px 0',
  },
  marginBottom: {
    marginBottom: 52,
  },
  recommendedVideoMoreBtn: {
    height: 48,
  },
  hidden: {
    visibility: 'hidden',
  },
  '@media (min-width: 1600px) and (max-width: 1919px)': {

  },
  '@media (min-width: 1920px)': {

  }
})

const ListRecommendedVideo = ({ isLastPage, videos, onLoadVideoMore, isLoading }) => {
  const classes = useStyles();

  return (
    <>
      <span className={classes.recommendedVideoTitle}>Рекомендации</span>
      {
        videos && videos.map((video, ind) => (
          <VideoItem
            // key={video.id}
            key={ind}
            className={classes.marginBottom}
            videoData={video}
            withoutBorder
            withoutTags
          />
        ))
      }
      {
        !isLastPage
        && videos
        && videos.length > 0
        && <RoundedButton
          className={classNames(classes.recommendedVideoMoreBtn)}
          children='Показать ещё'
          onClick={onLoadVideoMore}
          disabled={isLoading}
        />
      }
    </>
  )
};

export default ListRecommendedVideo;