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
    height: 42,
    paddingLeft: 18,
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
  },
  listLinksIcon: {
    width: 18,
    height: 18,
    minWidth: 18,
    minHeight: 18,
    marginRight: 18,
    '& path': {
      transition: '.2s fill',
      fill: '#333333',
    },
    '& svg': {
      width: 18,
      height: 18,
    },
  },
  listLinksText: {
    fontFamily: 'Jetbrains Mono Normal',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: '17px',
    '& span': {
    },
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
  buttonShowMoreRoot: {
    justifyContent: 'start',
    height: 42,
    width: '100%',
    paddingLeft: 18,
    backgroundColor: 'transparent',
    color: '#828588',
    transition: '.2s all',
    textTransform: 'none',
    cursor: 'pointer',
    '&:hover, &:focus': {
      backgroundColor: 'rgba(109, 30, 255, 0.1)',
      color: '#6D1EFF',
      '& path': {
        fill: '#6D1EFF',
      }
    },
    '&:active': {
      color: '#6D1EFF',
      '& path': {
        fill: '#6D1EFF',
      }
    },
  },
  buttonShowMoreLabel: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
  },
  buttonShowMoreStartIconUp: {
    width: 18,
    height: 18,
    minWidth: 18,
    minHeight: 18,
    marginRight: 18,
    marginLeft: 0,
    '& path': {
      transition: '.2s fill',
      fill: '#828588',
    },
    '& svg': {
      width: 18,
      height: 18,
    },
  },
  buttonShowMoreStartIconDown: {
    width: 18,
    height: 18,
    minWidth: 18,
    minHeight: 18,
    marginRight: 18,
    marginLeft: 0,
    transform: 'rotate(180deg)',
    '& path': {
      transition: '.2s fill',
      fill: '#828588',
    },
    '& svg': {
      width: 18,
      height: 18,
    },
  },
  '@media (max-width: 1599px)': {
    listLinksItem: {
      height: 42,
      paddingLeft: 18,
    },
    listLinksIcon: {
      width: 18,
      height: 18,
      minWidth: 18,
      minHeight: 18,
      marginRight: 18,
      '& svg': {
        width: 18,
        height: 18,
      },
    },
    listLinksText: {
      fontSize: '14px',
      lineHeight: '17px',
    },
  },
  '@media (min-width: 1600px) and (max-width: 1919px)': {

  },
  '@media (min-width: 1920px)': {

  }
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
              startIcon={(
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L4.5 10.5L5.5575 11.5575L9 8.1225L12.4425 11.5575L13.5 10.5L9 6Z" fill="#828588" />
                </svg>
              )}
              classes={{
                root: classes.buttonShowMoreRoot,
                label: classes.buttonShowMoreLabel,
                startIcon: !listOpened ? classes.buttonShowMoreStartIconDown : classes.buttonShowMoreStartIconUp,
              }}
              component='div'
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
