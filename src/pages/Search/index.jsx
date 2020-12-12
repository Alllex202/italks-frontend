import React from 'react';

import axios from 'axios';
import classNames from 'classnames';
import { stylesDictionary as SD } from '../../settings/styles';

import { ClickAwayListener, makeStyles } from '@material-ui/core';
import { PreviewsBlock, RoundedButton, TagsBlock, VideoItem, VideoList } from '../../components';
import { Settings } from '../../settings/settings';
import { CSSTransition } from 'react-transition-group';

const useStyles = makeStyles({
  pageTitle: {
    fontFamily: SD.basic.fontsFamily.JetBrainsMono,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '36px',
    lineHeight: '45px',
    color: SD.basic.colors.main.black,
    marginBottom: 12,
  },
  pageSubtitle: {
    display: 'inline-block',
    fontFamily: SD.basic.fontsFamily.JetBrainsMono,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '24px',
    lineHeight: '30px',
    color: SD.basic.colors.main.pink,
    marginBottom: 24,
  },
  '@media (min-width: 1600px) and (max-width: 1919px)': {

  },
  '@media (min-width: 1920px)': {

  }
});

const Search = ({ searchQuery: _searchQuery }) => {
  const classes = useStyles();
  const [numberSearchResults, setNumberSearchResults] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState(decodeURI(_searchQuery));
  const [results, setResults] = React.useState([]);

  return (
    _searchQuery &&
    (
      <div>
        {numberSearchResults !== null &&
          <React.Fragment>
            <h1 className={classes.pageTitle}>
              {`Поиск по запросу “${searchQuery}”`}
            </h1>
            <span className={classes.pageSubtitle}>
              {`Найдено ${numberSearchResults} результатов`}
            </span>
          </React.Fragment>
        }

        {/* {
          listSubcategories && listSubcategories.length > 0 && (
            <TagsBlock
              className={classes.tags}
              tags={listSubcategories}
            />
          )
        } */}
        <VideoList
          url={`${Settings.serverUrl}/search/`}
          title={'Видео'}
          searchQuery={searchQuery}
          setNumberSearchResults={setNumberSearchResults}
        />
      </div>

    )
  )
};

export default Search;
