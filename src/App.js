import React, { useState } from 'react';
// import { Route, Redirect, useLocation, Switch, useHistory } from 'react-router-dom';
// import { Header, Main, Sidebar, Test } from './components';
// import { ActivateProfile, LogRegRes } from './pages';
import axios from 'axios';

import { Settings } from './settings/settings';

import { Context } from './components/Context/index';
import { checkAuth, getAuthToken } from './auth/Auth';
import { SiteRouting } from './routing';

const App = (props) => {
  const [auth, setAuth] = useState(null);
  const [categories, setCategories] = React.useState(null);
  const [favouriteCategories, setFavouriteCategories] = React.useState(null);
  const [infoUser, setInfoUser] = useState({
    notifications: [1, 2, 3, 1, 1, 1, 1, 1,],
  });
  // let location = useLocation();
  const [secondLevelMenuShow, setSecondLevelMenuShow] = useState(true);

  const getCategories = () => {
    axios
      .get(`${Settings.serverUrl}/categories_and_subcategories/`)
      .then((response) => {
        setCategories(response.data.map(category => {
          return {
            subcategories: [{
              id: 0,
              subcategoryId: 0,
              categoryId: category.category_id,
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
                categoryId: category.category_id,
                iconBase64: subcategory.icon_base_64,
                icon: (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 1.5L4.875 8.25H13.125L9 1.5ZM9 4.38L10.4475 6.75H7.545L9 4.38ZM13.125 9.75C11.2575 9.75 9.75 11.2575 9.75 13.125C9.75 14.9925 11.2575 16.5 13.125 16.5C14.9925 16.5 16.5 14.9925 16.5 13.125C16.5 11.2575 14.9925 9.75 13.125 9.75ZM13.125 15C12.09 15 11.25 14.16 11.25 13.125C11.25 12.09 12.09 11.25 13.125 11.25C14.16 11.25 15 12.09 15 13.125C15 14.16 14.16 15 13.125 15ZM2.25 16.125H8.25V10.125H2.25V16.125ZM3.75 11.625H6.75V14.625H3.75V11.625Z" fill="#333333" />
                  </svg>
                ),
                name: subcategory.name,
                href: `/category/${category.id}/subcategory/${subcategory.id}`,
              }
            })],
            id: category.id,
            categoryId: category.id,
            iconBase64: category.icon_base_64,
            name: category.name,
            href: `/category/${category.id}`,
          }
        }));
        // console.log(response.data)
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

  React.useEffect(() => {
    checkAuth(setAuth);
    getCategories();
  }, []);

  React.useEffect(() => {
    if (auth) {
      getFavouritesCategories();
    } else {
      removeFavouritesCategories();
    }
  }, [auth]);

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
          getFavouritesCategories,
          secondLevelMenuShow,
          setSecondLevelMenuShow
        }}>
          <SiteRouting />
        </Context.Provider>
      </React.Fragment>
      : <>Лоадинг</>
  );
}

export default App;
