const lockScroll = (currentScroll) => {
  // console.log(currentScroll)
  // if (parseInt(window.pageYOffset) !== currentScroll)
    window.scrollTo({ top: currentScroll })
};

export {lockScroll};