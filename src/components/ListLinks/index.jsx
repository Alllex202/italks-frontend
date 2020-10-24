import React from 'react';
import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';

import { List, ListItem, ListItemIcon, ListItemText, Button, Divider } from '@material-ui/core';

import { Link as RLink, useLocation } from 'react-router-dom';

const useStyles = makeStyles({
  listLinks: {
    padding: 0,
  },
  listLinksItem: {
    height: 72,
    paddingLeft: 32,
    backgroundColor: 'transparent',
    color: '#333333',
    transition: '.2s all',
    cursor: 'pointer',
    '&:hover, &:focus': {
      backgroundColor: 'rgba(109, 30, 255, 0.1)',
    },
    '&:active': {
      color: '#6D1EFF',
      '& path': {
        fill: '#6D1EFF',
      }
    },
    '@media (max-width: 1599px)': {
      height: 42,
      paddingLeft: 18,
    },
    '@media (min-width: 1600px) and (max-width: 1919px)': {

    },
    '@media (min-width: 1920px)': {

    }
  },
  listLinksIcon: {
    width: 32,
    height: 32,
    minWidth: 32,
    marginRight: 18,
    '& path': {
      transition: '.2s fill',
      fill: '#333333',
    },
    '@media (max-width: 1599px)': {
      width: 18,
      height: 18,
      minWidth: 18,
      minHeight: 18,
      marginRight: 18,
      '& svg': {
        width: 18,
        height: 18,
      }
    },
    '@media (min-width: 1600px) and (max-width: 1919px)': {

    },
    '@media (min-width: 1920px)': {

    }
  },
  listLinksText: {
    fontFamily: 'Jetbrains Mono Normal',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 24,
    '& span': {
    },
    '@media (max-width: 1599px)': {
      fontSize: '14px',
      lineHeight: '17px',
    },
    '@media (min-width: 1600px) and (max-width: 1919px)': {

    },
    '@media (min-width: 1920px)': {

    }
  },
  listLinksSelected: {
    color: '#6D1EFF',
    '& path': {
      fill: '#6D1EFF',
    },
  },
  listLinksLink: {
    textDecoration: 'none',
  },
  listLinksClose: {
    '& > a:nth-child(n+5)': {
      display: 'none',
    },
  },
});

const ListLinks = ({ items, className = '', showMore, divider }) => {
  const classes = useStyles();
  let location = useLocation();
  const [listOpened, setListOpened] = React.useState(false);

  const handlerClick = () => {
    setListOpened(!listOpened);
  };

  return (
    <List className={classNames(classes.listLinks, showMore && !listOpened && classes.listLinksClose)}>
      {
        items
          ? items.map((el, ind) => {
            return (
              <React.Fragment key={el.id}>
                <RLink to={el.href} className={classes.listLinksLink}>
                  <ListItem
                    component='span'
                    classes={{ root: classes.listLinksItem }}
                    className={el.href === location.pathname ? classes.listLinksSelected : ''}
                  >
                    <ListItemIcon
                      className={classes.listLinksIcon}
                      dangerouslySetInnerHTML={el.icon_base_64 && { __html: atob(el.icon_base_64) }}
                    >
                      {el.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={el.name}
                      classes={{
                        primary: classes.listLinksText,
                      }}
                    />
                  </ListItem>
                </RLink>
                {
                  divider && <Divider />
                }
              </React.Fragment>
            )
          })
          : 'Загрузка...'
      }
      {
        items && showMore
          ? (
            <Button
              onClick={handlerClick}
              disableRipple
              endIcon={(<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 17L9.6 15.6L12.2 13H2L2 11L12.2 11L9.6 8.4L11 7L16 12L11 17ZM20 5H12V3L20 3C21.1 3 22 3.9 22 5L22 19C22 20.1 21.1 21 20 21L12 21V19L20 19L20 5Z" fill="#828588" />
              </svg>
              )}
              classes={{
                // root: classes.listLinksItem,
                // label: classes.labelRoundedButton,
                // endIcon: classes.iconRoudedButton,
              }}
            >
              {listOpened ? 'Свернуть' : 'Развернуть'}
            </Button>
          )
          : null
      }
    </List>
  )
};

export default ListLinks;
