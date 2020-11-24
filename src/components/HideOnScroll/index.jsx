import React from 'react';

import { Slide, useScrollTrigger } from '@material-ui/core';

const HideOnScroll = (props) => {
  const { children, window, notificationsOpened, menuOpened } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={(notificationsOpened || menuOpened) || !trigger}>
      {children}
    </Slide>
  );
};

export default HideOnScroll;
