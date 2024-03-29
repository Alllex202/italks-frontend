import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
// import { Header, Main, Sidebar, Test } from './components';
// import { ActivateProfile, LogRegRes } from './pages';
import axios from 'axios';

import { Settings } from './settings/settings';

import { Context } from './components/Context/index';
import { checkAuth, getAuthToken, removeAuthToken } from './auth/Auth';
import { SiteRouting } from './routing';

const App = (props) => {
  let location = useLocation();
  const [auth, setAuth] = useState(null);
  const [categories, setCategories] = React.useState(null);
  const [favouriteCategories, setFavouriteCategories] = React.useState(null);
  const [infoUser, setInfoUser] = useState(null);
  const [secondLevelMenuShow, setSecondLevelMenuShow] = useState(true);
  const [timerId, setTimerId] = React.useState(null);
  const [lastVideo, setLastVideo] = React.useState(null);
  const [darkTheme, setDarkTheme] = React.useState(false);

  const getCategories = () => {
    axios
      .get(`${Settings.serverUrl}/categories_and_subcategories/`)
      .then((response) => {
        setCategories(response.data.map(category => {
          return {
            subcategories: [{
              id: 0,
              subcategoryId: 0,
              categoryId: category.id,
              icon: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 1.5L4.875 8.25H13.125L9 1.5ZM9 4.38L10.4475 6.75H7.545L9 4.38ZM13.125 9.75C11.2575 9.75 9.75 11.2575 9.75 13.125C9.75 14.9925 11.2575 16.5 13.125 16.5C14.9925 16.5 16.5 14.9925 16.5 13.125C16.5 11.2575 14.9925 9.75 13.125 9.75ZM13.125 15C12.09 15 11.25 14.16 11.25 13.125C11.25 12.09 12.09 11.25 13.125 11.25C14.16 11.25 15 12.09 15 13.125C15 14.16 14.16 15 13.125 15ZM2.25 16.125H8.25V10.125H2.25V16.125ZM3.75 11.625H6.75V14.625H3.75V11.625Z" fill="#333333" />
                </svg>
              ),
              name: 'Все',
              href: `/category/${category.id}`,
            }, ...category.subcategory.map(subcategory => {
              return {
                id: subcategory.subcategory_id,
                subcategoryId: subcategory.subcategory_id,
                categoryId: category.id,
                iconBase64: subcategory.icon_base_64,
                icon: (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 1.5L4.875 8.25H13.125L9 1.5ZM9 4.38L10.4475 6.75H7.545L9 4.38ZM13.125 9.75C11.2575 9.75 9.75 11.2575 9.75 13.125C9.75 14.9925 11.2575 16.5 13.125 16.5C14.9925 16.5 16.5 14.9925 16.5 13.125C16.5 11.2575 14.9925 9.75 13.125 9.75ZM13.125 15C12.09 15 11.25 14.16 11.25 13.125C11.25 12.09 12.09 11.25 13.125 11.25C14.16 11.25 15 12.09 15 13.125C15 14.16 14.16 15 13.125 15ZM2.25 16.125H8.25V10.125H2.25V16.125ZM3.75 11.625H6.75V14.625H3.75V11.625Z" fill="#333333" />
                  </svg>
                ),
                name: subcategory.name,
                href: `/category/${category.id}/subcategory/${subcategory.subcategory_id}`,
              }
            })],
            id: category.id,
            categoryId: category.id,
            iconBase64: category.icon_base_64,
            name: category.name,
            href: `/category/${category.id}`,
          }
        }));
        // console.log(111, response.data)
      })
      .catch(error => {
        // console.log(error.response)
      })
      .finally();
  };

  const getFavouritesCategories = () => {
    axios
      .get(`${Settings.serverUrl}/favorites/subcategory/`, {
        headers: {
          'Authorization': `Token ${getAuthToken()}`,
        },
      })
      .then(response => {
        setFavouriteCategories(response.data.map((el) => {
          return {
            id: el.subcategory_id,
            categoryId: el.category_id,
            subcategoryId: el.subcategory_id,
            name: el.name,
            icon: (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 1.5L4.875 8.25H13.125L9 1.5ZM9 4.38L10.4475 6.75H7.545L9 4.38ZM13.125 9.75C11.2575 9.75 9.75 11.2575 9.75 13.125C9.75 14.9925 11.2575 16.5 13.125 16.5C14.9925 16.5 16.5 14.9925 16.5 13.125C16.5 11.2575 14.9925 9.75 13.125 9.75ZM13.125 15C12.09 15 11.25 14.16 11.25 13.125C11.25 12.09 12.09 11.25 13.125 11.25C14.16 11.25 15 12.09 15 13.125C15 14.16 14.16 15 13.125 15ZM2.25 16.125H8.25V10.125H2.25V16.125ZM3.75 11.625H6.75V14.625H3.75V11.625Z" fill="#333333" />
              </svg>
            ),
            href: `/category/${el.category_id}/subcategory/${el.subcategory_id}`,
          }
        }));
      })
      .catch(error => {
        // console.log(error.response)
      })
      .finally();
  };

  const removeFavouritesCategories = () => {
    setFavouriteCategories(null);
  };

  const addFavouritesCategory = (addedCategories) => {
    setFavouriteCategories(prev => [...prev, ...(addedCategories.map((el) => {
      return {
        id: el.subcategory_id,
        categoryId: el.category_id,
        subcategoryId: el.subcategory_id,
        name: el.name,
        icon: (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 1.5L4.875 8.25H13.125L9 1.5ZM9 4.38L10.4475 6.75H7.545L9 4.38ZM13.125 9.75C11.2575 9.75 9.75 11.2575 9.75 13.125C9.75 14.9925 11.2575 16.5 13.125 16.5C14.9925 16.5 16.5 14.9925 16.5 13.125C16.5 11.2575 14.9925 9.75 13.125 9.75ZM13.125 15C12.09 15 11.25 14.16 11.25 13.125C11.25 12.09 12.09 11.25 13.125 11.25C14.16 11.25 15 12.09 15 13.125C15 14.16 14.16 15 13.125 15ZM2.25 16.125H8.25V10.125H2.25V16.125ZM3.75 11.625H6.75V14.625H3.75V11.625Z" fill="#333333" />
          </svg>
        ),
        href: `/category/${el.category_id}/subcategory/${el.subcategory_id}`,
      }
    }))]);
  };

  const removeFavouritesCategory = (removedCategories) => {
    setFavouriteCategories(favouriteCategories
      .filter(el => !removedCategories.some(rem => rem.category_id === el.categoryId && rem.subcategory_id === el.subcategoryId)));
  };

  const resetTimer = () => {
    clearInterval(timerId);
    setTimerId(null);
  };

  React.useEffect(() => {
    checkAuth(setAuth, setInfoUser, setLastVideo, setDarkTheme);
    getCategories();
  }, []);

  React.useEffect(() => {
    if (auth === true) {
      getFavouritesCategories();
    } else if (auth === false) {
      removeFavouritesCategories();
      removeAuthToken();
      setInfoUser(null);
      setLastVideo(null);
      setDarkTheme(false);
    }
  }, [auth]);

  React.useEffect(() => {
    resetTimer();
  }, [location]);

  return (
    (auth !== null && categories !== null) ?
      <React.Fragment>
        <Context.Provider value={{
          auth,
          setAuth,
          infoUser,
          setInfoUser,
          categories,
          favouriteCategories,
          removeFavouritesCategories,
          addFavouritesCategory,
          removeFavouritesCategory,
          getFavouritesCategories,
          secondLevelMenuShow,
          setSecondLevelMenuShow,
          timerId,
          setTimerId,
          resetTimer,
          lastVideo,
          setLastVideo,
          darkTheme,
          setDarkTheme
        }}>
          <SiteRouting />
        </Context.Provider>
      </React.Fragment>
      : <>Лоадинг</>
  );
}

export default App;
