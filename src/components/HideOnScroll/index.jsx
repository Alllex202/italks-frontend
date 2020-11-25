import React from 'react';
import { Context } from '../Context';

import { Slide, useScrollTrigger } from '@material-ui/core';

const HideOnScroll = (props) => {
  const { auth } = React.useContext(Context);
  const { children, window, notificationsOpened, menuOpened } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={(auth && (notificationsOpened || menuOpened)) || !trigger}>
      {children}
    </Slide>
  );
};

export default HideOnScroll;
