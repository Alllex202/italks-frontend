import React from 'react';

import axios from 'axios';
import classNames from 'classnames';

import { stylesDictionary as SD } from '../../settings/styles';

import { makeStyles } from '@material-ui/core';
import TagsBlock from '../TagsBlock';
import { Context } from '../Context';
import { useHistory } from 'react-router-dom';
import { getAuthToken } from '../../auth/Auth';
import { Settings } from '../../settings/settings';

const useStyles = makeStyles({
  videoItem: {
    position: 'relative',
    width: 226,
    padding: 0,
    display: 'flex',
    backgroundColor: SD.basic.colors.main.white,
    borderColor: 'transparent',
    transition: 'border-color .3s',
    flexDirection: 'column',
    cursor: 'pointer',
    '&:hover': {
      width: 262,
      top: -18,
      left: -18,
      padding: 15,
      border: '3px solid #1E40FF',
      boxShadow: '0px 2px 10px 8px rgba(0, 0, 0, 0.12)',
      borderRadius: '4px',
      zIndex: 1,
      '& $videoTags': {
        marginTop: 26,
        opacity: '1',
      },
      '& > $videoPreview > $favouriteButton': {
        '&$favouriteActive': {
          opacity: 1,
        },
        '&:not($favouriteActive)': {
          opacity: '.7',
          '&:hover': {
            opacity: 1,
          }
        },
      },
    },
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
    objectFit: 'cover',
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: SD.basic.colors.translucent.black,
    borderRadius: '4px',
    padding: '1px 2px',
  },
  favouriteButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 24,
    height: 24,
    opacity: 0,
    transition: 'opacity .3s',
  },
  favouriteActive: {
    opacity: '.7',
    '& > $unfavouriteIcon': {
      opacity: 0,
    }
  },
  videoFavouriteIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 24,
    height: 24,
    transition: 'opacity .3s',
  },
  unfavouriteIcon: {
  },
  favouriteIcon: {
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
  },
  videoName: {
    display: '-webkit-box',
    fontFamily: SD.basic.fontsFamily.Roboto,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '12px',
    lineHeight: '14px',
    color: SD.basic.colors.main.black,
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: '2',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  videoBlockDetails: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '14px',
    color: SD.basic.colors.main.grey,
    marginTop: 8,
  },
  videoDetails: {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: '2',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  videoDetail: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '14px',
    color: SD.basic.colors.main.grey,
    '&::after': {
      content: '"•"',
      margin: '0 5px',
    },
    '& > a': {
      color: SD.basic.colors.main.grey,
      filter: 'brightness(1)',
      transition: 'filter .3s',
      '&:hover': {
        filter: 'brightness(.7)',
      },
    },
  },
  videoDate: {

  },
  videoTags: {
    overflow: 'hidden',
    height: 32,
    marginTop: 0,
    opacity: 0,
    transition: 'margin-top .3s, opacity .3s',
  },
  '@media (min-width: 1600px) and (max-width: 1919px)': {

  },
  '@media (min-width: 1920px)': {

  }
});

const VideoItem = ({ className, videoData }) => {
  const classes = useStyles();
  let history = useHistory();
  const { auth } = React.useContext(Context);
  const [isFav, setFav] = React.useState(videoData.is_favorite);
  const [clickedFavourite, clickFavourite] = React.useState(false);

  const getFullTime = (seconds) => {
    const _hours = Math.floor(seconds / (60 * 60));
    const _minutes = new Intl.NumberFormat('ru', { minimumIntegerDigits: 2 })
      .format(Math.floor(videoData.duration % (60 * 60) / 60));
    const _seconds = new Intl.NumberFormat('ru', { minimumIntegerDigits: 2 })
      .format(videoData.duration % 60);
    return `${_hours > 0 ? `${_hours}:` : ''}${_minutes}:${_seconds}`;
  };

  const getPeriodAgo = (date) => {
    const now = new Date();
    const create = new Date(date);
    const difference = (now - create) / 1000 / 60 / 60 / 24;
    if (difference < 7) {
      if (difference < 1) {
        return 'Сегодня';
      } else {
        const _d = Math.floor(difference);
        if (_d === 1) {
          return 'Вчера';
        } else if (_d >= 2 && _d <= 4) {
          return `${_d} дня назад`;
        } else {
          return `${_d} дней назад`;
        }
      }
    } else if (difference >= 7 && difference < 31) {
      const _w = Math.floor(difference / 7);
      if (_w === 1) {
        return 'Неделю назад';
      } else {
        return `${_w} недели назад`;
      }
    } else if (difference >= 31 && difference < 365) {
      const _m = Math.floor(difference / 30);
      if (_m === 1) {
        return 'Месяц назад';
      } else if (_m >= 2 && _m <= 4) {
        return `${_m} месяца назад`;
      } else {
        return `${_m} месяцев назад`;
      }
    } else if (difference >= 365) {
      const _y = Math.floor(difference / 365);
      if (_y < 10 && _y > 20 && _y % 10 === 1) {
        return 'Год назад';
      } else if (_y < 10 && _y > 20 && _y % 10 >= 2 && _y % 10 <= 4) {
        return `${_y} года назад`;
      } else {
        return `${_y} лет назад`;
      }
    }
  };

  const handlerClickFavourite = (e) => {
    e.preventDefault();
    if (!auth) {
      history.push('/login/for/star');
    } else if (!clickedFavourite) {
      // setFav(!isFav);
      // TODO connect to server

      const token = getAuthToken();
      // console.log(token)
      clickFavourite(true);
      axios
        .post(`${Settings.serverUrl}${getUrlPathForLike()}`, {}, {
          headers: {
            'Authorization': token ? `Token ${token}` : null,
          },
        })
        .then(response => {
          // console.log(111, response)
          setFav(!isFav);
        })
        .catch(error => {
          // console.log(222, error)
          if (error.response.status === 401) {
            history.push('/login/for/like');
          }
        })
        .finally(() => {
          clickFavourite(false);
        });
    }
  };

  const getUrlPathForLike = () => {
    let urlPath = '/favorites/video';
    if (isFav) {
      urlPath += `/remove`;
    } else {
      urlPath += `/add`;
    }
    urlPath += `/${videoData.id}/`;

    return urlPath;
  };

  return (
    <a
      href={`https://youtu.be/${videoData.src}`}
      className={classNames(classes.videoItem, className)}
    >
      <div className={classes.videoPreview}>
        <img
          className={classes.previewImg}
          src={`https://img.youtube.com/vi/${videoData.src}/default.jpg`}
          alt="preview"
          loading="lazy"
        />
        <div
          className={classNames(classes.favouriteButton, isFav && classes.favouriteActive)}
          onClick={handlerClickFavourite}
        >
          <div className={classNames(classes.videoFavouriteIcon, classes.favouriteIcon)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="4" fill="black" />
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="white" />
            </svg>
          </div>
          <div className={classNames(classes.videoFavouriteIcon, classes.unfavouriteIcon)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="4" fill="black" />
              <path d="M22 9.24L14.81 8.62L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.55 13.97L22 9.24ZM12 15.4L8.24 17.67L9.24 13.39L5.92 10.51L10.3 10.13L12 6.1L13.71 10.14L18.09 10.52L14.77 13.4L15.77 17.68L12 15.4Z" fill="white" />
            </svg>
          </div>
        </div>
        <div className={classNames(classes.iconWrapper, classes.videoTime)}>
          <div className={''}>{getFullTime(videoData.duration)}</div>
        </div>
      </div>
      <div className={classes.videoInfo}>
        <span className={classes.videoName}>
          {videoData.name}
        </span>
        <object data="" type="">
          <div className={classes.videoBlockDetails}>
            <span className={classes.videoDetails}>
              <span className={classes.videoDetail}>
                <a href={videoData.resource.src}>
                  {videoData.resource.name}
                </a>
              </span>
              <span className={classes.videoDetail}>
                <a href={videoData.author.src}>
                  {videoData.author.name}
                </a>
              </span>
            </span>
            <span className={classes.videoDate}>
              {getPeriodAgo(videoData.date)}
            </span>
          </div>
        </object>
      </div>
      {
        videoData && videoData.subcategory && videoData.subcategory.length > 0 && (
          <div className={classes.videoTags}>
            <object data="" type="">
              <TagsBlock
                videoItem
                tags={videoData.subcategory.slice(0, 5)}
              />
            </object>
          </div>
        )
      }
    </a>
  )
};

export default VideoItem;
