import React, { useState, useEffect } from 'react';

import { Link as RLink, useLocation, useHistory, Switch, Route, useParams } from 'react-router-dom';

import axios from 'axios';

import { Scrollbars } from 'react-custom-scrollbars';

import { makeStyles } from '@material-ui/core/styles';

import LogoSvg from '../../assets/img/Logo.svg';
import { Link, Divider, List, ListItem, ListItemIcon, ListItemText, Typography, Button } from '@material-ui/core';

import { RoundedButton, ListLinks } from '../'

const useStyles = makeStyles({
  sidebar: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: 232,
    backgroundColor: '#fff',
    overflow: 'auto',
    borderRight: '1px solid #D2D3D4',
  },
  logo: {
    height: 17,
    width: 59,
    marginLeft: 18,
    marginTop: 24,
    marginBottom: 23,
    display: 'inline-block',
    '& img': {
      mixBlendMode: 'luminosity',
      height: 17,
      width: 59,
    },
  },
  loginBlock: {
    width: '100%',
    height: 116,
  },
  loginBlockText: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 14,
    color: '#828588',
    width: 195,
    lineHeight: '16px',
    marginLeft: 18,
    paddingTop: 12,
    marginBottom: 11,
  },
  titleText: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#828588',
    width: 'auto',
    lineHeight: '16px',
    marginLeft: 18,
    paddingTop: 13,
    marginBottom: 13,
  },
  loginButton: {
    marginLeft: 18,
    marginBottom: 12,
    width: 96,
    height: 32,
  },
  link: {
    textDecoration: 'none',
  },
  '@media (max-width: 1599px)': {
    sidebar: {
      width: 232,
    },
    logo: {
      height: 17,
      width: 59,
      marginLeft: 18,
      marginTop: 24,
      marginBottom: 23,
      '& img': {
        mixBlendMode: 'luminosity',
        height: 17,
        width: 59,
      },
    },
    loginBlock: {
      height: 116,
    },
    loginBlockText: {

    },
    titleText: {
      fontSize: 14,
      lineHeight: '16px',
      marginLeft: 18,
      paddingTop: 13,
      marginBottom: 13,
    },
    loginButton: {
      marginLeft: 18,
      marginBottom: 12,
      width: 96,
      height: 32,
    }
  },
  '@media (min-width: 1600px) and (max-width: 1919px)': {

  },
  '@media (min-width: 1920px)': {

  }
});

const mainSidebarItems = [
  {
    id: 1,
    name: 'Обзор',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.33366 8.00008H2.66699V26.6667C2.66699 28.1334 3.86699 29.3334 5.33366 29.3334H24.0003V26.6667H5.33366V8.00008ZM26.667 2.66675H10.667C9.20033 2.66675 8.00033 3.86675 8.00033 5.33341V21.3334C8.00033 22.8001 9.20033 24.0001 10.667 24.0001H26.667C28.1337 24.0001 29.3337 22.8001 29.3337 21.3334V5.33341C29.3337 3.86675 28.1337 2.66675 26.667 2.66675ZM16.0003 19.3334V7.33342L24.0003 13.3334L16.0003 19.3334Z" fill="#333333" />
      </svg>
    ),
    href: '/',
  },
  {
    id: 2,
    name: 'Избранное',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.0003 23.0267L24.2403 28.0001L22.0537 18.6267L29.3337 12.3201L19.747 11.5067L16.0003 2.66675L12.2537 11.5067L2.66699 12.3201L9.94699 18.6267L7.76033 28.0001L16.0003 23.0267Z" fill="#333333" />
      </svg>
    ),
    href: '/favourites',
  }
];

const Sidebar = () => {
  const classes = useStyles();
  let location = useLocation();
  const [categories, setCategories] = useState(null);
  const [subcategories, setSubcategories] = useState(null);

  useEffect(() => {
    if (!categories)
      axios
        .get('http://127.0.0.1:8000/category/')
        .then((response) => {
          setCategories(response.data.map(el => {
            return {
              ...el,
              href: `/category/${el.id}`,
            }
          }));
          console.log(response.data)
        });
  });

  useEffect(() => {
    // let { id } = useParams();
    if (location.pathname.match(/\/category\/[0-9]+/)) {
      const categoryId = location.pathname.split(/\/category\//).filter(e => e);
      axios
        .get(`http://127.0.0.1:8000/category/${categoryId}`)
        .then((response) => {
          setSubcategories(response.data.map(el => {
            return {
              ...el,
              href: `/category/${el.id}`,
            }
          }));
          console.log([response.data, subcategories]);
        })
    }
  })

  return (
    <div className={classes.sidebar}>
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={400}
      >
        <RLink className={classes.logo} to='/'>
          <img src={LogoSvg} alt="logo icon" />
        </RLink>

        <Divider />

        <Switch>
          <Route path='/category/:id'>
            Кнопка Назад
          </Route>
          <Route path='/'>
            <ListLinks
              items={mainSidebarItems}
              divider
            />
          </Route>
        </Switch>

        {/* Блок для входа */}
        <div className={classes.loginBlock}>
          <Typography
            align='left'
            display='block'
            className={classes.loginBlockText}
          >
            Войдите,&nbsp;чтобы&nbsp;отслеживать
            категории и добавлять
            видео в избранное.
          </Typography>
          <RLink className={classes.link} to='/login'>
            <RoundedButton className={classes.loginButton}>
              Вход
            </RoundedButton>
          </RLink>
          <Divider />
        </div>

        {/* Отображаемый список */}
        <Switch>
          <Route path='/category'>
            {/* <ListSubcategories /> */}
          </Route>
          <Route path='/'>
            {/* <ListCategories /> */}
            <Typography
              align='left'
              display='block'
              className={classes.titleText}
            >
              Поиск по категориям
            </Typography>

            <ListLinks
              items={categories}
              showMore
            />
          </Route>
        </Switch>


      </Scrollbars>
    </div>
  )
};

export default Sidebar;
