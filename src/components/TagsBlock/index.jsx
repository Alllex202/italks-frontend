import React from 'react';

import classNames from 'classnames';

import { stylesDictionary as SD } from '../../settings/styles';

import { makeStyles } from '@material-ui/core';
import Tag from '../Tag';

const useStyles = makeStyles({
  tags: {
    // display: 'flex',
    width: '100%',
    padding: '18px 0',
    border: `solid 1px ${SD.basic.colors.main.greyLight}`,
    borderLeft: 'none',
    borderRight: 'none',
    // overflow: 'hidden',

    // display: 'grid',
    // gridTemplateColumns: 'auto-fit, minmax(40px, auto)',
    // gridTemplateRows: '1fr 1fr 1fr',
    // // gridAutoColumns: 'min-content',
    // gridAutoFlow: 'column',
    // // gridTemplateRows: '1',
    // columnGap: '8px',
    // // gridAutoFlow: 'column',
  },
  tagsWithoutBorder: {
    padding: '0',
    border: `none`,
  },
  tagsWrapper: {
    width: '100%',
    height: 32,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  manyStrings: {
    height: 'auto',
    overflow: 'auto',
    '& > $tag': {
      marginBottom: 8,
    }
  },
  tag: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    padding: '0 8px',
    height: 32,
    width: 'fit-content',
    border: `1px solid ${SD.basic.colors.main.grey}`,
    borderRadius: '12px',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '14px',
    color: SD.basic.colors.main.black,
    backgroundColor: SD.basic.colors.main.white,
    marginRight: 8,
    cursor: 'pointer',
    transition: 'background-color .3s, color .3s',
    '&:hover': {
      backgroundColor: SD.basic.colors.main.black,
      color: SD.basic.colors.main.white,
    },
  },
  '@media (min-width: 1600px) and (max-width: 1919px)': {

  },
  '@media (min-width: 1920px)': {

  }
});

const TagsBlock = ({ className, tags, withoutBorder, manyStrings }) => {
  const classes = useStyles();


  // console.log(tags)
  return (
    <div className={classNames(classes.tags, className, withoutBorder && classes.tagsWithoutBorder)}>
      <div className={classNames(classes.tagsWrapper, manyStrings ? classes.manyStrings : '')}>
        {
          tags && tags.length > 0 && tags.map(tag => (
            <Tag
              key={tag.id}
              classes={classes}
              tagData={tag}
            />
          ))
        }
      </div>
    </div>
  )
};

export default TagsBlock;
