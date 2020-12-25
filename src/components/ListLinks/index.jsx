import React from 'react';
import classNames from 'classnames';

import { stylesDictionary as SD } from '../../settings/styles';

import { makeStyles } from '@material-ui/core/styles';

import { Divider } from '@material-ui/core';

import { Link as RLink, useLocation, useParams } from 'react-router-dom';

const useStyles = makeStyles({
  listLinks: {
    padding: 0,
  },
  listLinksItem: {
    display: 'flex',
    alignItems: 'center',
    height: 42,
    paddingLeft: 18,
    paddingRight: 18,
    backgroundColor: 'transparent',
    color: SD.basic.colors.main.blackLight,
    transition: '.2s background-color, .2s color, .3s height, .3s opacity',
    cursor: 'pointer',
    overflow: 'hidden',
    '&:hover, &:focus': {
      backgroundColor: SD.basic.colors.translucent.violet,
    },
    '&:active': {
      color: SD.basic.colors.main.violetDark,
      '& path': {
        fill: SD.basic.colors.main.violetDark,
      }
    },
  },
  listLinksItemHidden: {
    height: 0,
  },
  listLinksIcon: {
    width: 18,
    height: 18,
    minWidth: 18,
    minHeight: 18,
    marginRight: 18,
    '& path': {
      transition: '.2s fill',
      fill: SD.basic.colors.main.blackLight,
    },
    '& svg': {
      width: 18,
      height: 18,
    },
  },
  listLinksText: {
    display: '-webkit-box',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: '1',
    fontFamily: SD.basic.fontsFamily.JetBrainsMono,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: '17px',
    '& span': {
    },
  },
  listLinksSelected: {
    color: SD.basic.colors.main.violetDark,
    '& path': {
      fill: SD.basic.colors.main.violetDark,
    },
  },
  listLinksLink: {
    textDecoration: 'none',
  },
  listLinksClose: {
    '& > ul:nth-child(n+5)': {
      '& > a > span': {
        height: 0,
        opacity: 0,
      },
    },
  },
  buttonShowMore: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 42,
    width: '100%',
    paddingLeft: 18,
    paddingRight: 18,
    backgroundColor: 'transparent',
    transition: '.2s all',
    textTransform: 'none',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    '& > svg': {
      width: 18,
      height: 18,
      marginRight: 18,
      transition: '.2s transform',
      transitionDelay: '.3s',
      '& path': {
        transition: '.2s all',
      },
    },
    '&:hover': {
      backgroundColor: SD.basic.colors.translucent.violet,
      color: SD.basic.colors.main.violetDark,
      '& > svg > path': {
        fill: SD.basic.colors.main.violetDark,
      },
    },
    '&:active': {
      color: SD.basic.colors.main.violetDark,
      '& > svg > path': {
        fill: SD.basic.colors.main.violetDark,
      },
    },
  },
  buttonShowMoreClose: {
    '& > svg': {
      transform: 'rotate(180deg)',
    },
  },
  '@media (min-width: 1600px) and (max-width: 1919px)': {

  },
  '@media (min-width: 1920px)': {

  }
});

const ListLinks = ({
  items, className = '', showMore, divider,
  showSidebarSecondLevel, categoryType, subcategoryType, mainType
}) => {
  const classes = useStyles();
  let location = useLocation();
  const { categoryId, subcategoryId, pageName } = useParams();
  const [listOpened, setListOpened] = React.useState(false);

  const handleClickShowMore = () => {
    setListOpened(!listOpened);
  };

  return (
    <li className={classNames(classes.listLinks, showMore && !listOpened && classes.listLinksClose)}>
      {
        items
          ? items.map((el, ind) => {
            return (
              <ul key={el.id}>
                <RLink to={el.href} className={classes.listLinksLink}>
                  <span
                    className={classNames(
                      classes.listLinksItem,
                      (categoryType && categoryId === el.id.toString())
                        || (subcategoryType
                          && ((subcategoryId === el.id.toString() && categoryId === el.categoryId.toString())
                            || (!subcategoryId && el.id === 0)))
                        || (!categoryId && !subcategoryId
                          && ((mainType && el.pageName === pageName)
                            || ((!pageName
                              || pageName === 'overview')
                              && el.pageName === 'overview')))
                        ? classes.listLinksSelected
                        : ''
                    )}
                    onClick={showSidebarSecondLevel}
                  >
                    <div
                      className={classes.listLinksIcon}
                      dangerouslySetInnerHTML={el.iconBase64 && { __html: atob(el.iconBase64) }}
                    >
                      {el.icon}
                    </div>
                    <span className={classes.listLinksText}>
                      {el.name}
                    </span>
                  </span>
                </RLink>
                {
                  divider && <Divider />
                }
              </ul>
            )
          })
          : 'Загрузка...'
      }
      {
        items && showMore && items.length > 4
          ? (
            <button
              type='button'
              onClick={handleClickShowMore}
              className={classNames(
                classes.buttonShowMore,
                !listOpened ? classes.buttonShowMoreClose : '',
              )}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6L4.5 10.5L5.5575 11.5575L9 8.1225L12.4425 11.5575L13.5 10.5L9 6Z" fill="#828588" />
              </svg>
              <span>
                {listOpened ? 'Свернуть' : 'Развернуть'}
              </span>
            </button>
          )
          : null
      }
    </li>
  )
};

export default ListLinks;
