import React from 'react';

import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';

import LogoSvg from '../../assets/img/Logo.svg';
import { Link, Divider, List, ListItem, ListItemIcon, ListItemText, Typography, Button } from '@material-ui/core';

// import VideoLibraryIcon from '../../assets/img/video_library-24px.svg';
// import StarIcon from '../../assets/img/star-24px.svg';

const useStyles = makeStyles({
  sidebar: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: 407,
    backgroundColor: '#fff',
    overflow: 'auto',
    borderRight: '1px solid #D2D3D4',
  },
  logo: {
    height: 32,
    width: 101,
    marginLeft: 32,
    marginTop: 32,
    marginBottom: 33,
    display: 'inline-block',
    '& img': {
      mixBlendMode: 'luminosity',
      height: 32,
      width: 101,
    }
  },
  loginBlock: {
    width: '100%',
    height: 232,
  },
  titleText: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 24,
    color: '#828588',
    width: 310,
    lineHeight: '28px',
    marginLeft: 32,
    paddingTop: 22,
    marginBottom: 22,
  },
  list: {
    padding: 0,
  },
  item: {
    height: 72,
    paddingLeft: 32,
    backgroundColor: 'transparent',
    color: '#333333',
    transition: '.2s all',
    '&:hover, &:focus': {
      backgroundColor: 'rgba(109, 30, 255, 0.1)',
    },
    '&:active': {
      color: '#6D1EFF',
      '& path': {
        fill: '#6D1EFF',
      }
    }
  },
  itemIcon: {
    width: 32,
    height: 32,
    minWidth: 32,
    marginRight: 18,
    '& path': {
      transition: '.2s fill',
      fill: '#333333',
    }
  },
  itemText: {
    fontFamily: 'Jetbrains Mono Normal',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 24,
    '& span': {
    }
  },
  selected: {
    color: '#6D1EFF',
    '& path': {
      fill: '#6D1EFF',
    }
  },
  loginButton: {
    marginLeft: 32,
    borderRadius: '32px',
    border: '1px solid #6D1EFF',
    width: 181,
    height: 48,
    transition: '.2s all',
    '&:hover, &:focus': {
      backgroundColor: 'rgba(109, 30, 255, 0.1)',
    },
    '&:active': {
      backgroundColor: '#6D1EFF',
      '& span': {
        color: '#FFFFFF',
      },
      '& path': {
        fill: '#FFFFFF',
      }
    }
  },
  labelButton: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '24px',
    lineHeight: '28px',
    textTransform: 'none',
    color: '#6D1EFF',
  },
  iconButton: {
    '& path': {
      fill: '#6D1EFF',
    }
  }
});

const mainSidebarItems = [
  {
    text: 'Обзор',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.33366 8.00008H2.66699V26.6667C2.66699 28.1334 3.86699 29.3334 5.33366 29.3334H24.0003V26.6667H5.33366V8.00008ZM26.667 2.66675H10.667C9.20033 2.66675 8.00033 3.86675 8.00033 5.33341V21.3334C8.00033 22.8001 9.20033 24.0001 10.667 24.0001H26.667C28.1337 24.0001 29.3337 22.8001 29.3337 21.3334V5.33341C29.3337 3.86675 28.1337 2.66675 26.667 2.66675ZM16.0003 19.3334V7.33342L24.0003 13.3334L16.0003 19.3334Z" fill="#333333" />
      </svg>
    ),
    href: '#',
  },
  {
    text: 'Избранное',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.0003 23.0267L24.2403 28.0001L22.0537 18.6267L29.3337 12.3201L19.747 11.5067L16.0003 2.66675L12.2537 11.5067L2.66699 12.3201L9.94699 18.6267L7.76033 28.0001L16.0003 23.0267Z" fill="#333333" />
      </svg>
    ),
    href: '#',
  },
];

const Sidebar = () => {
  const classes = useStyles();

  const categories = axios
    .get('http://127.0.0.1:8000/')
    .then((response) => {
      console.log(response);
    });

  return (
    <div className={classes.sidebar}>
      <Link component='a' className={classes.logo} href='#'>
        <img src={LogoSvg} alt="logo icon" />
      </Link>
      <Divider />
      <List className={classes.list}>
        {
          mainSidebarItems.map((el, ind) => {
            return (
              <React.Fragment key={ind}>
                <ListItem
                  component='a'
                  href={el.href}
                  classes={{ root: classes.item }}
                // className={classes.selected}
                >
                  <ListItemIcon className={classes.itemIcon}>
                    {el.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={el.text}
                    classes={{
                      primary: classes.itemText,
                    }}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            )
          })
        }
      </List>
      <div className={classes.loginBlock}>
        <Typography
          align='left'
          display='block'
          className={classes.titleText}
        >
          Войдите, чтобы отслеживать категории и добавлять видео в избранное.
        </Typography>
        <Button
          endIcon={(<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 17L9.6 15.6L12.2 13H2L2 11L12.2 11L9.6 8.4L11 7L16 12L11 17ZM20 5H12V3L20 3C21.1 3 22 3.9 22 5L22 19C22 20.1 21.1 21 20 21L12 21V19L20 19L20 5Z" fill="#828588" />
          </svg>
          )}
          component='a'
          disableRipple
          classes={{
            root: classes.loginButton,
            label: classes.labelButton,
            endIcon: classes.iconButton,
          }}
          href='#'
        >
          Войти
        </Button>
      </div>
      <Divider />
      <Typography
        align='left'
        display='block'
        className={classes.titleText}
      >
        Поиск по категориям
      </Typography>
      {
        // categories.map((el, ind) => {
        //   return (
        //     <React.Fragment key={el.id}>
        //       <ListItem
        //         component='a'
        //         href={el.href}
        //         classes={{ root: classes.item }}
        //       // className={classes.selected}
        //       >
        //         <ListItemIcon className={classes.itemIcon}>
        //           {el.icon}
        //         </ListItemIcon>
        //         <ListItemText
        //           primary={el.name}
        //           classes={{
        //             primary: classes.itemText,
        //           }}
        //         />
        //       </ListItem>
        //       <Divider />
        //     </React.Fragment>
        //   )
        // })
      }
    </div>
  )
};

export default Sidebar;
