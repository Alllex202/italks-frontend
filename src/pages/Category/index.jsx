import React from 'react';

import classNames from 'classnames';

import axios from 'axios';
import { CSSTransition } from 'react-transition-group';
import { useHistory, useParams } from 'react-router-dom';

import { stylesDictionary as SD } from '../../settings/styles';
import { Settings } from '../../settings/settings';

import { makeStyles } from '@material-ui/core';
import { PreviewsBlock } from '../../components';
import { Context } from '../../components/Context';
import { getAuthToken } from '../../auth/Auth';

const useStyles = makeStyles({
  title: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 23,
    marginBottom: 24,
    borderBottom: `1px solid ${SD.basic.colors.main.greyLight}`,
    // '&:hover': {
    //   '& > $like': {
    //     '&:not($likeActive)': {
    //       opacity: .7,
    //       '&:hover': {
    //         opacity: 1,
    //       },
    //     },
    //     '&$likeActive': {

    //     },
    //   },
    // },
  },
  titleName: {
    fontFamily: SD.basic.fontsFamily.JetBrainsMono,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '48px',
    lineHeight: '60px',
    color: SD.basic.colors.main.black,
  },
  like: {
    width: 24,
    height: 24,
    position: 'relative',
    marginLeft: 18,
    cursor: 'pointer',
    // filter: 'grayscale(1)',
    // opacity: .3,
    transition: 'transform .3s, opacity .3s',
    '&:hover': {
      // filter: 'grayscale(.5)',
      transform: 'scale(1.5)',
    },
  },
  likeActive: {
    // filter: 'grayscale(0)',
    opacity: 1,
    '& > $liked': {
      opacity: 1,
    },
  },
  likeIcon: {
    display: 'block',
    width: 24,
    height: 24,
    position: 'absolute',
    transition: 'opacity .3s',
  },
  liked: {
    opacity: 0,
  },
  unliked: {

  },
  '@media (min-width: 1600px) and (max-width: 1919px)': {

  },
  '@media (min-width: 1920px)': {

  }
});

const Category = () => {
  const classes = useStyles();
  const {
    auth,
    removeFavouritesCategory,
    addFavouritesCategory
  } = React.useContext(Context);
  let history = useHistory();
  const { categoryId, subcategoryId } = useParams();
  const [liked, setLike] = React.useState(false);
  const [lastWeekVideo, setLastWeekVideo] = React.useState([]);
  const [lastMonthVideo, setLastMonthVideo] = React.useState([]);
  const [lastYearVideo, setLastYearVideo] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [pageTItle, setPageTitle] = React.useState('');
  const [clickedFavourite, clickFavourite] = React.useState(false);

  const handlerOnClickLike = (e) => {
    e.preventDefault();
    if (!auth) {
      history.push('/login/for/like');
    } else if (!clickedFavourite) {
      clickFavourite(true);
    }
  };

  const getUrlPathForLike = () => {
    let urlPath = '';
    if (subcategoryId) {
      urlPath += '/favorites/subcategory';
    } else {
      urlPath += '/favorites/category';
    }
    if (liked) {
      urlPath += `/remove`;
    } else {
      urlPath += `/add`;
    }
    urlPath += `/${subcategoryId
      ? subcategoryId
      : categoryId}/`;

    return urlPath;
  };

  React.useEffect(() => {
    console.log('Страница КАТЕГОРИЯ или ПОДКАТЕГОРИЯ');
    const token = getAuthToken();
    axios
      .get(`${Settings.serverUrl}/video/promo/`, {
        headers: {
          'Authorization': token ? `Token ${token}` : null,
        },
        params: {
          category_id: categoryId,
          subcategory_id: subcategoryId,
        }
      })
      .then(response => {
        setLastWeekVideo(response.data.week)
        setLastMonthVideo(response.data.month)
        setLastYearVideo(response.data.year)
        setPageTitle(response.data.subcategory_name || response.data.category_name)
        if (subcategoryId) {
          setLike(response.data.subcategory_is_favorite);
        } else {
          setLike(response.data.category_is_favorite);
        }
      })
      .catch(error => {
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId, subcategoryId]);

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
          liked ? removeFavouritesCategory(response.data) : addFavouritesCategory(response.data);
          setLike(prev => !prev);
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

  return (
    // <CSSTransition
    //   in={isLoadingWeek
    //     && isLoadingMonth
    //     && isLoadingYear
    //     && (lastWeekVideo.length > 0
    //       || lastMonthVideo.length > 0
    //       || lastYearVideo.length > 0)}
    //   timeout={500}
    //   classNames="animation"
    //   unmountOnExit
    // >
    !isLoading
    && (lastWeekVideo.length > 0
      || lastMonthVideo.length > 0
      || lastYearVideo.length > 0) &&
    <div>
      <div className={classes.title}>
        <h1 className={classes.titleName}>{pageTItle}</h1>
        <div
          className={classNames('unselected', classes.like, liked && classes.likeActive)}
          onClick={handlerOnClickLike}
        >
          <div className={classNames(classes.likeIcon, classes.liked)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="#FF3ABA" />
            </svg>
          </div>
          <div className={classNames(classes.likeIcon, classes.unliked)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.5 3C14.76 3 13.09 3.81 12 5.09C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.42 2 8.5C2 12.28 5.4 15.36 10.55 20.04L12 21.35L13.45 20.03C18.6 15.36 22 12.28 22 8.5C22 5.42 19.58 3 16.5 3ZM12.1 18.55L12 18.65L11.9 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 5.99 11.07 7.36H12.94C13.46 5.99 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55Z" fill="#FF3ABA" />
            </svg>
          </div>
        </div>
      </div>
      {
        lastWeekVideo && lastWeekVideo.length > 0 && (
          <PreviewsBlock
            titleName='На этой неделе'
            url={`/week/category/${categoryId}${subcategoryId ? `/subcategory/${subcategoryId}` : ''}`}
            videos={lastWeekVideo}
          />
        )
      }
      {
        lastMonthVideo && lastMonthVideo.length > 0 && (
          <PreviewsBlock
            titleName='В этом месяце'
            url={`/month/category/${categoryId}${subcategoryId ? `/subcategory/${subcategoryId}` : ''}`}
            videos={lastMonthVideo}
          />
        )
      }
      {
        lastYearVideo && lastYearVideo.length > 0 && (
          <PreviewsBlock
            titleName='В этом году'
            url={`/year/category/${categoryId}${subcategoryId ? `/subcategory/${subcategoryId}` : ''}`}
            videos={lastYearVideo}
          />
        )
      }
    </div>

    // </CSSTransition>    
  )
};

export default Category;
