

var fullscreenModule = (function () {

    var toggleScreenButton = document.getElementById('toogleScreen')
    var  buttonOff= document.getElementById('toogleScreen-off')
    var  buttonOn= document.getElementById('toogleScreen-on')

    function initEvent (){
        toggleScreenButton.addEventListener('click',toggleScreen)
    }

    function toggleScreen () {
        var doc = window.document;
        var docEl = doc.documentElement;
      
        var requestFullScreen =
          docEl.requestFullscreen ||
          docEl.mozRequestFullScreen ||
          docEl.webkitRequestFullScreen ||
          docEl.msRequestFullscreen;
        var cancelFullScreen =
          doc.exitFullscreen ||
          doc.mozCancelFullScreen ||
          doc.webkitExitFullscreen ||
          doc.msExitFullscreen;
      
        if (
          !doc.fullscreenElement &&
          !doc.mozFullScreenElement &&
          !doc.webkitFullscreenElement &&
          !doc.msFullscreenElement
        ) {
          requestFullScreen.call(docEl);
          buttonOn.classList.remove('hide')
          buttonOff.classList.add('hide')
         
        } else {
          cancelFullScreen.call(doc);
          buttonOn.classList.add('hide')
          buttonOff.classList.remove('hide')
        }

    }

  return {
    init: initEvent,
  };
})();
