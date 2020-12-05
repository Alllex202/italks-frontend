import React from 'react';
import { Link as RLink } from 'react-router-dom';
import { Context } from '../Context';

const Tag = ({ classes, tagData }) => {
  const { setSecondLevelMenuShow: setSecondLevelShow } = React.useContext(Context)
  const showSidebarSecondLevel = () => {
    setSecondLevelShow(true);
  }
  return (
    <RLink
      to={`/category/${tagData.category_id}/subcategory/${tagData.id}`}
      className={classes.tag}
      onClick={showSidebarSecondLevel}
    >
      {tagData.name}
    </RLink>
  )
};

export default Tag;
