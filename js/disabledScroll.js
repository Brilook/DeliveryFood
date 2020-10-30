window.disableScroll = function() {
  const { body } = document;

  const widthBarScroll = window.innerWidth - body.offsetWidth;
  
  body.dbscrollY = window.scrollY;
  body.style.cssText = `
    position: fixed;
    top: ${-window.scrollY}px;
    left: 0;
    width: 100%;
    overflow: hidden;
    height:100vh;
    padding-right: ${widthBarScroll}px;
  `;
}
window.enableScroll = function() {
  const { body } = document;
  body.style.cssText = ``;
  window.scroll({top: body.dbscrollY})
}