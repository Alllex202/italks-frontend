import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { stylesDictionary as SD } from '../../settings/styles';
import { makeStyles } from '@material-ui/core/styles';
import { TagsBlock } from '../../components';

import axios from 'axios';
import classNames from 'classnames';
import { Settings } from '../../settings/settings';
import { Context } from '../../components/Context';
import { getAuthToken } from '../../auth/Auth';

const useStyles = makeStyles({
  pageVideoViewer: {
    display: 'flex',
  },
  video: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 785,
    width: 'calc(100% - 244px)',
    // height: 3333,
  },
  videoPlayerWrapper: {
    minWidth: 785,
    width: '100%',
    position: 'relative',
    paddingTop: 'max(56.25%, 441.5px)',
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  videoData: {
    position: 'relative',
    marginTop: 20,
    padding: '0 18px',
  },
  favouriteButton: {
    position: 'absolute',
    top: 0,
    right: 18,
    width: 24,
    height: 24,
    transition: 'opacity .3s, transform .5s',
    cursor: 'pointer',
  },
  favouriteActive: {
    transform: 'rotate(360deg)',
    '& > $favouriteIcon': {
      opacity: 1,
    }
  },
  videoFavouriteIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 24,
    height: 24,
    transition: 'opacity .3s',
    '& > svg': {
      width: 24,
      height: 24,
      '& > path': {
        fill: SD.basic.colors.main.yellow,
      },
    },
  },
  unfavouriteIcon: {
  },
  favouriteIcon: {
    opacity: 0,
  },
  videoName: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#000000',
  },
  videoBlockDetails: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    color: SD.basic.colors.main.grey,
    marginTop: 12,
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
    '&:not(:last-child)::after': {
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
  videoTags: {
    marginTop: 18,
  },
  recommendedVideo: {
    display: 'flex',
    minWidth: 244,
    maxWidth: 244,
    width: 244,
    backgroundColor: SD.basic.colors.main.whiteSmoke,
  },
  '@media (min-width: 1600px) and (max-width: 1919px)': {

  },
  '@media (min-width: 1920px)': {

  }
});

const PageVideoViewer = () => {
  const classes = useStyles();
  let { videoId } = useParams();
  let history = useHistory();
  const { auth } = React.useContext(Context);
  const [videoData, setVideoData] = React.useState(null);
  const [isFav, setFav] = React.useState(false);
  const [clickedFavourite, clickFavourite] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);

  const handlerClickFavourite = (e) => {
    e.preventDefault();
    if (!auth) {
      history.push('/login/for/star');
    } else if (!clickedFavourite) {
      clickFavourite(true);
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

  React.useEffect(() => {
    if (clickedFavourite) {
      const token = getAuthToken();
      axios
        .post(`${Settings.serverUrl}${getUrlPathForLike()}`, {}, {
          headers: {
            'Authorization': token ? `Token ${token}` : null,
          },
        })
        .then(response => {
          setFav(prev => !prev);
        })
        .catch(error => {
          if (error.response.status === 401) {
            history.push('/login/for/like');
          }
        })
        .finally(() => {
          clickFavourite(false);
        });
    }
  }, [clickedFavourite]);

  React.useEffect(() => {
    axios
      .get(`${Settings.serverUrl}/video/1/`)
      .then(response => {
        console.log(response)
        setVideoData(response.data);
        response.data.is_favorite && setFav(response.data.is_favorite);
      })
      .catch(error => {

      })
      .finally(() => {
        setLoading(false)
      });
  }, []);

  return (
    !isLoading && <div className={classes.pageVideoViewer}>
      <div className={classes.video}>
        <div className={classes.videoPlayerWrapper}>
          <iframe
            className={classes.videoPlayer}
            title='video'
            src={`https://www.youtube-nocookie.com/embed/${videoId}?&autoplay=1&start=0`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className={classes.videoData}>
          <div
            className={classNames(classes.favouriteButton, isFav && classes.favouriteActive)}
            onClick={handlerClickFavourite}
          >
            <div className={classNames(classes.videoFavouriteIcon, classes.favouriteIcon)}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.0003 23.0267L24.2403 28.0001L22.0537 18.6267L29.3337 12.3201L19.747 11.5067L16.0003 2.66675L12.2537 11.5067L2.66699 12.3201L9.94699 18.6267L7.76033 28.0001L16.0003 23.0267Z" fill="#333333" />
              </svg>
            </div>
            <div className={classNames(classes.videoFavouriteIcon, classes.unfavouriteIcon)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 9.24L14.81 8.62L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.55 13.97L22 9.24ZM12 15.4L8.24 17.67L9.24 13.39L5.92 10.51L10.3 10.13L12 6.1L13.71 10.14L18.09 10.52L14.77 13.4L15.77 17.68L12 15.4Z" fill="#FFDD1E" />
              </svg>
            </div>
          </div>
          <span className={classes.videoName}>Machine Learning на Python или зачем я это делаю?</span>
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
              <span className={classes.videoDetail}>
                {videoData.date}
              </span>
            </span>
          </div>
          {
            videoData && videoData.subcategory && videoData.subcategory.length > 0 && (
              <div className={classes.videoTags}>
                <TagsBlock
                  tags={videoData.subcategory}
                  withoutBorder
                  manyStrings
                />
              </div>
            )
          }
        </div>

      </div>
      <div className={classes.recommendedVideo}>

      </div>
    </div>
  )
};

export default PageVideoViewer;
