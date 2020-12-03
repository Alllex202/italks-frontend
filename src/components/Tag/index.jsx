import React from 'react';
import { Link as RLink, useLocation, useHistory, Switch, Route, useParams } from 'react-router-dom';

const Tag = ({ classes, tagData }) => {
  return (
    <RLink to={`/category/${tagData.category_id}/subcategory/${tagData.id}`} className={classes.tag}>
      {tagData.name}
    </RLink>
  )
};

export default Tag;
