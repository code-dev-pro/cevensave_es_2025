var DetectDeviceresizeModule = (function () {
  function isTablet() {
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1;
    var isIpad = ua.indexOf("ipad") > -1;
    var isWindowsTablet =
      ua.indexOf("windows") > -1 &&
      ua.indexOf("touch") > -1 &&
      ua.indexOf("tablet pc") > -1;
    return (isAndroid && !isPhone()) || isIpad || isWindowsTablet;
  }

  function isPhone() {
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1;
    var isIphone = ua.indexOf("iphone") > -1;
    var isWindowsPhone = ua.indexOf("windows") > -1 && ua.indexOf("phone") > -1;
    return isAndroid || isIphone || isWindowsPhone;
  }

  return {
    isTablet: isTablet,
    isPhone: isPhone,
  };
})();
