import React from 'react';
import { axios } from 'axios';
import classNames from 'classnames';

import { stylesDictionary as SD } from '../../settings/styles';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  pageTitle: {
    fontFamily: SD.basic.fontsFamily.JetBrainsMono,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '48px',
    lineHeight: '60px',
    color: SD.basic.colors.main.black,
    marginBottom: 12,
  },
  pageSubtitle: {
    width: 637,
    display: 'inline-block',
    fontFamily: SD.basic.fontsFamily.JetBrainsMono,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '24px',
    lineHeight: '30px',
    color: SD.basic.colors.main.pink,
    marginBottom: 24,
  },
  tags: {
    display: 'flex',
    padding: '18px 0',
    border: `solid 1px ${SD.basic.colors.main.greyLight}`,
    borderLeft: 'none',
    borderRight: 'none',
    overflow: 'hidden',
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
});
const Overview = () => {
  const styles = useStyles();
  return (
    <div>
      <h1 className={styles.pageTitle}>
        Обзор
      </h1>
      <span className={styles.pageSubtitle}>
        Здесь мы собрали категории, события и видео, которые могут быть Вам интересны
      </span>
      <div className={styles.tags}>
        <div className={styles.tag}>
          JavaScript
        </div>
        <div className={styles.tag}>
          JavaScriptфыв
        </div>
        <div className={styles.tag}>
          JavaScript
        </div>
        <div className={styles.tag}>
          JavaScript
        </div>
        <div className={styles.tag}>
          JavaScript
        </div>
        <div className={styles.tag}>
          JavaScript
        </div>
        <div className={styles.tag}>
          JavaScript
        </div>
        <div className={styles.tag}>
          JavaScript
        </div>
        <div className={styles.tag}>
          JavaScript
        </div>
        <div className={styles.tag}>
          JavaScript
        </div>
        <div className={styles.tag}>
          JavaScript
        </div>
        <div className={styles.tag}>
          JavaScript
        </div>
        <div className={styles.tag}>
          JavaScript
        </div>
        <div className={styles.tag}>
          JavaScript
        </div>
        <div className={styles.tag}>
          JavaScript
        </div>
        <div className={styles.tag}>
          JavaScript
        </div>
        <div className={styles.tag}>
          JavaScript
        </div>
        <div className={styles.tag}>
          JavaScript
        </div>
        <div className={styles.tag}>
          JavaScript
        </div>
        <div className={styles.tag}>
          JavaScript
        </div>
        <div className={styles.tag}>
          JavaScript
        </div>
        <div className={styles.tag}>
          JavaScript
        </div>
      </div>
      <div>А тут должны быть видосики :)</div>
    </div>
  )
}

export default Overview;
