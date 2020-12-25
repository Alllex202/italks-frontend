import React, { useState, useEffect } from 'react';

import { stylesDictionary as SD } from '../../settings/styles';

import { Link as RLink, useLocation, useHistory, Switch, Route, useParams } from 'react-router-dom';

import axios from 'axios';

import classNames from 'classnames';

import { Scrollbars } from 'react-custom-scrollbars';

import { makeStyles } from '@material-ui/core/styles';

import { Divider } from '@material-ui/core';

import { RoundedButton, ListLinks } from '../';

import LogoSvg from '../../assets/img/Logo.svg';
import { Settings } from '../../settings/settings';
import { Context } from '../Context';

const useStyles = makeStyles({
  sidebar: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: 232,
    backgroundColor: SD.basic.colors.main.whiteSmoke,
    overflow: 'auto',
    // borderRight: '1px solid #D2D3D4',
    '& ::-webkit-scrollbar': {
      width: '0px',
    },
  },
  sidebarHide: {
    transition: 'left .4s',
    // display: 'none',
    left: -232,
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
  buttonMainMenuBack: {
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
  // buttonMainMenuBackRoot: {
  //   justifyContent: 'start',
  //   height: 42,
  //   width: '100%',
  //   paddingLeft: 18,
  //   backgroundColor: 'transparent',
  //   color: SD.basic.colors.main.grey,
  //   transition: '.2s all',
  //   textTransform: 'none',
  //   cursor: 'pointer',
  //   '&:hover': {
  //     backgroundColor: SD.basic.colors.translucent.violet,
  //     color: SD.basic.colors.main.violetDark,
  //     '& path': {
  //       fill: SD.basic.colors.main.violetDark,
  //     }
  //   },
  //   '&:active': {
  //     color: SD.basic.colors.main.violetDark,
  //     '& path': {
  //       fill: SD.basic.colors.main.violetDark,
  //     }
  //   },
  // },
  // buttonMainMenuBackLabel: {
  //   fontFamily: SD.basic.fontsFamily.Roboto,
  //   fontStyle: 'normal',
  //   fontWeight: 'normal',
  //   fontSize: '14px',
  //   lineHeight: '16px',
  // },
  // buttonMainMenuBackStartIcon: {
  //   width: 18,
  //   height: 18,
  //   minWidth: 18,
  //   minHeight: 18,
  //   marginRight: 18,
  //   marginLeft: 0,
  //   '& path': {
  //     transition: '.2s fill',
  //     fill: SD.basic.colors.main.grey,
  //   },
  //   '& svg': {
  //     width: 18,
  //     height: 18,
  //   },
  // },
  loginBlock: {
    width: '100%',
    // height: 116,
  },
  loginBlockText: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '16px',
    color: SD.basic.colors.main.grey,
    width: 195,
    marginLeft: 18,
    paddingTop: 12,
    marginBottom: 11,
  },
  titleText: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
    color: SD.basic.colors.main.grey,
    width: 'auto',
    lineHeight: '16px',
    marginLeft: 18,
    paddingTop: 13,
    marginBottom: 13,
  },
  // linkLoginButton: {
  //   display: 'inline-block',
  // },
  loginButton: {
    marginLeft: 18,
    marginBottom: 12,
    margin: 0,
    width: 96,
    height: 32,
  },
  // link: {
  //   textDecoration: 'none',
  // },
  // '@media (max-width: 1599px)': {
  //   sidebar: {
  //     width: 232,
  //   },
  //   logo: {
  //     height: 17,
  //     width: 59,
  //     marginLeft: 18,
  //     marginTop: 24,
  //     marginBottom: 23,
  //     '& img': {
  //       mixBlendMode: 'luminosity',
  //       height: 17,
  //       width: 59,
  //     },
  //   },
  //   loginBlock: {
  //     // height: 116,
  //   },
  //   loginBlockText: {

  //   },
  //   titleText: {
  //     fontSize: 14,
  //     lineHeight: '16px',
  //     marginLeft: 18,
  //     paddingTop: 13,
  //     marginBottom: 13,
  //   },
  //   loginButton: {
  //     width: 96,
  //     height: 32,
  //   }
  // },
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
    href: '/overview',
    pageName: 'overview',
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
    pageName: 'favourites'
  }
];

const Sidebar = (props) => {
  const classes = useStyles();
  const { categoryId, subcategoryId } = useParams();
  // let location = useLocation();
  const { categories,
    secondLevelMenuShow: secondLevelShow,
    setSecondLevelMenuShow: setSecondLevelShow } = React.useContext(Context);
  // const [categories, setCategories] = useState(null);
  // const [secondLevelShow, setSecondLevelShow] = useState(true);

  // React.useEffect(() => {
  //   setSecondLevelShow(true);
  // }, [categoryId, subcategoryId]);

  // // Подрузка категорий и подкатегорий
  // useEffect(() => {
  //   if (!categories)
  //     axios
  //       .get(`${Settings.serverUrl}/categories_and_subcategories/`)
  //       .then((response) => {
  //         setCategories(response.data.map(category => {
  //           return {
  //             subcategories: [{
  //               id: 0,
  //               categoryId: category.id,
  //               icon: (
  //                 <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  //                   <path d="M9 1.5L4.875 8.25H13.125L9 1.5ZM9 4.38L10.4475 6.75H7.545L9 4.38ZM13.125 9.75C11.2575 9.75 9.75 11.2575 9.75 13.125C9.75 14.9925 11.2575 16.5 13.125 16.5C14.9925 16.5 16.5 14.9925 16.5 13.125C16.5 11.2575 14.9925 9.75 13.125 9.75ZM13.125 15C12.09 15 11.25 14.16 11.25 13.125C11.25 12.09 12.09 11.25 13.125 11.25C14.16 11.25 15 12.09 15 13.125C15 14.16 14.16 15 13.125 15ZM2.25 16.125H8.25V10.125H2.25V16.125ZM3.75 11.625H6.75V14.625H3.75V11.625Z" fill="#333333" />
  //                 </svg>
  //               ),
  //               name: 'Все',
  //               href: `/category/${category.id}`,
  //             }, ...category.subcategory.map(subcategory => {
  //               return {
  //                 id: subcategory.id,
  //                 categoryId: category.id,
  //                 iconBase64: subcategory.icon_base_64,
  //                 icon: (
  //                   <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  //                     <path d="M9 1.5L4.875 8.25H13.125L9 1.5ZM9 4.38L10.4475 6.75H7.545L9 4.38ZM13.125 9.75C11.2575 9.75 9.75 11.2575 9.75 13.125C9.75 14.9925 11.2575 16.5 13.125 16.5C14.9925 16.5 16.5 14.9925 16.5 13.125C16.5 11.2575 14.9925 9.75 13.125 9.75ZM13.125 15C12.09 15 11.25 14.16 11.25 13.125C11.25 12.09 12.09 11.25 13.125 11.25C14.16 11.25 15 12.09 15 13.125C15 14.16 14.16 15 13.125 15ZM2.25 16.125H8.25V10.125H2.25V16.125ZM3.75 11.625H6.75V14.625H3.75V11.625Z" fill="#333333" />
  //                   </svg>
  //                 ),
  //                 name: subcategory.name,
  //                 href: `/category/${category.id}/subcategory/${subcategory.id}`,
  //               }
  //             })],
  //             id: category.id,
  //             iconBase64: category.icon_base_64,
  //             name: category.name,
  //             href: `/category/${category.id}`,
  //           }
  //         }));
  //         // console.log(response.data)
  //       });
  // });

  const hideSidebarSecondLevel = () => {
    setSecondLevelShow(false);
  };

  const showSidebarSecondLevel = () => {
    setSecondLevelShow(true);
  }

  return (
    <React.Fragment>
      <Route exact path={[
        '/week/category/:categoryId/subcategory/:subcategoryId',
        '/week/category/:categoryId',
        '/overview/week',
        '/month/category/:categoryId/subcategory/:subcategoryId',
        '/month/category/:categoryId',
        '/overview/month',
        '/year/category/:categoryId/subcategory/:subcategoryId',
        '/year/category/:categoryId',
        '/overview/year',
        '/category/:categoryId/subcategory/:subcategoryId',
        '/category/:categoryId',
        '/:pageName',
        '/',
      ]}>
        <SidebarFirstLevel
          classes={classes}
          categories={categories}
          showSidebarSecondLevel={showSidebarSecondLevel}
        />
      </Route>

      {/* <Route>
        <SidebarFirstLevel
          classes={classes}
          categories={categories}
          showSidebarSecondLevel={showSidebarSecondLevel}
        />
      </Route> */}

      <Route exact path={[
        '/week/category/:categoryId/subcategory/:subcategoryId',
        '/week/category/:categoryId',
        '/month/category/:categoryId/subcategory/:subcategoryId',
        '/month/category/:categoryId',
        '/year/category/:categoryId/subcategory/:subcategoryId',
        '/year/category/:categoryId',
        '/category/:categoryId/subcategory/:subcategoryId',
        '/category/:categoryId',
      ]}>
        <SidebarSecondLevel
          classes={classes}
          categories={categories}
          hideSidebarSecondLevel={hideSidebarSecondLevel}
          secondLevelShow={secondLevelShow}
        />
      </Route>


      {/* <Switch>
        <Route path={['/category/:categoryId/subcategory/:subcategoryId', '/category/:categoryId']}>
          <SidebarFirstLevel
            categories={categories}
            showSidebarSecondLevel={showSidebarSecondLevel}
          />
          <SidebarSecondLevel
            categories={categories}
            hideSidebarSecondLevel={hideSidebarSecondLevel}
            secondLevelShow={secondLevelShow}
          />
        </Route>
        <Route path={['/:pageName', '/']}>
          <SidebarFirstLevel
            categories={categories}
            showSidebarSecondLevel={showSidebarSecondLevel}
          />
        </Route>
      </Switch> */}
    </React.Fragment>
  )
};

const SidebarFirstLevel = (props) => {
  const classes = props.classes;
  const { auth } = React.useContext(Context);
  const { pageName } = useParams();

  // return (pageName === 'favourites' || pageName === undefined) && (
  return (
    <div className={classes.sidebar}>
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={400}
        renderTrackHorizontal={props => <div {...props} style={{ display: "none" }} />}
        renderThumbHorizontal={props => <div {...props} style={{ display: "none" }} />}
      >
        <RLink className={classes.logo} to='/'>
          <img src={LogoSvg} alt="logo icon" />
        </RLink>

        <Divider />

        <ListLinks
          items={mainSidebarItems}
          mainType
          divider
        />

        {/* Блок для входа */}
        {!auth && <LoginBlock classes={classes} />}

        {/* Отображаемый список */}
        {/* <ListCategories
          categories={categories}
          className={classes.titleText}
        /> */}

        <div className={classes.titleText}>
          Поиск по категориям
        </div>

        <ListLinks
          items={props.categories}
          showSidebarSecondLevel={props.showSidebarSecondLevel}
          categoryType
          showMore
        />

      </Scrollbars>
    </div>
  )
};

const SidebarSecondLevel = (props) => {
  const classes = props.classes;
  const { auth } = React.useContext(Context);
  const { categoryId } = useParams();
  const selectedCategory = props.categories
    && props.categories.find(category => category.id.toString() === categoryId);

  return (
    <div className={classNames(classes.sidebar, !props.secondLevelShow && classes.sidebarHide)}>
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={400}
        renderTrackHorizontal={props => <div {...props} style={{ display: "none" }} />}
        renderThumbHorizontal={props => <div {...props} style={{ display: "none" }} />}
      >
        <RLink className={classes.logo} to='/'>
          <img src={LogoSvg} alt="logo icon" />
        </RLink>

        <Divider />

        <button
          type='button'
          onClick={props.hideSidebarSecondLevel}
          className={classNames(
            classes.buttonMainMenuBack,
          )}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 8.24951H5.8725L10.065 4.05701L9 2.99951L3 8.99951L9 14.9995L10.0575 13.942L5.8725 9.74951H15V8.24951Z" fill="#828588" />
          </svg>
          <span>
            Главное меню
          </span>
        </button>

        {/* <Button
          onClick={props.hideSidebarSecondLevel}
          disableRipple
          startIcon={(
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 8.24951H5.8725L10.065 4.05701L9 2.99951L3 8.99951L9 14.9995L10.0575 13.942L5.8725 9.74951H15V8.24951Z" fill="#828588" />
            </svg>
          )}
          classes={{
            root: classes.buttonMainMenuBackRoot,
            label: classes.buttonMainMenuBackLabel,
            startIcon: classes.buttonMainMenuBackStartIcon,
          }}
          component='div'
        >
          Главное меню
            </Button> */}
        <Divider />

        {/* Блок для входа */}
        {!auth && <LoginBlock classes={classes} />}

        {/* Отображаемый список */}
        {/* <ListSubcategories
          categories={categories}
          className={classes.titleText}
        /> */}
        <div className={classes.titleText}>
          {selectedCategory && selectedCategory.name}
        </div>

        <ListLinks
          items={selectedCategory && selectedCategory.subcategories}
          subcategoryType
          showMore
        />

      </Scrollbars>
    </div>
  )
};

const LoginBlock = (props) => {
  const classes = props.classes;
  let history = useHistory();

  const handlerButtonClick = () => {
    history.push('/login');
  };

  return (
    <div className={classes.loginBlock}>
      <div className={classes.loginBlockText}>
        Войдите, чтобы отслеживать
        категории и добавлять
        видео в избранное.
      </div>
      <RoundedButton
        className={classes.loginButton}
        endIcon={(
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 17L9.6 15.6L12.2 13H2L2 11L12.2 11L9.6 8.4L11 7L16 12L11 17ZM20 5H12V3L20 3C21.1 3 22 3.9 22 5L22 19C22 20.1 21.1 21 20 21L12 21V19L20 19L20 5Z" fill="#828588" />
          </svg>
        )}
        onClick={handlerButtonClick}
      >
        Вход
      </RoundedButton>
      <Divider />
    </div>
  )
}

// const ListCategories = (props) => {

//   return (
//     <React.Fragment>
//       <Typography
//         align='left'
//         display='block'
//         className={props.className}
//       >
//         Поиск по категориям
//       </Typography>

//       <ListLinks
//         items={props.categories}
//         showMore
//       />
//     </React.Fragment>
//   )
// };

// const ListSubcategories = (props) => {
//   const { categoryId } = useParams();
//   const selectedCategory = props.categories
//     && props.categories.find(category => category.id.toString() === categoryId);

//   return (
//     <React.Fragment>
//       <Typography
//         align='left'
//         display='block'
//         className={props.className}
//       >
//         {selectedCategory && selectedCategory.name}
//       </Typography>

//       <ListLinks
//         items={selectedCategory && selectedCategory.subcategories}
//         showMore
//       />
//     </React.Fragment>
//   )
// };

export default Sidebar;
