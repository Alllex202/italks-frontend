const lockScroll = (currentScroll, e, selectorsClassWithoutLock) => {
  // console.log(currentScroll, e, selectorsClassWithoutLock);
  if (e.type === 'wheel') {
    !selectorsClassWithoutLock
      .some(selectorClass => e.target.closest(`.${selectorClass}`))
      && e.preventDefault();
  }
  // if (parseInt(window.pageYOffset) !== currentScroll)
  window.scrollTo({ top: currentScroll })
};

export { lockScroll };