import React from 'react';

import classNames from 'classnames';

import { stylesDictionary as SD } from '../../settings/styles';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  tags: {
    display: 'flex',
    width: '100%',
    padding: '18px 0',
    // marginBottom: 24,
    border: `solid 1px ${SD.basic.colors.main.greyLight}`,
    borderLeft: 'none',
    borderRight: 'none',
    overflow: 'hidden',
  },
  tagsWithoutBorder: {
    padding: '0',
    border: `none`,
  },
  tag: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    padding: '0 8px',
    height: 32,
    width: 'auto',
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

const TagsBlock = ({className, tags, videoItem}) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.tags, className, videoItem && classes.tagsWithoutBorder)}>
      <div className={classes.tag}>
        JavaScript
      </div>
      <div className={classes.tag}>
        JavaScriptфыв
      </div>
      <div className={classes.tag}>
        JavaScript
      </div>
      <div className={classes.tag}>
        JavaScript
      </div>
      <div className={classes.tag}>
        JavaScript
      </div>
      <div className={classes.tag}>
        JavaScript
      </div>
      <div className={classes.tag}>
        JavaScript
      </div>
      <div className={classes.tag}>
        JavaScript
      </div>
      <div className={classes.tag}>
        JavaScript
      </div>
      <div className={classes.tag}>
        JavaScript
      </div>
      <div className={classes.tag}>
        JavaScript
      </div>
      <div className={classes.tag}>
        JavaScript
      </div>
      <div className={classes.tag}>
        JavaScript
      </div>
      <div className={classes.tag}>
        JavaScript
      </div>
      <div className={classes.tag}>
        JavaScript
      </div>
      <div className={classes.tag}>
        JavaScript
      </div>
      <div className={classes.tag}>
        JavaScript
      </div>
      <div className={classes.tag}>
        JavaScript
      </div>
      <div className={classes.tag}>
        JavaScript
      </div>
      <div className={classes.tag}>
        JavaScript
      </div>
      <div className={classes.tag}>
        JavaScript
      </div>
      <div className={classes.tag}>
        JavaScript
      </div>
    </div>
  )
};

export default TagsBlock;
