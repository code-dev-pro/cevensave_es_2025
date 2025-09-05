var _w_app = 1920;
var _h_app = 1080;
window._w_app = _w_app;
window._h_app = _h_app;

var resizeModule = (function () {
  var game = {
    docElement: document.documentElement,
    docBody: document.getElementsByTagName("body")[0],
    appContainer: document.getElementById("wrapper_app"),
  };

  function setResize() {
    _width = DetectDeviceresizeModule.isTablet()
      ? screen.width
      : window.innerWidth || game.docElement.clientWidth || docBody.clientWidth;
    _height = DetectDeviceresizeModule.isTablet()
      ? screen.height
      : window.innerHeight ||
        game.docElement.clientHeight ||
        docBody.clientHeight;
    _ratio_W = _width / _w_app;
    _ratio_H = _height / _h_app;

    if (_ratio_H < _ratio_W) {
      setScale(game.appContainer, _ratio_H);
    } else {
      setScale(game.appContainer, _ratio_W);
    }
    setTransformOrigin(game.appContainer, "50% 50%");
  }

  function setScale(elt, val) {
    window.ratio = val;
    elt.style["-webkit-transform"] =
      "translateX(-50%) translateY(-50%) scale(" + val + "," + val + ")";
    elt.style["-moz-transform"] =
      "translateX(-50%) translateY(-50%) scale(" + val + "," + val + ")";
    elt.style["-o-transform"] =
      "translateX(-50%) translateY(-50%) scale(" + val + "," + val + ")";
    elt.style["-ms-transform"] =
      "translateX(-50%) translateY(-50%) scale(" + val + "," + val + ")";
    elt.style["transform"] =
      "translateX(-50%) translateY(-50%) scale(" + val + "," + val + ")";
  }

  function setTransformOrigin(elt, val) {
    elt.style["-webkit-transform-origin"] = val;
    elt.style["-moz-transform-origin"] = val;
    elt.style["-o-transform-origin"] = val;
    elt.style["-ms-transform-origin"] = val;
    elt.style["transform-origin"] = val;
  }

  function initResize() {
    setResize();
    window.addEventListener("resize", setResize);
    
  }

  return {
    init: initResize,
  };
})();
