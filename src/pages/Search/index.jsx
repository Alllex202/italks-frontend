import React from 'react';

import axios from 'axios';
import classNames from 'classnames';
import { stylesDictionary as SD } from '../../settings/styles';

import { ClickAwayListener, makeStyles } from '@material-ui/core';
import { PreviewsBlock, RoundedButton, TagsBlock, VideoItem, VideoList } from '../../components';
import { Settings } from '../../settings/settings';
import { CSSTransition } from 'react-transition-group';

const useStyles = makeStyles({});

const Search = ({ searchQuery: _searchQuery }) => {
  const classes = useStyles();
  const [numberSearchResults, setNumberSearchResults] = React.useState(0);
  const [searchQuery, setSearchQuery] = React.useState(decodeURI(_searchQuery));
  const [results, setResults] = React.useState([]);

  // React.useEffect(() => {
  //   console.log(0)

  //   axios
  //     .get(`${Settings.serverUrl}/search/`, {
  //       params: {
  //         query: searchQuery
  //       },
  //     })
  //     .then(res => {
  //       setNumberSearchResults(res.data.length)
  //       console.log(res)
  //       setResults(res.data)
  //     })
  //     .catch(e => {

  //     });

  //   return () => {
  //     // console.log(1)
  //   }
  // }, [searchQuery]);

  return (
    _searchQuery &&
    (
      <div>
        <h1 className={classes.pageTitle}>
          {`Поиск по запросу “${searchQuery}”`}
        </h1>
        <span className={classes.pageSubtitle}>
          {`Найдено ${numberSearchResults} результатов`}
        </span>

        {/* {
          listSubcategories && listSubcategories.length > 0 && (
            <TagsBlock
              className={classes.tags}
              tags={listSubcategories}
            />
          )
        } */}
        <VideoList
          title={'Видео'}
          searchQuery={searchQuery}
          setNumberSearchResults={setNumberSearchResults}
        />
      </div>

    )
  )
};

export default Search;
