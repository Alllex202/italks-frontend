import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import LogoSvg from '../../assets/img/Logo.svg';
import { Link, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import StarIcon from '@material-ui/icons/Star';

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
  }
});

const mainSidebarItems = [
  {
    text: 'Обзор',
    icon: VideoLibraryIcon,
    href: '#',
  },
  {
    text: 'Избранное',
    icon: StarIcon,
    href: '#',
  },
];

const Sidebar = () => {
  const classes = useStyles();

  return (
    <div className={classes.sidebar}>
      <Link component='a' className={classes.logo} href='#'>
        <img src={LogoSvg} alt="logo icon" />
      </Link>
      <Divider />
      <List>
        {
          mainSidebarItems.map((el, ind) => {
            return (
              <React.Fragment key={ind}>
                <ListItem component='a' href={el.href}>
                  <ListItemIcon>
                    <el.icon />
                  </ListItemIcon>
                  <ListItemText primary={el.text} />
                </ListItem>
                <Divider />
              </React.Fragment>
            )
          })
        }
      </List>
      <div className={classes.loginBlock}>
        TODO Блок со входом
      </div>
      <Divider />
    </div>
  )
};

export default Sidebar;
